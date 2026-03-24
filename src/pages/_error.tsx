import type { NextPageContext } from "next";

interface ErrorProps {
  statusCode?: number;
}

function ErrorPage({ statusCode }: ErrorProps) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", maxWidth: "28rem", padding: "1rem" }}>
        <p style={{ fontSize: "3.75rem", fontWeight: 800, color: "#0891b2", marginBottom: "1rem" }}>
          {statusCode || "Error"}
        </p>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
          {statusCode === 404 ? "Pagina no encontrada" : "Algo salio mal"}
        </h1>
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

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
