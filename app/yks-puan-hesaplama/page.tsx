"use client";

import { useMemo, useState } from "react";
import programlar from "@/data/programlar.json";

type Ders = {
  ad: string;
  soru: number;
  dogru: number;
  yanlis: number;
};

type Sonuc = {
  tytHam: number;
  tytYer: number;
  sayHam: number;
  sayYer: number;
  eaHam: number;
  eaYer: number;
  sozHam: number;
  sozYer: number;
  dilHam: number;
  dilYer: number;
};

type Program = {
  programAdi?: string;
  bolumAdi?: string;
  universiteAdi?: string;
  universite?: string;
  puanTuru?: string;
  basariSirasi?: number | string;
  tabanSiralama?: number | string;
  tabanPuan?: number | string;
  sehir?: string;
  bolum?: string;
  siralama2025?: number | string;
  siralama2024?: number | string;
  tabanPuan2025?: number | string;
  universiteTuru?: string;
};

type PuanTuruKodu = "TYT" | "SAY" | "EA" | "SOZ" | "DIL";

type Filtre = {
  sehir: string;
  universite: string;
  universiteTuru: string;
  bolum: string;
};

const PUAN_TURU_SECENEKLERI: { kod: PuanTuruKodu; etiket: string }[] = [
  { kod: "TYT", etiket: "TYT (Önlisans)" },
  { kod: "SAY", etiket: "Sayısal (SAY)" },
  { kod: "EA", etiket: "Eşit Ağırlık (EA)" },
  { kod: "SOZ", etiket: "Sözel (SÖZ)" },
  { kod: "DIL", etiket: "Dil (DİL)" },
];

const tumProgramlar = programlar as Program[];

const ilkTYT: Ders[] = [
  { ad: "Türkçe", soru: 40, dogru: 0, yanlis: 0 },
  { ad: "Sosyal Bilimler", soru: 20, dogru: 0, yanlis: 0 },
  { ad: "Temel Matematik", soru: 40, dogru: 0, yanlis: 0 },
  { ad: "Fen Bilimleri", soru: 20, dogru: 0, yanlis: 0 },
];

const ilkAYT: Ders[] = [
  { ad: "Edebiyat", soru: 24, dogru: 0, yanlis: 0 },
  { ad: "Tarih-1", soru: 10, dogru: 0, yanlis: 0 },
  { ad: "Coğrafya-1", soru: 6, dogru: 0, yanlis: 0 },
  { ad: "Tarih-2", soru: 11, dogru: 0, yanlis: 0 },
  { ad: "Coğrafya-2", soru: 11, dogru: 0, yanlis: 0 },
  { ad: "Felsefe", soru: 12, dogru: 0, yanlis: 0 },
  { ad: "Din Kültürü", soru: 6, dogru: 0, yanlis: 0 },
  { ad: "Matematik", soru: 40, dogru: 0, yanlis: 0 },
  { ad: "Fizik", soru: 14, dogru: 0, yanlis: 0 },
  { ad: "Kimya", soru: 13, dogru: 0, yanlis: 0 },
  { ad: "Biyoloji", soru: 13, dogru: 0, yanlis: 0 },
  { ad: "Yabancı Dil", soru: 80, dogru: 0, yanlis: 0 },
];

function net(d: Ders) {
  return Math.max(0, d.dogru - d.yanlis / 4);
}

function sayiyaCevir(deger: unknown) {
  if (typeof deger === "number") return deger;
  if (typeof deger === "string") {
    const temiz = deger.replace(/\./g, "").replace(",", ".").replace(/[^\d.]/g, "");
    const sayi = Number(temiz);
    return Number.isNaN(sayi) ? 0 : sayi;
  }
  return 0;
}

// Türkçe karakterleri sadeleştirip büyük harfe çevirir, veri setindeki
// "SÖZ" / "SOZ" / "DİL" / "DIL" gibi yazım farklarını tek tipe indirger.
function puanTuruNormalize(deger: string): string {
  return deger
    .toLocaleUpperCase("tr-TR")
    .replace(/İ/g, "I")
    .replace(/Ö/g, "O")
    .replace(/Ü/g, "U")
    .replace(/Ş/g, "S")
    .replace(/Ğ/g, "G")
    .replace(/Ç/g, "C")
    .trim();
}

function programSirasi(p: Program) {
  return sayiyaCevir(p.siralama2025 ?? p.siralama2024 ?? p.basariSirasi ?? p.tabanSiralama);
}

