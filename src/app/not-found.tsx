export default function RootNotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: "28rem", padding: "1rem" }}>
        <p style={{ fontSize: "3.75rem", fontWeight: 800, color: "#0891b2", marginBottom: "1rem" }}>
          404
        </p>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
          Pagina no encontrada
        </h1>
        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
          La pagina que buscas no existe o ha sido movida.
        </p>
        <a
          href="/"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0891b2",
            color: "white",
            borderRadius: "0.5rem",
            textDecoration: "none",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
