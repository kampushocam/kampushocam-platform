"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Paket = "standart" | "vip";

export default function OgrenciBilgileri() {
  const router = useRouter();

  const [paket, setPaket] = useState<Paket | "">("");

  const [form, setForm] = useState({
    ad: "",
    soyad: "",
    telefon: "",
    email: "",
    sinif: "",
    sinav: "",
    hedef: "",
  });

  const [kvkk, setKvkk] = useState(false);

  useEffect(() => {
    const kayitliPaket = localStorage.getItem("kampusKocPaket");

    if (kayitliPaket === "standart" || kayitliPaket === "vip") {
      setPaket(kayitliPaket);
    } else {
      router.replace("/kampus-koc/kayit");
    }
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleContinue = () => {
    if (
      !form.ad ||
      !form.soyad ||
      !form.telefon ||
      !form.email ||
      !form.sinif ||
      !form.sinav ||
      !form.hedef
    ) {
      alert("Lütfen tüm bilgileri doldur.");
      return;
    }

    if (!kvkk) {
      alert("Devam etmek için onay kutusunu işaretlemelisin.");
      return;
    }

    localStorage.setItem(
      "kampusKocOgrenci",
      JSON.stringify(form)
    );

    router.push("/kampus-koc/kayit/ozet");
  };

  return (
    <main className="min-h-screen bg-slate-50">

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

          <div className="text-sm font-semibold text-slate-400">
            2 / 3
          </div>

        </div>
      </header>

      <section className="px-6 py-14">

        <div className="mx-auto max-w-3xl">

          <div className="text-center">

            <div className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-600">
              Öğrenci Bilgileri
            </div>

            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Seni biraz
              <br />
              <span className="text-blue-600">
                tanıyalım.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-500">
              Sana uygun koçluk deneyimini oluşturabilmemiz için
              birkaç temel bilgiye ihtiyacımız var.
            </p>

          </div>

          {paket && (
            <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-5">

              <div className="flex items-center justify-between gap-4">

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                    Seçtiğin Paket
                  </p>

                  <p className="mt-1 text-xl font-black text-slate-900">
                    KampüsKoç {paket === "vip" ? "VIP" : "Standart"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => router.push("/kampus-koc/kayit")}
                  className="text-sm font-bold text-blue-600 hover:text-blue-500"
                >
                  Paketi Değiştir
                </button>

              </div>

            </div>
          )}

          <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm md:p-10">

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Ad
                </label>

                <input
                  name="ad"
                  value={form.ad}
                  onChange={handleChange}
                  placeholder="Adın"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Soyad
                </label>

                <input
                  name="soyad"
                  value={form.soyad}
                  onChange={handleChange}
                  placeholder="Soyadın"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Telefon
                </label>

                <input
                  name="telefon"
                  value={form.telefon}
                  onChange={handleChange}
                  placeholder="05XX XXX XX XX"
                  type="tel"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  E-posta
                </label>

                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ornek@mail.com"
                  type="email"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Sınıf
                </label>

                <select
                  name="sinif"
                  value={form.sinif}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Sınıfını seç</option>
                  <option value="8">8. Sınıf</option>
                  <option value="9">9. Sınıf</option>
                  <option value="10">10. Sınıf</option>
                  <option value="11">11. Sınıf</option>
                  <option value="12">12. Sınıf</option>
                  <option value="mezun">Mezun</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Hazırlandığın sınav
                </label>

                <select
                  name="sinav"
                  value={form.sinav}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Sınavını seç</option>
                  <option value="yks">YKS</option>
                  <option value="lgs">LGS</option>
                  <option value="kpss">KPSS</option>
                </select>
              </div>

            </div>

            <div className="mt-6">

              <label className="mb-2 block text-sm font-bold text-slate-700">
                Hedefin nedir?
              </label>

              <input
                name="hedef"
                value={form.hedef}
                onChange={handleChange}
                placeholder="Örn: Tıp fakültesi / İlk 20.000"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-2 text-xs text-slate-400">
                Hedefini mümkün olduğunca net yazabilirsin.
              </p>

            </div>

            <div className="mt-7 rounded-xl bg-slate-50 p-4">

              <label className="flex cursor-pointer gap-3">

                <input
                  type="checkbox"
                  checked={kvkk}
                  onChange={(e) => setKvkk(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-blue-600"
                />

                <span className="text-xs leading-5 text-slate-500">
                  Bilgilerimin KampüsKoç hizmetinin sunulması ve
                  benimle iletişime geçilmesi amacıyla işlenmesini
                  kabul ediyorum.
                </span>

              </label>

            </div>

            <button
              type="button"
              onClick={handleContinue}
              className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              Bilgilerimi Kaydet ve Devam Et →
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}