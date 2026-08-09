"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function KampusKocKayit() {
  const [paket, setPaket] = useState("");
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <a href="/kampus-koc" className="flex items-center gap-3">
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

          <a
            href="/kampus-koc"
            className="text-sm font-semibold text-slate-500 hover:text-blue-600"
          >
            ← KampüsKoç'a Dön
          </a>

        </div>
      </header>

      {/* CONTENT */}
      <section className="px-6 py-16">

        <div className="mx-auto max-w-5xl">

          <div className="text-center">

            <div className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-600">
              KampüsKoç'a Başla
            </div>

            <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Önce sana uygun
              <br />
              <span className="text-blue-600">
                paketi seç.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500">
              İhtiyacına uygun KampüsKoç paketini seç.
              Sonraki adımda öğrenci bilgilerini alacağız.
            </p>

          </div>

          {/* PACKAGES */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">

            {/* STANDART */}
            <button
              onClick={() => setPaket("standart")}
              className={`text-left rounded-3xl border-2 bg-white p-7 transition ${
                paket === "standart"
                  ? "border-blue-600 shadow-xl shadow-blue-600/10"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                    KampüsKoç
                  </p>

                  <h2 className="mt-1 text-3xl font-black text-slate-900">
                    Standart
                  </h2>
                </div>

                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${
                    paket === "standart"
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300"
                  }`}
                >
                  {paket === "standart" && "✓"}
                </div>

              </div>

              <div className="mt-7 space-y-3 text-sm text-slate-600">

                <p>✓ Kişisel çalışma programı</p>
                <p>✓ Haftalık takip</p>
                <p>✓ İnsan koç desteği</p>
                <p>✓ Haftada 1 saat soru çözümü</p>
                <p>✓ 10.00 – 19.00 iletişim</p>
                <p>✓ Deneme analizi</p>

              </div>

            </button>

            {/* VIP */}
            <button
              onClick={() => setPaket("vip")}
              className={`relative text-left rounded-3xl border-2 bg-slate-950 p-7 text-white transition ${
                paket === "vip"
                  ? "border-blue-500 shadow-xl shadow-blue-600/20"
                  : "border-slate-800 hover:border-blue-500"
              }`}
            >

              <div className="absolute -top-3 left-6 rounded-full bg-blue-600 px-4 py-1 text-xs font-black uppercase tracking-widest">
                Önerilen
              </div>

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
                    KampüsKoç
                  </p>

                  <h2 className="mt-1 text-3xl font-black">
                    VIP
                  </h2>
                </div>

                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${
                    paket === "vip"
                      ? "border-blue-400 bg-blue-600 text-white"
                      : "border-slate-600"
                  }`}
                >
                  {paket === "vip" && "✓"}
                </div>

              </div>

              <div className="mt-7 space-y-3 text-sm text-slate-300">

                <p>✓ Standart paketteki tüm özellikler</p>
                <p>✓ Haftada 3 saat soru çözümü</p>
                <p>✓ Kişisel koç</p>
                <p>✓ 10.00 – 23.00 iletişim</p>
                <p>✓ Özel not paylaşımı</p>
                <p>✓ Öncelikli destek</p>

              </div>

            </button>

          </div>

          {/* CONTINUE */}
          <div className="mx-auto mt-10 max-w-xl">

            <button
              disabled={!paket}
              onClick={() => {
  localStorage.setItem("kampusKocPaket", paket);
  router.push("/kampus-koc/kayit/bilgiler");
}}
              className={`w-full rounded-2xl px-6 py-4 font-bold transition ${
                paket
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500"
                  : "cursor-not-allowed bg-slate-200 text-slate-400"
              }`}
            >
              {paket
                ? `${paket === "vip" ? "VIP" : "Standart"} ile Devam Et →`
                : "Önce Paket Seç"}
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}