function programPuani(p: Program) {
  const ham = sayiyaCevir(p.tabanPuan2025 ?? p.tabanPuan);
  // Yüklenen veri setinde taban puanlar ondalık noktası silinmiş şekilde
  // saklanıyor (ör. gerçek puan 374.17808 -> JSON'da 37417808 olarak duruyor).
  // Gerçek YKS puanları en fazla ~560 olabileceğinden, 1000'in üzerindeki
  // her değeri 5 ondalık basamağa göre geri dönüştürüyoruz.
  if (ham > 1000) return ham / 100000;
  return ham;
}

function programAdi(p: Program) {
  return p.programAdi || p.bolumAdi || p.bolum || "Program adı yok";
}

function universiteAdi(p: Program) {
  return p.universiteAdi || p.universite || "Üniversite adı yok";
}

/* -------------------------------------------------------------------- */
/*  GERÇEKÇİ SIRALAMA TAHMİNİ                                            */
/*  Uydurma bir formül yerine, yüklenen gerçek ÖSYM taban puan/sıralama  */
/*  verilerinden puan türüne göre bir "puan -> sıralama" eğrisi          */
/*  çıkarıp kullanıcının puanını bu eğri üzerinde interpolasyonla        */
/*  tahmin ediyoruz. Bu, elimizdeki en gerçekçi yöntem.                  */
/* -------------------------------------------------------------------- */

type Nokta = { puan: number; sira: number };

const egriCache = new Map<PuanTuruKodu, Nokta[]>();

function egriGetir(tur: PuanTuruKodu): Nokta[] {
  const cache = egriCache.get(tur);
  if (cache) return cache;

  const noktalar: Nokta[] = [];
  for (const p of tumProgramlar) {
    if (puanTuruNormalize(String(p.puanTuru || "")) !== tur) continue;
    const puan = programPuani(p);
    const sira = programSirasi(p);
    if (puan > 0 && sira > 0) noktalar.push({ puan, sira });
  }

  // Aynı puana yakın çok fazla nokta olabilir; puana göre büyükten küçüğe sırala.
  noktalar.sort((a, b) => b.puan - a.puan);

  egriCache.set(tur, noktalar);
  return noktalar;
}

// Puan türüne göre gerçekçi bir sıralama tahmini üretir.
function siralamaTahminiSayi(puan: number, tur: PuanTuruKodu): number {
  const egri = egriGetir(tur);

  if (egri.length < 2) {
    // Veri setinde yeterli nokta yoksa (ör. o puan türü hiç yüklenmemiş),
    // kaba bir yedek tahmin döndür.
    const maxAday = tur === "TYT" ? 5600000 : 3200000;
    const oran = Math.max(0.00005, Math.pow(Math.max(0, (500 - puan)) / 400, 2.4));
    return Math.round(maxAday * oran);
  }

  // Puan aralığın üstündeyse (en yüksek taban puandan da yüksekse):
  // en tepedeki iki noktanın eğimini kullanarak dışa doğru tahmin et.
  if (puan >= egri[0].puan) {
    const a = egri[0];
    const b = egri[Math.min(1, egri.length - 1)];
    if (a.puan === b.puan) return Math.max(1, Math.round(a.sira));
    const egim = (b.sira - a.sira) / (b.puan - a.puan); // puan arttıkça sira negatif yönde değişir
    const tahmin = a.sira + egim * (puan - a.puan);
    return Math.max(1, Math.round(tahmin));
  }

  // Puan aralığın altındaysa (en düşük taban puandan da düşükse):
  const son = egri[egri.length - 1];
  if (puan <= son.puan) {
    const onceki = egri[Math.max(0, egri.length - 2)];
    if (onceki.puan === son.puan) return Math.round(son.sira);
    const egim = (son.sira - onceki.sira) / (son.puan - onceki.puan);
    const tahmin = son.sira + egim * (puan - son.puan);
    return Math.max(Math.round(son.sira), Math.round(tahmin));
  }

  // Aradaysa: en yakın iki nokta arasında doğrusal interpolasyon yap.
  for (let i = 0; i < egri.length - 1; i++) {
    const ust = egri[i];
    const alt = egri[i + 1];
    if (puan <= ust.puan && puan >= alt.puan) {
      if (ust.puan === alt.puan) return Math.round((ust.sira + alt.sira) / 2);
      const oran = (ust.puan - puan) / (ust.puan - alt.puan);
      const tahmin = ust.sira + oran * (alt.sira - ust.sira);
      return Math.max(1, Math.round(tahmin));
    }
  }

  return Math.round(son.sira);
}

