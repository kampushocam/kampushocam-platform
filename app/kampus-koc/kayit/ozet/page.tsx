```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Paket = "standart" | "vip";

type Ogrenci = {
  ad: string;
  soyad: string;
  telefon: string;
  email: string;
  sinif: string;
  sinav: string;
  hedef: string;
};

export default function KayitOzeti() {
  const router = useRouter();

  const [paket, setPaket] = useState<Paket | "">("");
  const [ogrenci, setOgrenci] = useState<Ogrenci | null>(null);

  useEffect(() => {
    const kayitliPaket = localStorage.getItem("kampusKocPaket");
    const kayitliOgrenci = localStorage.getItem("kampusKocOgrenci");

    if (kayitliPaket !== "standart" && kayitliPaket !== "vip") {
      router.replace("/kampus-koc/kayit");
      return;
    }

    if (!kayitliOgrenci) {
      router.replace("/kampus-koc/kayit/bilgiler");
      return;
    }

    try {
      const ogrenciBilgisi = JSON.parse(kayitliOgrenci) as Ogrenci;

      setPaket(kayitliPaket);
      setOgrenci(ogrenciBilgisi);
    } catch {
      localStorage.removeItem("kampusKocOgrenci");
      router.replace("/kampus-koc/kayit/bilgiler");
    }
  }, [router]);

  if (!paket || !ogrenci) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="font-semibold text-slate-500">
          Bilgiler yükleniyor...
        </p>
      </main>
    );
  }

  const isVip = paket === "vip";

  const paketAdi = isVip
    ? "KampüsKoç VIP"
    : "KampüsKoç Standart";

  const fiyat = isVip ? "3.990 TL" : "2.490 TL";

  let sinavAdi = ogrenci.sinav;

  if (ogrenci.sinav === "yks") {
    sinavAdi = "YKS";
  } else if (ogrenci.sinav === "lgs") {
    sinavAdi = "LGS";
  } else if (ogrenci.sinav === "kpss") {
    sinavAdi = "KPSS";
  }

  let sinifAdi = ogrenci.sinif;

  if (ogrenci.sinif === "mezun") {
    sinifAdi = "Mezun";
  } else {
    sinifAdi = ogrenci.sinif + ". Sınıf";
  }

  const handleEdit = () => {
    router.push("/kampus-koc/kayit/bilgiler");
  };

  const handleComplete = () => {
    router.push("/kampus-koc/kayit/odeme");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a
            href="/kampus-koc"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-black text-white">
              K
            </div>

            <div>
              <div className="text-xl font-extrabold text-slate-900">
                Kampüs<span className="text-blue-600">Koç</span>
              </div>

              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Kampüshocam Akademi
              </div>
            </div>
          </a>

          <div className="text-sm font-semibold text-slate-400">
            3 / 3
          </div>
        </div>
      </header>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <div className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-600">
              Kayıt Özeti
            </div>

            <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              KampüsKoç&apos;a
              <br />
              <span className="text-blue-600">
                hoş geldin.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-500">
              Bilgilerini kontrol et. Ardından üyeliğini
              tamamlayarak KampüsKoç sistemine başlayabilirsin.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-5">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm lg:col-span-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900">
                  Öğrenci Bilgileri
                </h2>

                <button
                  type="button"
                  onClick={handleEdit}
                  className="text-sm font-bold text-blue-600 hover:text-blue-500"
                >
                  Düzenle
                </button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Ad Soyad
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {ogrenci.ad} {ogrenci.soyad}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Telefon
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {ogrenci.telefon}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    E-posta
                  </p>

                  <p className="mt-1 break-all font-bold text-slate-900">
                    {ogrenci.email}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Sınav
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {sinavAdi}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Sınıf
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {sinifAdi}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Hedef
                  </p>

                  <p className="mt-1 font-bold text-slate-900">
                    {ogrenci.hedef}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={
                isVip
                  ? "rounded-[2rem] bg-slate-950 p-7 text-white shadow-xl lg:col-span-2"
                  : "rounded-[2rem] bg-blue-600 p-7 text-white shadow-xl lg:col-span-2"
              }
            >
              <p
                className={
                  isVip
                    ? "text-sm font-bold uppercase tracking-widest text-blue-400"
                    : "text-sm font-bold uppercase tracking-widest text-blue-100"
                }
              >
                Seçilen Paket
              </p>

              <h2 className="mt-2 text-3xl font-black">
                {paketAdi}
              </h2>

              <div className="mt-7 space-y-3 text-sm">
                {isVip ? (
                  <>
                    <p className="text-slate-300">
                      ✓ Standart paketteki tüm özellikler
                    </p>

                    <p className="text-slate-300">
                      ✓ Haftada 3 saat canlı özel ders
                    </p>

                    <p className="text-slate-300">
                      ✓ KampüsHocam Akademi özel ders notları
                    </p>

                    <p className="text-slate-300">
                      ✓ 10.00 – 23.00 kişisel koç ile sınırsız iletişim
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-blue-50">
                      ✓ Kişisel koç
                    </p>

                    <p className="text-blue-50">
                      ✓ Sana özel haftalık çalışma programı
                    </p>

                    <p className="text-blue-50">
                      ✓ Haftada 1 saat özel canlı ders
                    </p>

                    <p className="text-blue-50">
                      ✓ Haftada 1 deneme çözümü ve kontrolü
                    </p>

                    <p className="text-blue-50">
                      ✓ 10.00 – 19.00 kişisel koç ile sınırsız iletişim
                    </p>

                    <p className="text-blue-50">
                      ✓ Ödevlendirme ve kontrol takip sistemi
                    </p>

                    <p className="text-blue-50">
                      ✓ Kişisel gelişim takip programı
                    </p>

                    <p className="text-blue-50">
                      ✓ Haftalık veli bilgi paneli
                    </p>

                    <p className="text-blue-50">
                      ✓ Veliye haftalık gelişim raporu
                    </p>
                  </>
                )}
              </div>

              <div
                className={
                  isVip
                    ? "my-7 border-t border-slate-800"
                    : "my-7 border-t border-blue-500"
                }
              />

              <div>
                <p
                  className={
                    isVip
                      ? "text-sm text-slate-400"
                      : "text-sm text-blue-100"
                  }
                >
                  Aylık üyelik
                </p>

                <p className="mt-1 text-4xl font-black">
                  {fiyat}
                </p>
              </div>

              <button
                type="button"
                onClick={handleComplete}
                className="mt-7 w-full rounded-xl bg-white px-6 py-4 font-bold text-slate-900 transition hover:bg-slate-100"
              >
                Üyeliği Tamamla →
              </button>

              <p
                className={
                  isVip
                    ? "mt-4 text-center text-xs text-slate-500"
                    : "mt-4 text-center text-xs text-blue-100"
                }
              >
                Güvenli ödeme altyapısı ile ödeme yapılır.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
```
