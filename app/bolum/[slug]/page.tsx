import { programlar } from "@/data/programlar";

export default async function BolumDetay({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const bolumAdi = slug
  .replace(/eczacilik/g, "eczacılık")
    .replace(/-/g, " ")
    .toLocaleLowerCase("tr-TR");

  const ilgiliProgramlar = programlar.filter(
    (p) => p.bolum.toLocaleLowerCase("tr-TR") === bolumAdi
  );

  return (
    <main style={{ padding: "30px" }}>
      <h1>{bolumAdi.toLocaleUpperCase("tr-TR")} Bölümü</h1>

      {ilgiliProgramlar.length === 0 ? (
        <p>Bu bölüm için kayıt bulunamadı.</p>
      ) : (
        <ul>
          {ilgiliProgramlar.map((p, index) => (
            <li key={index}>
              {p.universite} - {p.sehir} - {p.tabanPuan2025} puan -{" "}
              {p.siralama2025} sıralama
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}