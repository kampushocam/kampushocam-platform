import programlarJson from "./programlar.json";

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
