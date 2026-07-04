const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const root = process.cwd();
const rawDir = path.join(root, "raw-data");
const dataDir = path.join(root, "data");

const files = [
  {
    file: "tablo4_01082025d.xls",
    sheetIndex: 0,
    type: "Lisans",
    columns: {
      kod: 0,
      programAdi: 1,
      sure: 2,
      puanTuru: 3,
      kontenjan: 4,
      basariSirasi: 11,
      tabanPuan: 12,
    },
  },
  {
    file: "tablo3_01082025.xls",
    sheetIndex: 0,
    type: "Önlisans",
    columns: {
      kod: 0,
      programAdi: 1,
      sure: 2,
      puanTuru: 3,
      kontenjan: 4,
      basariSirasi: 10,
      tabanPuan: 11,
    },
  },
];

function temizle(value) {
  if (value === undefined || value === null) return "";
  return String(value).trim();
}

function sayi(value) {
  if (value === undefined || value === null) return 0;
  const text = String(value).replace(/\./g, "").replace(",", ".").trim();
  const n = Number(text);
  return Number.isFinite(n) ? n : 0;
}

function universiteTuruBul(ad) {
  if (ad.includes("Vakıf")) return "Vakıf";
  if (ad.includes("Devlet")) return "Devlet";
  return "Devlet";
}

function sehirBul(ad) {
  const match = ad.match(/\((.*?)\)/);
  if (!match) return "";
  const parantez = match[1];
  if (parantez.includes("Üniversitesi")) return "";
  return parantez.split(")")[0].replace("Devlet Üniversitesi", "").replace("Vakıf Üniversitesi", "").trim();
}

function universiteAdiTemizle(ad) {
  return ad
    .replace(/\(Devlet Üniversitesi\)/g, "")
    .replace(/\(Vakıf Üniversitesi\)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function programSatiriMi(row, col) {
  const kod = temizle(row[col.kod]);
  const ad = temizle(row[col.programAdi]);
  const puanTuru = temizle(row[col.puanTuru]);

  return /^\d{8,}$/.test(kod) && ad && puanTuru;
}

function oku(config) {
  const filePath = path.join(rawDir, config.file);

  if (!fs.existsSync(filePath)) {
    console.error(`Dosya bulunamadı: ${filePath}`);
    process.exit(1);
  }

  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[config.sheetIndex];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });

  const programlar = [];
  let aktifUniversite = "";
  let aktifSehir = "";
  let aktifUniversiteTuru = "Devlet";

  for (const row of rows) {
    const ilkHucre = temizle(row[0]);
    const ikinciHucre = temizle(row[1]);

    if (!ilkHucre && ikinciHucre && ikinciHucre.includes("ÜNİVERSİTESİ")) {
      aktifUniversite = universiteAdiTemizle(ikinciHucre);
      aktifSehir = sehirBul(ikinciHucre);
      aktifUniversiteTuru = universiteTuruBul(ikinciHucre);
      continue;
    }

    if (!programSatiriMi(row, config.columns)) continue;

    const kod = temizle(row[config.columns.kod]);
    const bolum = temizle(row[config.columns.programAdi]);
    const puanTuru = temizle(row[config.columns.puanTuru]);

    if (!aktifUniversite || !bolum) continue;

    programlar.push({
      kod,
      universite: aktifUniversite,
      bolum,
      sehir: aktifSehir,
      puanTuru,
      universiteTuru: aktifUniversiteTuru,
      burs: bolum.includes("Burslu")
        ? "Burslu"
        : bolum.includes("%50")
        ? "%50 İndirimli"
        : bolum.includes("Ücretli")
        ? "Ücretli"
        : "Ücretsiz",
      ogretimTuru: bolum.includes("İkinci Öğretim") ? "İkinci Öğretim" : "Örgün",
      programTuru: config.type,
      sure: sayi(row[config.columns.sure]),
      kontenjan2025: sayi(row[config.columns.kontenjan]),
      tabanPuan2025: sayi(row[config.columns.tabanPuan]),
      siralama2025: sayi(row[config.columns.basariSirasi]),
      siralama2024: sayi(row[config.columns.basariSirasi]),
      siralama2023: 0,
      siralama2022: 0,
      siralama2021: 0,
    });
  }

  return programlar;
}

const tumProgramlar = files.flatMap(oku).filter((p) => p.tabanPuan2025 > 0 || p.siralama2025 > 0);

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

fs.writeFileSync(
  path.join(dataDir, "programlar.json"),
  JSON.stringify(tumProgramlar, null, 2),
  "utf-8"
);

fs.writeFileSync(
  path.join(dataDir, "programlar.ts"),
  `import programlarJson from "./programlar.json";

export type Program = {
  kod: string;
  universite: string;
  bolum: string;
  sehir: string;
  puanTuru: string;
  universiteTuru: string;
  burs: string;
  ogretimTuru: string;
  programTuru: string;
  sure: number;
  kontenjan2025: number;
  tabanPuan2025: number;
  siralama2025: number;
  siralama2024: number;
  siralama2023: number;
  siralama2022: number;
  siralama2021: number;
};

export const programlar = programlarJson as Program[];
`,
  "utf-8"
);

console.log("Aktarım tamamlandı.");
console.log("Toplam program:", tumProgramlar.length);
console.log("Oluşturulan dosya: data/programlar.json");
console.log("Güncellenen dosya: data/programlar.ts");