function siralamaTahmini(puan: number, tur: PuanTuruKodu) {
  return siralamaTahminiSayi(puan, tur).toLocaleString("tr-TR");
}

/* -------------------------------------------------------------------- */
/*  ÖNERİ MOTORU                                                         */
/* -------------------------------------------------------------------- */

function onerileriGetir(siralama: number, puanTuru: PuanTuruKodu, filtre: Filtre) {
  const liste = tumProgramlar
    .filter((p) => puanTuruNormalize(String(p.puanTuru || "")) === puanTuru)
    .filter((p) => programSirasi(p) > 0)
    .filter((p) =>
      filtre.sehir ? String(p.sehir || "").toLowerCase().includes(filtre.sehir.toLowerCase()) : true
    )
    .filter((p) =>
      filtre.universite ? universiteAdi(p).toLowerCase().includes(filtre.universite.toLowerCase()) : true
    )
    .filter((p) => (filtre.universiteTuru ? String(p.universiteTuru || "") === filtre.universiteTuru : true))
    .filter((p) =>
      filtre.bolum ? programAdi(p).toLowerCase().includes(filtre.bolum.toLowerCase()) : true
    );

  // Sıralama küçük olan (yani puanı yüksek olan) her zaman daha "iyi" bölüm demektir.
  // Kullanıcının tahmini sıralamasından daha kötü (büyük) bir sıralamaya sahip programlar
  // rahat tercih; yakın olanlar hedef; daha iyi (küçük) sıralamaya sahip olanlar zor tercih.
  const rahat = liste
    .filter((p) => programSirasi(p) >= siralama * 1.25)
    .sort((a, b) => programSirasi(a) - programSirasi(b))
    .slice(0, 10);

  const hedef = liste
    .filter((p) => programSirasi(p) >= siralama * 0.85 && programSirasi(p) < siralama * 1.25)
    .sort((a, b) => Math.abs(programSirasi(a) - siralama) - Math.abs(programSirasi(b) - siralama))
    .slice(0, 10);

  const zor = liste
    .filter((p) => programSirasi(p) >= siralama * 0.55 && programSirasi(p) < siralama * 0.85)
    .sort((a, b) => programSirasi(b) - programSirasi(a))
    .slice(0, 10);

  return { rahat, hedef, zor };
}

/* -------------------------------------------------------------------- */
/*  ANA COMPONENT                                                        */
/* -------------------------------------------------------------------- */

