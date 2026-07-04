"use client";

import { useState } from "react";

export default function AYTNetHesaplama() {
  const [matD, setMatD] = useState(0);
  const [matY, setMatY] = useState(0);

  const [fizD, setFizD] = useState(0);
  const [fizY, setFizY] = useState(0);

  const [kimD, setKimD] = useState(0);
  const [kimY, setKimY] = useState(0);

  const [bioD, setBioD] = useState(0);
  const [bioY, setBioY] = useState(0);

  const net = (d: number, y: number) => d - y / 4;

  const toplamNet =
    net(matD, matY) +
    net(fizD, fizY) +
    net(kimD, kimY) +
    net(bioD, bioY);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#0f172a",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <h1>AYT Net Hesaplama</h1>

      <Ders title="Matematik" setD={setMatD} setY={setMatY} />
      <Ders title="Fizik" setD={setFizD} setY={setFizY} />
      <Ders title="Kimya" setD={setKimD} setY={setKimY} />
      <Ders title="Biyoloji" setD={setBioD} setY={setBioY} />

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#22c55e",
          borderRadius: "12px",
        }}
      >
        <h2>Toplam AYT Neti</h2>
        <h1>{toplamNet.toFixed(2)}</h1>
      </div>
    </main>
  );
}

function Ders({
  title,
  setD,
  setY,
}: {
  title: string;
  setD: (v: number) => void;
  setY: (v: number) => void;
}) {
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        background: "#1e293b",
        borderRadius: "12px",
      }}
    >
      <h2>{title}</h2>

      <input
        type="number"
        placeholder="Doğru"
        onChange={(e) => setD(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Yanlış"
        onChange={(e) => setY(Number(e.target.value))}
        style={{ marginLeft: "10px" }}
      />
    </div>
  );
}