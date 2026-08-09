"use client";

import { useState } from "react";

const whatsappNumber = "905302938851";

const standartMessage = encodeURIComponent(
  "Merhaba, KampüsKoç Standart paket hakkında bilgi almak istiyorum."
);

const vipMessage = encodeURIComponent(
  "Merhaba, KampüsKoç VIP paket hakkında bilgi almak istiyorum."
);

const generalMessage = encodeURIComponent(
  "Merhaba, KampüsKoç hakkında bilgi almak istiyorum."
);

const anaSayfaUrl = "https://kampushocam.com";

export default function KampusKoc() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a
            href={anaSayfaUrl}
            className="flex items-center gap-3"
            aria-label="KampüsHocam Ana Sayfa"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-600/20">
              K
            </div>

            <div>
              <div className="text-xl font-extrabold tracking-tight text-slate-900">
                Kampüs<span className="text-blue-600">Koç</span>
              </div>

              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Kampüshocam Akademi
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href={anaSayfaUrl}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Ana Sayfa
            </a>

            <a
              href="#sistem"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Nasıl Çalışır?
            </a>

            <a
              href="#paketler"
              className="text-sm font-bold text-blue-600"
            >
              Paketler
            </a>

            <a
              href="#sss"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Sık Sorulan Sorular
            </a>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${generalMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-600"
            >
              Bilgi Al
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-xl md:hidden"
            aria-label="Menüyü aç"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              <a
                href={anaSayfaUrl}
                onClick={closeMenu}
                className="font-medium text-slate-700"
              >
                Ana Sayfa
              </a>

              <a
                href="#sistem"
                onClick={closeMenu}
                className="font-medium text-slate-700"
              >
                Nasıl Çalışır?
              </a>

              <a
                href="#paketler"
                onClick={closeMenu}
                className="font-bold text-blue-600"
              >
                Paketler
              </a>

              <a
                href="#sss"
                onClick={closeMenu}
                className="font-medium text-slate-700"
              >
                Sık Sorulan Sorular
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${generalMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="rounded-xl bg-slate-900 px-5 py-3 text-center font-bold text-white"
              >
                WhatsApp'tan Bilgi Al
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Kişisel Koçluk Sistemi
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-white md:text-6xl">
              YKS Hedefin belli.
              <br />
              <span className="text-blue-500">Planın hazır mı?</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              KampüsKoç ile sınav sürecini yalnız yönetme.
              Sana özel çalışma planı, kişisel koç desteği,
              özel canlı ders, soru çözümü ve gelişim takibi
              tek bir sistemde.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${generalMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-blue-600 px-7 py-4 text-center font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                🚀 WhatsApp'tan Bilgi Al
              </a>

              <a
                href="#paketler"
                className="rounded-xl border border-slate-700 bg-white/5 px-7 py-4 text-center font-bold text-white transition hover:bg-white/10"
              >
                Paketleri İncele
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
              <span>✓ Sana özel plan</span>
              <span>✓ Kişisel koç</span>
              <span>✓ Haftalık takip</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-blue-600/20 blur-3xl" />

            <div className="relative rounded-3xl border border-slate-700 bg-slate-900 p-4 shadow-2xl">
              <div className="mb-4 flex items-center gap-2 px-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <div className="ml-3 h-7 flex-1 rounded-lg bg-slate-800" />
              </div>

              <div className="rounded-2xl bg-slate-100 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      KAMPÜSKOÇ PANELİ
                    </p>

                    <h3 className="mt-1 text-xl font-black text-slate-900">
                      Hoş geldin, Ahmet 👋
                    </h3>
                  </div>

                  <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    11. Sınıf
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-xs text-slate-400">Çalışma</p>
                    <p className="mt-1 text-xl font-black">5s 42dk</p>
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-xs text-slate-400">Görev</p>
                    <p className="mt-1 text-xl font-black">%78</p>
                  </div>

                  <div className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-xs text-slate-400">Net</p>
                    <p className="mt-1 text-xl font-black text-blue-600">
                      74,5
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-400">
                        HAFTALIK GELİŞİM
                      </p>

                      <p className="mt-1 text-2xl font-black text-slate-900">
                        +6,3 net
                      </p>
                    </div>

                    <div className="text-sm font-bold text-green-600">
                      ↑ %12
                    </div>
                  </div>

                  <div className="mt-5 flex h-24 items-end gap-2">
                    {[35, 45, 40, 55, 62, 70, 82, 95].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t-md bg-blue-500"
                          style={{ height: `${height}%` }}
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-slate-900 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600">
                      K
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Koçundan mesaj
                      </p>

                      <p className="text-sm font-semibold">
                        Bu hafta matematiğe biraz daha yükleniyoruz. 💪
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:block">
              <p className="text-xs font-semibold text-slate-400">
                BUGÜNKÜ İLERLEME
              </p>

              <p className="mt-1 text-2xl font-black text-slate-900">
                %82
              </p>

              <div className="mt-2 h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[82%] rounded-full bg-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM */}
      <section id="sistem" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-600">
              KampüsKoç Sistemi
            </div>

            <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Sadece program değil,
              <br />
              <span className="text-blue-600">
                sistemli bir çalışma düzeni.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-500">
              KampüsKoç, hedefinden günlük çalışmalarına kadar
              sınav sürecinin tamamını takip eder.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {[
              {
                icon: "🎯",
                number: "01",
                title: "Hedefini Belirle",
                text: "Hedef bölümünü, sıralamanı ve sınav hedefini birlikte belirle.",
              },
              {
                icon: "📅",
                number: "02",
                title: "Planını Oluştur",
                text: "Seviyene ve hedeflerine uygun kişisel çalışma programın hazırlanır.",
              },
              {
                icon: "💬",
                number: "03",
                title: "Koçuna Ulaş",
                text: "Takıldığın yerde kişisel koçundan destek al ve sorularını çöz.",
              },
              {
                icon: "📊",
                number: "04",
                title: "Gelişimini Takip Et",
                text: "Denemelerini, netlerini ve çalışma performansını düzenli takip et.",
              },
              {
                icon: "🚀",
                number: "05",
                title: "Sistemi Güncelle",
                text: "Eksiklerine göre planını sürekli geliştir ve hedefe ilerle.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                  {item.icon}
                </div>

                <div className="mt-6 text-sm font-bold text-blue-600">
                  {item.number}
                </div>

                <h3 className="mt-2 text-xl font-black text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="paketler" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-600">
              Koçluk Paketleri
            </div>

            <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Sana uygun koçluğu seç.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-500">
              İhtiyacına göre Standart veya VIP KampüsKoç paketinden
              birini seç ve sınav sürecini profesyonel şekilde yönet.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-8 lg:grid-cols-2">
            {/* STANDART */}
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest text-slate-400">
                    KampüsKoç
                  </div>

                  <h3 className="mt-2 text-3xl font-black text-slate-900">
                    Standart
                  </h3>
                </div>

                <div className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600">
                  Başlangıç
                </div>
              </div>

              <div className="mt-6">
                <span className="text-4xl font-black text-slate-900">
                  2.490 TL
                </span>

                <span className="ml-2 text-sm text-slate-400">
                  / ay
                </span>
              </div>

              <p className="mt-5 leading-7 text-slate-500">
                Düzenli takip, kişisel koçluk ve özel ders desteğiyle
                sınav sürecini kontrollü şekilde yürüt.
              </p>

              <div className="my-8 h-px bg-slate-100" />

              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-blue-600">✓</span>
                  <span>Kişisel koç</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-600">✓</span>
                  <span>Sana özel haftalık çalışma programı</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-600">✓</span>
                  <span>Haftada 1 saat özel canlı ders imkanı</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-600">✓</span>
                  <span>Haftada 1 deneme çözümü ve kontrolü</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-600">✓</span>
                  <span>10.00 – 19.00 arası kişisel koç ile sınırsız iletişim</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-600">✓</span>
                  <span>Ödevlendirme ve kontrol takip sistemi</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-600">✓</span>
                  <span>Kişisel gelişim takip programı</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-600">✓</span>
                  <span>Haftalık veli bilgi paneli</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-600">✓</span>
                  <span>Veliye haftalık gelişim raporu sunumu</span>
                </li>
              </ul>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${standartMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 block w-full rounded-xl border-2 border-slate-900 px-6 py-4 text-center font-bold text-slate-900 transition hover:bg-slate-900 hover:text-white"
              >
                Standart'a Başla →
              </a>
            </div>

            {/* VIP */}
            <div className="relative rounded-[2rem] border-2 border-blue-600 bg-slate-950 p-8 text-white shadow-2xl shadow-blue-600/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-5 py-2 text-xs font-black uppercase tracking-widest text-white">
                En Çok Tercih Edilen
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold uppercase tracking-widest text-blue-400">
                    KampüsKoç
                  </div>

                  <h3 className="mt-2 text-3xl font-black">
                    VIP
                  </h3>
                </div>

                <div className="rounded-xl bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-400">
                  Premium
                </div>
              </div>

              <div className="mt-6">
                <span className="text-4xl font-black text-white">
                  3.990 TL
                </span>

                <span className="ml-2 text-sm text-slate-400">
                  / ay
                </span>
              </div>

              <p className="mt-5 leading-7 text-slate-300">
                Standart paketin tüm özelliklerine ek olarak
                daha fazla özel ders, özel kaynaklar ve daha uzun
                iletişim imkanı.
              </p>

              <div className="my-8 h-px bg-slate-800" />

              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>Standart paketteki tüm özellikler</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>Haftada 3 saat özel canlı ders</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>KampüsHocam Akademi özel ders notları</span>
                </li>

                <li className="flex gap-3">
                  <span className="text-blue-400">✓</span>
                  <span>10.00 – 23.00 arası kişisel koç ile sınırsız iletişim</span>
                </li>
              </ul>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${vipMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 block w-full rounded-xl bg-blue-600 px-6 py-4 text-center font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                VIP'e Başla →
              </a>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-slate-400">
            Ödeme işlemi internet sitesi üzerinden yapılmaz.
            Paket seçiminin ardından WhatsApp müşteri temsilcimiz
            sizinle iletişime geçer.
          </p>
        </div>
      </section>

      {/* WEEKLY SYSTEM */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-600">
              Bir Haftan Nasıl Geçer?
            </div>

            <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              KampüsKoç ile her günün
              <br />
              <span className="text-blue-600">bir amacı var.</span>
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-500">
              Haftanın her günü ne yapacağını bil,
              koçunla iletişimde kal ve gelişimini takip et.
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["📅", "01", "Pazartesi", "Haftalık çalışma programın açılır. Günlük görevlerini ve hedeflerini görürsün."],
              ["⏱️", "02", "Salı", "Çalışma performansın takip edilir. Eksik kalan görevlerin belirlenir."],
              ["💬", "03", "Çarşamba", "Takıldığın konuları koçuna iletir, soru çözümü ve destek alırsın."],
              ["📝", "04", "Perşembe", "Özel ders ve soru çözümü saatini kullan, eksiklerini kapat."],
              ["📚", "05", "Cuma", "Haftalık hedeflerinin ne kadarını tamamladığını kontrol et."],
              ["📊", "06", "Cumartesi", "Denemeni çöz, sonuçlarını sisteme gir ve gelişimini gör."],
              ["🚀", "07", "Pazar", "Koçun haftanı analiz eder ve yeni haftanın planını oluşturur."],
            ].map(([icon, number, day, text]) => (
              <div
                key={number}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{icon}</span>

                  <span className="text-xs font-black uppercase tracking-widest text-blue-600">
                    {number}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-black">{day}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {text}
                </p>
              </div>
            ))}

            <div className="rounded-3xl bg-slate-950 p-6 text-white">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🎯</span>

                <span className="text-xs font-black uppercase tracking-widest text-blue-400">
                  SONUÇ
                </span>
              </div>

              <h3 className="mt-6 text-xl font-black">
                Daha iyi bir hafta
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Her hafta verilerini analiz et, planını geliştir
                ve hedefe biraz daha yaklaş.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STUDENT PANEL */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <div className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-600">
                Öğrenci Paneli
              </div>

              <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                Ne yaptığını değil,
                <br />
                <span className="text-blue-600">
                  ne kadar geliştiğini gör.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500">
                KampüsKoç panelinden günlük görevlerini,
                çalışma süreni, deneme sonuçlarını ve net gelişimini
                tek ekrandan takip et.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  ["📚", "Günlük görevler", "Bugün ne çalışacağını tek ekranda gör."],
                  ["📈", "Net gelişimi", "Denemelerini karşılaştır ve ilerlemeni takip et."],
                  ["💬", "Koç iletişimi", "Koçundan gelen mesajlara ve yönlendirmelere ulaş."],
                ].map(([icon, title, text]) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                      {icon}
                    </div>

                    <div>
                      <h3 className="font-bold">{title}</h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl">
              <div className="rounded-2xl bg-slate-100 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Öğrenci Paneli
                    </p>

                    <h3 className="mt-1 text-xl font-black text-slate-900">
                      Ahmet Yılmaz
                    </h3>
                  </div>

                  <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    SAY
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs text-slate-400">Çalışma</p>
                    <p className="mt-1 text-lg font-black">18s 42dk</p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs text-slate-400">Görev</p>
                    <p className="mt-1 text-lg font-black">%86</p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs text-slate-400">Deneme</p>
                    <p className="mt-1 text-lg font-black">3</p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs text-slate-400">Ortalama</p>
                    <p className="mt-1 text-lg font-black text-blue-600">
                      74,5
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-white p-5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-slate-900">
                      Bu Haftanın Çalışmaları
                    </h4>

                    <span className="text-xs font-bold text-blue-600">
                      %78 tamamlandı
                    </span>
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      ["Matematik", "90%"],
                      ["Türkçe", "75%"],
                      ["Fizik", "65%"],
                    ].map(([lesson, percentage]) => (
                      <div key={lesson}>
                        <div className="mb-2 flex justify-between text-xs">
                          <span className="font-semibold">{lesson}</span>

                          <span className="text-slate-400">
                            {percentage}
                          </span>
                        </div>

                        <div className="h-2 rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{ width: percentage }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-slate-950 p-5 text-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-black">
                      K
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Koçundan mesaj
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        Bu hafta matematik performansın çok iyi.
                        Fizikte biraz daha soru çözelim. 💪
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARENT PANEL */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="order-2 rounded-[2rem] bg-slate-950 p-6 shadow-2xl lg:order-1">
              <div className="rounded-2xl bg-slate-100 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Veli Paneli
                    </p>

                    <h3 className="mt-1 text-xl font-black text-slate-900">
                      Ahmet'in Gelişimi
                    </h3>
                  </div>

                  <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                    İyi gidiyor
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs text-slate-400">Bu Hafta</p>
                    <p className="mt-1 text-2xl font-black">18s 42dk</p>
                    <p className="mt-1 text-xs font-semibold text-green-600">
                      ↑ %14
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs text-slate-400">
                      Net Değişimi
                    </p>

                    <p className="mt-1 text-2xl font-black text-blue-600">
                      +6,3
                    </p>

                    <p className="mt-1 text-xs font-semibold text-green-600">
                      Son 4 hafta
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-white p-5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-slate-900">
                      Haftalık Çalışma
                    </h4>

                    <span className="text-xs text-slate-400">
                      Hedef: 20 saat
                    </span>
                  </div>

                  <div className="mt-6 flex h-32 items-end gap-2">
                    {[55, 70, 45, 85, 65, 92, 78].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex flex-1 flex-col items-center justify-end gap-2"
                        >
                          <div
                            className="w-full rounded-t-md bg-blue-500"
                            style={{ height: `${height}%` }}
                          />

                          <span className="text-[10px] font-semibold text-slate-400">
                            {["P", "S", "Ç", "P", "C", "C", "P"][index]}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-white p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-lg">
                      👨‍🏫
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Koç değerlendirmesi
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        Ahmet'in çalışma düzeni bu hafta
                        geçen haftaya göre daha iyi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-600">
                Veli Paneli
              </div>

              <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                Çocuğunuzun sınav
                <br />
                sürecini{" "}
                <span className="text-blue-600">takip edin.</span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500">
                KampüsKoç Veli Paneli sayesinde çocuğunuzun
                çalışma düzenini, deneme sonuçlarını ve gelişimini
                kolayca takip edebilirsiniz.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  ["⏱️", "Çalışma süresi", "Öğrencinizin haftalık çalışma süresini görün."],
                  ["📊", "Deneme sonuçları", "Deneme sonuçlarını ve net değişimini takip edin."],
                  ["💬", "Koç değerlendirmesi", "Koçun öğrenciniz hakkındaki haftalık değerlendirmesini görün."],
                ].map(([icon, title, text]) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
                      {icon}
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        {title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-600">
              Öğrenciler Ne Diyor?
            </div>

            <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Yalnız değilsin.
              <br />
              <span className="text-blue-600">
                KampüsKoç yanında.
              </span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                initial: "E",
                name: "Eylül",
                text: "Daha önce sürekli program yapıp yarıda bırakıyordum. Koçum sayesinde ne yapacağımı her gün biliyorum. Özellikle haftalık takip sistemi çok işime yaradı.",
              },
              {
                initial: "M",
                name: "Mert",
                text: "En sevdiğim tarafı koçuma ulaşabilmem. Bir konuda takıldığımda günlerce beklemiyorum. Çalışma düzenim gerçekten değişti.",
              },
              {
                initial: "Z",
                name: "Zeynep",
                text: "Velimin de benim de süreci takip edebilmesi çok güzel. Deneme sonuçlarımı ve çalışma süremi tek panelden görebiliyorum.",
              },
            ].map((review) => (
              <div
                key={review.name}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="text-lg tracking-widest text-yellow-400">
                  ★★★★★
                </div>

                <p className="mt-5 leading-7 text-slate-600">
                  “{review.text}”
                </p>

                <div className="mt-7 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-black text-blue-600">
                    {review.initial}
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">
                      {review.name}
                    </p>

                    <p className="text-xs text-slate-400">
                      YKS Öğrencisi
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="sss" className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <div className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-600">
              Sık Sorulan Sorular
            </div>

            <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Merak ettiklerin
              <br />
              <span className="text-blue-600">burada.</span>
            </h2>
          </div>

          <div className="mt-14 space-y-4">
            <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-slate-900">
                KampüsKoç nedir?
                <span className="text-2xl text-blue-600 transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 leading-7 text-slate-500">
                KampüsKoç; öğrenciye özel çalışma planı,
                kişisel koç desteği, özel canlı ders, deneme çözümü,
                ödevlendirme, veli takibi ve gelişim takibini bir araya
                getiren kişisel sınav hazırlık sistemidir.
              </p>
            </details>

            <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-slate-900">
                Koçuma nasıl ulaşacağım?
                <span className="text-2xl text-blue-600 transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 leading-7 text-slate-500">
                Paketine göre belirlenen saat aralığında
                KampüsKoç sistemi üzerinden kişisel koçunla iletişim
                kurabilir ve özel ders veya soru çözümü desteği alabilirsin.
              </p>
            </details>

            <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-slate-900">
                Standart ve VIP arasındaki fark nedir?
                <span className="text-2xl text-blue-600 transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 leading-7 text-slate-500">
                Standart paket aylık 2.490 TL'dir. Kişisel koç,
                haftalık çalışma programı, haftada 1 saat özel canlı ders,
                haftada 1 deneme çözümü ve kontrolü, 10.00–19.00 iletişim,
                ödevlendirme, gelişim takibi ve veli raporu sunar.
                VIP paket aylık 3.990 TL'dir ve Standart paketin tamamına
                ek olarak haftada 3 saat özel canlı ders, KampüsHocam Akademi
                özel ders notları ve 10.00–23.00 iletişim imkanı sunar.
              </p>
            </details>

            <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-slate-900">
                Hangi sınavlara yönelik koçluk veriyorsunuz?
                <span className="text-2xl text-blue-600 transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 leading-7 text-slate-500">
                KampüsKoç sistemi YKS, LGS ve KPSS gibi
                sınavlara hazırlanan öğrenciler için yapılandırılabilir.
              </p>
            </details>

            <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-slate-900">
                Ödeme işlemi nasıl yapılıyor?
                <span className="text-2xl text-blue-600 transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 leading-7 text-slate-500">
                İnternet sitesi üzerinden ödeme alınmaz.
                Paketini seçtikten sonra WhatsApp üzerinden
                müşteri temsilcimizle iletişime geçerek
                kayıt ve ödeme süreci hakkında bilgi alabilirsin.
              </p>
            </details>

            <details className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-slate-900">
                KampüsHocam Akademi üyeliği gerekli mi?
                <span className="text-2xl text-blue-600 transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 leading-7 text-slate-500">
                KampüsKoç, KampüsHocam Akademi ekosistemi
                içerisinde sunulan bağımsız bir koçluk hizmetidir.
                Detaylı bilgi için WhatsApp üzerinden
                müşteri temsilcimizle iletişime geçebilirsin.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-slate-950 py-24">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl shadow-lg shadow-blue-600/30">
            🚀
          </div>

          <h2 className="mt-8 text-4xl font-black tracking-tight text-white md:text-6xl">
            Hedefine giden yolda
            <br />
            <span className="text-blue-500">
              yalnız değilsin.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            KampüsKoç ile çalışma düzenini oluştur,
            kişisel koçundan destek al ve hedeflediğin başarıya
            sistemli bir şekilde ilerle.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${generalMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              🚀 WhatsApp'tan Bilgi Al
            </a>

            <a
              href="#paketler"
              className="rounded-xl border border-slate-700 bg-white/5 px-8 py-4 font-bold text-white transition hover:bg-white/10"
            >
              Paketleri İncele
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-400">
            <span>✓ Kişisel koç</span>
            <span>✓ Özel canlı ders</span>
            <span>✓ Haftalık takip</span>
            <span>✓ Öğrenci paneli</span>
            <span>✓ Veli paneli</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="text-2xl font-black">
                Kampüs<span className="text-blue-500">Koç</span>
              </div>

              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Kampüshocam Akademi
              </p>

              <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
                Öğrencilerin hedeflerine ulaşmaları için
                kişisel koçluk, özel ders, takip ve gelişim sistemini
                tek platformda buluşturuyoruz.
              </p>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${generalMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                WhatsApp'tan İletişime Geç
              </a>
            </div>

            <div>
              <h3 className="font-bold">KampüsKoç</h3>

              <div className="mt-4 space-y-3 text-sm text-slate-400">
                <a
                  href="#sistem"
                  className="block transition hover:text-white"
                >
                  Nasıl Çalışır?
                </a>

                <a
                  href="#paketler"
                  className="block transition hover:text-white"
                >
                  Paketler
                </a>

                <a
                  href="#sss"
                  className="block transition hover:text-white"
                >
                  Sık Sorulan Sorular
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold">KampüsHocam</h3>

              <div className="mt-4 space-y-3 text-sm text-slate-400">
                <a
                  href={anaSayfaUrl}
                  className="block transition hover:text-white"
                >
                  Ana Sayfa
                </a>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${generalMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition hover:text-white"
                >
                  İletişim
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
            © 2026 KampüsHocam Akademi. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </main>
  );
}