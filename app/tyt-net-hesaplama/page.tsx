"use client";

import { useState } from "react";

export default function Home() {
  const [turkceD, setTurkceD] = useState(0);
  const [turkceY, setTurkceY] = useState(0);
  const [matD, setMatD] = useState(0);
  const [matY, setMatY] = useState(0);
  const [sosyalD, setSosyalD] = useState(0);
  const [sosyalY, setSosyalY] = useState(0);
  const [fenD, setFenD] = useState(0);
  const [fenY, setFenY] = useState(0);

  const net = (d: number, y: number) => d - y / 4;

  const turkceNet = net(turkceD, turkceY);
  const matNet = net(matD, matY);
  const sosyalNet = net(sosyalD, sosyalY);
  const fenNet = net(fenD, fenY);

  const toplamNet = turkceNet + matNet + sosyalNet + fenNet;

  return (
    <main style={{ minHeight: "100vh", padding: "40px", background: "#0f172a", color: "white", fontFamily: "Arial" }}>
      <h1>TYT Net Hesaplama</h1>
      <p>Doğru ve yanlış sayılarını gir, netini anında hesapla.</p>

      <Ders title="Türkçe" soru={40} setD={setTurkceD} setY={setTurkceY} net={turkceNet} />
      <Ders title="Matematik" soru={40} setD={setMatD} setY={setMatY} net={matNet} />
      <Ders title="Sosyal Bilimler" soru={20} setD={setSosyalD} setY={setSosyalY} net={sosyalNet} />
      <Ders title="Fen Bilimleri" soru={20} setD={setFenD} setY={setFenY} net={fenNet} />

      <div style={{ marginTop: "30px", padding: "25px", background: "#22c55e", borderRadius: "16px", color: "white" }}>
        <h2>Toplam TYT Netin</h2>
        <h1>{toplamNet.toFixed(2)}</h1>
      </div>
    </main>
  );
}

function Ders({
  title,
  soru,
  setD,
  setY,
  net,
}: {
  title: string;
  soru: number;
  setD: (v: number) => void;
  setY: (v: number) => void;
  net: number;
}) {
  return (
    <div style={{ marginTop: "25px", padding: "20px", background: "#1e293b", borderRadius: "14px" }}>
      <h2>{title} / {soru} Soru</h2>

      <input type="number" placeholder="Doğru" min="0" max={soru} onChange={(e) => setD(Number(e.target.value))} />
      <input type="number" placeholder="Yanlış" min="0" max={soru} onChange={(e) => setY(Number(e.target.value))} style={{ marginLeft: "10px" }} />

      <h3>Net: {net.toFixed(2)}</h3>
    </div>
  );
}