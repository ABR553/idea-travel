import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tengo Un Viaje - Packs de viaje curados";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0D9488 0%, #065F46 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "white",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          Tengo Un Viaje
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Packs de viaje curados con rutas, alojamientos y experiencias locales
        </div>
      </div>
    ),
    { ...size }
  );
}
