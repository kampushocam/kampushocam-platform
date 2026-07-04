
export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#0f172a",
        fontFamily: "Arial",
        padding: "40px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "12px" }}>
          Kampüs Hocam
        </h1>

        <p style={{ fontSize: "22px", color: "#475569", marginBottom: "40px" }}>
          YKS puanını, tahmini sıralamanı ve yerleşebileceğin bölümleri gör.
        </p>

        <a
          href="/yks-puan-hesaplama"
          style={{
            display: "block",
            padding: "32px",
            background: "white",
            color: "#0f172a",
            textDecoration: "none",
            borderRadius: "20px",
            fontSize: "26px",
            fontWeight: "bold",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
          }}
        >
          🎯 YKS Puan ve Sıralama Hesaplama
        </a>

        <a
          href="https://wa.me/905302938851"
          target="_blank"
          style={{
            display: "inline-block",
            marginTop: "24px",
            padding: "14px 24px",
            background: "#16a34a",
            color: "white",
            textDecoration: "none",
            borderRadius: "999px",
            fontWeight: "bold",
          }}
        >
          WhatsApp ile Bilgi Al
        </a>
      </div>
    </main>
  );
}