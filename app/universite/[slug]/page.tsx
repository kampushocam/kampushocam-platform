import { programlar } from "@/data/programlar";

function slugYap(metin: string) {
  return metin
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replaceAll(" ", "-");
}

export default async function UniversiteDetay({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const ilgiliProgramlar = programlar.filter(
    (p) => slugYap(p.universite) === slug
  );

  const universiteAdi =
    ilgiliProgramlar[0]?.universite ?? "Üniversite bulunamadı";

  return (
    <main style={{ padding: "30px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>{universiteAdi}</h1>

      {ilgiliProgramlar.length === 0 ? (
        <p>Bu üniversite için kayıt bulunamadı.</p>
      ) : (
        <>
          <p>
            {universiteAdi} bölümleri, 2025 taban puanları ve başarı
            sıralamaları.
          </p>

          {ilgiliProgramlar.map((p, index) => (
            <div
              key={index}
              style={{
                padding: "15px",
                marginTop: "12px",
                borderRadius: "12px",
                background: "#f8fafc",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3>{p.bolum}</h3>
              <p>
                {p.puanTuru} — {p.sehir} — {p.universiteTuru} — {p.burs}
              </p>
              <p>
                Taban Puan: {p.tabanPuan2025} | Sıralama:{" "}
                {p.siralama2025.toLocaleString("tr-TR")}
              </p>
            </div>
          ))}
        </>
      )}
    </main>
  );
}