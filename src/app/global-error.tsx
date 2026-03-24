"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", maxWidth: "28rem", padding: "1rem" }}>
            <p style={{ fontSize: "3.75rem", fontWeight: 800, color: "#0891b2", marginBottom: "1rem" }}>
              500
            </p>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
              Algo salio mal
            </h1>
            <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
              Ha ocurrido un error inesperado. Por favor, intentalo de nuevo.
            </p>
            <button
              onClick={() => reset()}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#0891b2",
                color: "white",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