export default function YKSPuanHesaplama() {
  const [tyt, setTyt] = useState<Ders[]>(ilkTYT);
  const [ayt, setAyt] = useState<Ders[]>(ilkAYT);
  const [obp, setObp] = useState(80);
  const [sonuc, setSonuc] = useState<Sonuc | null>(null);

  const [sehirFiltre, setSehirFiltre] = useState("");
  const [universiteFiltre, setUniversiteFiltre] = useState("");
  const [universiteTuruFiltre, setUniversiteTuruFiltre] = useState("");
  const [bolumFiltre, setBolumFiltre] = useState("");
  const [puanTuruFiltre, setPuanTuruFiltre] = useState<PuanTuruKodu[]>(
    PUAN_TURU_SECENEKLERI.map((s) => s.kod)
  );

  const puanTuruDegistir = (kod: PuanTuruKodu) => {
    setPuanTuruFiltre((mevcut) =>
      mevcut.includes(kod) ? mevcut.filter((k) => k !== kod) : [...mevcut, kod]
    );
  };

  const filtre: Filtre = {
    sehir: sehirFiltre,
    universite: universiteFiltre,
    universiteTuru: universiteTuruFiltre,
    bolum: bolumFiltre,
  };

  const guncelle = (
    liste: Ders[],
    setListe: React.Dispatch<React.SetStateAction<Ders[]>>,
    index: number,
    alan: "dogru" | "yanlis",
    deger: string
  ) => {
    let sayi = Number(deger);
    if (Number.isNaN(sayi)) sayi = 0;

    const yeni = [...liste];
    const ders = { ...yeni[index] };

    sayi = Math.max(0, Math.min(sayi, ders.soru));
    ders[alan] = sayi;

    if (ders.dogru + ders.yanlis > ders.soru) {
      if (alan === "dogru") ders.yanlis = ders.soru - ders.dogru;
      else ders.dogru = ders.soru - ders.yanlis;
    }

    yeni[index] = ders;
    setListe(yeni);
  };

  const hesapla = () => {
    const diploma = Math.max(0, Math.min(100, obp));
    const obpKatki = diploma * 0.6; // OBP x 5 x %12 = diploma x 0.6 ile eşdeğer

    const t = Object.fromEntries(tyt.map((d) => [d.ad, net(d)]));
    const a = Object.fromEntries(ayt.map((d) => [d.ad, net(d)]));

    const tytHam =
      100 +
      t["Türkçe"] * 1.32 +
      t["Temel Matematik"] * 1.32 +
      t["Sosyal Bilimler"] * 1.36 +
      t["Fen Bilimleri"] * 1.36;

    const ortakTYT = tytHam * 0.4;

    const sayHam =
      ortakTYT +
      100 +
      a["Matematik"] * 3 +
      a["Fizik"] * 2.85 +
      a["Kimya"] * 3.07 +
      a["Biyoloji"] * 3.07;

    const eaHam =
      ortakTYT +
      100 +
      a["Matematik"] * 3 +
      a["Edebiyat"] * 3 +
      a["Tarih-1"] * 2.8 +
      a["Coğrafya-1"] * 3.33;

    const sozHam =
      ortakTYT +
      100 +
      a["Edebiyat"] * 3 +
      a["Tarih-1"] * 2.8 +
      a["Coğrafya-1"] * 3.33 +
      a["Tarih-2"] * 2.91 +
      a["Coğrafya-2"] * 2.91 +
      a["Felsefe"] * 3 +
      a["Din Kültürü"] * 3.33;

    const dilHam = ortakTYT + 100 + a["Yabancı Dil"] * 3;

    setSonuc({
      tytHam,
      tytYer: tytHam + obpKatki,
      sayHam,
      sayYer: sayHam + obpKatki,
      eaHam,
      eaYer: eaHam + obpKatki,
      sozHam,
      sozYer: sozHam + obpKatki,
      dilHam,
      dilYer: dilHam + obpKatki,
    });
  };

  const tablo = (baslik: string, liste: Ders[], setListe: React.Dispatch<React.SetStateAction<Ders[]>>) => (
    <section style={kart}>
      <h2>{baslik}</h2>
      {liste.map((d, i) => (
        <div key={d.ad} style={satir}>
          <b style={{ width: 150 }}>
            {d.ad} ({d.soru})
          </b>
          <input
            type="number"
            placeholder="Doğru"
            value={d.dogru === 0 ? "" : d.dogru}
            onChange={(e) => guncelle(liste, setListe, i, "dogru", e.target.value)}
            style={input}
          />
          <input
            type="number"
            placeholder="Yanlış"
            value={d.yanlis === 0 ? "" : d.yanlis}
            onChange={(e) => guncelle(liste, setListe, i, "yanlis", e.target.value)}
            style={input}
          />
          <span>Net: {net(d).toFixed(2)}</span>
        </div>
      ))}
    </section>
  );

  // Sıralama tahminlerini sonuç değiştikçe yeniden hesapla.
  const siralamalar = useMemo(() => {
    if (!sonuc) return null;
    return {
      tyt: siralamaTahminiSayi(sonuc.tytYer, "TYT"),
      say: siralamaTahminiSayi(sonuc.sayYer, "SAY"),
      ea: siralamaTahminiSayi(sonuc.eaYer, "EA"),
      soz: siralamaTahminiSayi(sonuc.sozYer, "SOZ"),
      dil: siralamaTahminiSayi(sonuc.dilYer, "DIL"),
    };
  }, [sonuc]);

  return (
    <main style={sayfa}>
      <h1>YKS Puan Hesaplama</h1>

      <div style={kart}>
        <label>Diploma Notu / OBP Notu (0-100)</label>
        <input
          type="number"
          value={obp}
          min={0}
          max={100}
          onChange={(e) => setObp(Math.max(0, Math.min(100, Number(e.target.value))))}
          style={inputBuyuk}
        />
      </div>

      {tablo("TYT", tyt, setTyt)}
      {tablo("AYT / YDT", ayt, setAyt)}

      <button onClick={hesapla} style={buton}>
        Hesapla
      </button>

      {sonuc && siralamalar && (
        <>
          <section style={kart}>
            <h2>Sonuçlar</h2>
            <SonucSatir ad="TYT" ham={sonuc.tytHam} yer={sonuc.tytYer} sira={siralamalar.tyt} />
            <SonucSatir ad="SAY" ham={sonuc.sayHam} yer={sonuc.sayYer} sira={siralamalar.say} />
            <SonucSatir ad="EA" ham={sonuc.eaHam} yer={sonuc.eaYer} sira={siralamalar.ea} />
            <SonucSatir ad="SÖZ" ham={sonuc.sozHam} yer={sonuc.sozYer} sira={siralamalar.soz} />
            <SonucSatir ad="DİL" ham={sonuc.dilHam} yer={sonuc.dilYer} sira={siralamalar.dil} />
            <p style={{ fontSize: 13, opacity: 0.7 }}>
              Sıralamalar, yüklenen ÖSYM taban puan/sıralama verilerinden interpolasyonla tahmin
              edilmiştir; kesin sonuç değildir.
            </p>
          </section>

          <FiltreAlani
            sehir={sehirFiltre}
            setSehir={setSehirFiltre}
            universite={universiteFiltre}
            setUniversite={setUniversiteFiltre}
            universiteTuru={universiteTuruFiltre}
            setUniversiteTuru={setUniversiteTuruFiltre}
            bolum={bolumFiltre}
            setBolum={setBolumFiltre}
            puanTuruFiltre={puanTuruFiltre}
            puanTuruDegistir={puanTuruDegistir}
          />

          {puanTuruFiltre.includes("TYT") && (
            <OneriBolumu baslik="TYT (Önlisans) Önerileri" puanTuru="TYT" siralama={siralamalar.tyt} filtre={filtre} />
          )}
          {puanTuruFiltre.includes("SAY") && (
            <OneriBolumu baslik="SAY Üniversite Önerileri" puanTuru="SAY" siralama={siralamalar.say} filtre={filtre} />
          )}
          {puanTuruFiltre.includes("EA") && (
            <OneriBolumu baslik="EA Üniversite Önerileri" puanTuru="EA" siralama={siralamalar.ea} filtre={filtre} />
          )}
          {puanTuruFiltre.includes("SOZ") && (
            <OneriBolumu baslik="SÖZ Üniversite Önerileri" puanTuru="SOZ" siralama={siralamalar.soz} filtre={filtre} />
          )}
          {puanTuruFiltre.includes("DIL") && (
            <OneriBolumu baslik="DİL Üniversite Önerileri" puanTuru="DIL" siralama={siralamalar.dil} filtre={filtre} />
          )}

          {puanTuruFiltre.length === 0 && (
            <p style={{ opacity: 0.7 }}>
              Öneri görmek için yukarıdan en az bir puan türü seç.
            </p>
          )}
        </>
      )}
    </main>
  );
}

