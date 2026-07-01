export default function Home() {
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
      <h1>Kampüs Hocam</h1>

      <p>
        TYT, AYT ve KPSS öğrencileri için yapay zekâ destekli eğitim platformu.
      </p>

      <div style={{ marginTop: "30px" }}>
        <a
          href="/tyt-net-hesaplama"
          style={{
            display: "inline-block",
            padding: "15px 25px",
            background: "#22c55e",
            color: "white",
            textDecoration: "none",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          TYT Net Hesaplama
        </a>
      </div>
    </main>
  );
}