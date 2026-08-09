import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KampüsKoç | YKS Koçluk ve Kişisel Öğrenci Koçluğu",

  description:
    "KampüsKoç ile YKS hazırlık sürecini kişisel koç, sana özel çalışma programı, özel canlı ders, soru çözümü ve düzenli gelişim takibiyle yönet.",

  keywords: [
    "YKS koçluk",
    "YKS koçu",
    "YKS öğrenci koçu",
    "YKS özel koçluk",
    "YKS koçluk fiyatları",
    "üniversite sınavı koçluğu",
    "TYT koçluk",
    "AYT koçluk",
    "YKS çalışma programı",
    "KampüsKoç",
  ],

  alternates: {
    canonical: "https://koc.kampushocam.com/kampus-koc",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "KampüsKoç | YKS Koçluk ve Kişisel Öğrenci Koçluğu",
    description:
      "Kişisel koç, sana özel çalışma programı, özel canlı ders, soru çözümü ve gelişim takibiyle YKS hazırlık sistemi.",
    url: "https://koc.kampushocam.com/kampus-koc",
    siteName: "KampüsKoç",
    locale: "tr_TR",
    type: "website",
  },
};

export default function KampusKocLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}