function SonucSatir({ ad, ham, yer, sira }: { ad: string; ham: number; yer: number; sira: number }) {
  return (
    <div style={sonucSatir}>
      <b>{ad}</b>
      <span>Ham Puan: {ham.toFixed(2)}</span>
      <span>Yerleştirme: {yer.toFixed(2)}</span>
      <span>Tahmini Sıralama: {sira.toLocaleString("tr-TR")}</span>
    </div>
  );
}

function FiltreAlani({
  sehir,
  setSehir,
  universite,
  setUniversite,
  universiteTuru,
  setUniversiteTuru,
  bolum,
  setBolum,
  puanTuruFiltre,
  puanTuruDegistir,
}: {
  sehir: string;
  setSehir: (v: string) => void;
  universite: string;
  setUniversite: (v: string) => void;
  universiteTuru: string;
  setUniversiteTuru: (v: string) => void;
  bolum: string;
  setBolum: (v: string) => void;
  puanTuruFiltre: PuanTuruKodu[];
  puanTuruDegistir: (kod: PuanTuruKodu) => void;
}) {
  return (
    <section style={kart}>
      <h2>Önerileri Filtrele</h2>

      <div style={{ marginBottom: 16 }}>
        <b style={{ display: "block", marginBottom: 8 }}>Puan Türü</b>
        <div style={satir}>
          {PUAN_TURU_SECENEKLERI.map((secenek) => (
            <label
              key={secenek.kod}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: 8,
                cursor: "pointer",
                background: puanTuruFiltre.includes(secenek.kod) ? "#eff6ff" : "#fff",
              }}
            >
              <input
                type="checkbox"
                checked={puanTuruFiltre.includes(secenek.kod)}
                onChange={() => puanTuruDegistir(secenek.kod)}
              />
              {secenek.etiket}
            </label>
          ))}
        </div>
      </div>

      <div style={satir}>
        <input
          placeholder="Şehir (ör. İstanbul)"
          value={sehir}
          onChange={(e) => setSehir(e.target.value)}
          style={inputGenis}
        />
        <input
          placeholder="Üniversite adı"
          value={universite}
          onChange={(e) => setUniversite(e.target.value)}
          style={inputGenis}
        />
        <select
          value={universiteTuru}
          onChange={(e) => setUniversiteTuru(e.target.value)}
          style={inputGenis}
        >
          <option value="">Tüm Üniversiteler</option>
          <option value="Devlet">Devlet</option>
          <option value="Vakıf">Vakıf</option>
        </select>
        <input
          placeholder="Bölüm adı (ör. Bilgisayar Mühendisliği)"
          value={bolum}
          onChange={(e) => setBolum(e.target.value)}
          style={inputGenis}
        />
      </div>
    </section>
  );
}

function OneriBolumu({
  baslik,
  puanTuru,
  siralama,
  filtre,
}: {
  baslik: string;
  puanTuru: PuanTuruKodu;
  siralama: number;
  filtre: Filtre;
}) {
  const { rahat, hedef, zor } = useMemo(
    () => onerileriGetir(siralama, puanTuru, filtre),
    // filtre nesnesi her render'da yeniden oluştuğu için içeriğine göre bağımlılık kuruyoruz
    [siralama, puanTuru, filtre.sehir, filtre.universite, filtre.universiteTuru, filtre.bolum]
  );

  return (
    <section style={kart}>
      <h2>{baslik}</h2>
      <p>
        Tahmini sıralama: <b>{siralama.toLocaleString("tr-TR")}</b>
      </p>

      <ProgramListesi baslik="Rahat Tercihler" liste={rahat} />
      <ProgramListesi baslik="Hedef Tercihler" liste={hedef} />
      <ProgramListesi baslik="Zor Tercihler" liste={zor} />
    </section>
  );
}

function ProgramListesi({ baslik, liste }: { baslik: string; liste: Program[] }) {
  return (
    <div style={{ marginTop: 20 }}>
      <h3>{baslik}</h3>

      {liste.length === 0 && <p>Bu aralıkta program bulunamadı.</p>}

      {liste.map((p, i) => (
        <div key={i} style={programKart}>
          <b>{programAdi(p)}</b>
          <span>{universiteAdi(p)}</span>
          <span>Puan Türü: {p.puanTuru}</span>
          <span>Taban Sıralama: {programSirasi(p).toLocaleString("tr-TR")}</span>
          {programPuani(p) > 0 && <span>Taban Puan: {programPuani(p)}</span>}
          {p.sehir && <span>Şehir: {p.sehir}</span>}
        </div>
      ))}
    </div>
  );
}

const sayfa: React.CSSProperties = {
  maxWidth: 1100,
  margin: "40px auto",
  padding: 20,
  fontFamily: "Arial, sans-serif",
};

const kart: React.CSSProperties = {
  background: "#fff",
  borderRadius: 16,
  padding: 20,
  marginBottom: 20,
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
};

const satir: React.CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "center",
  marginBottom: 10,
  flexWrap: "wrap",
};

const input: React.CSSProperties = {
  width: 90,
  padding: 10,
  border: "1px solid #ddd",
  borderRadius: 8,
};

const inputGenis: React.CSSProperties = {
  flex: "1 1 200px",
  padding: 10,
  border: "1px solid #ddd",
  borderRadius: 8,
};

const inputBuyuk: React.CSSProperties = {
  width: 160,
  padding: 12,
  marginTop: 10,
  border: "1px solid #ddd",
  borderRadius: 8,
  display: "block",
};

const buton: React.CSSProperties = {
  width: "100%",
  padding: 16,
  border: "none",
  borderRadius: 12,
  background: "#2563eb",
  color: "#fff",
  fontSize: 18,
  fontWeight: 700,
  cursor: "pointer",
  marginBottom: 20,
};

const sonucSatir: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "80px 1fr 1fr 1fr",
  gap: 12,
  padding: "12px 0",
  borderBottom: "1px solid #eee",
};

const programKart: React.CSSProperties = {
  display: "grid",
  gap: 6,
  padding: 14,
  marginBottom: 10,
  border: "1px solid #eee",
  borderRadius: 12,
  background: "#f9fafb",
};
