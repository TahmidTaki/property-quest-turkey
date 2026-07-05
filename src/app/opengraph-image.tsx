import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Property Quest Turkey — Citizenship by Investment in Istanbul";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #013684 0%, #1A1A2E 100%)",
          color: "white",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            color: "#D4A84B",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          Istanbul · Citizenship by Investment
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>
          Property Quest Turkey
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            marginTop: 28,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Own property in Istanbul. Secure Turkish citizenship.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            width: 220,
            height: 8,
            background: "#E20A17",
            borderRadius: 4,
          }}
        />
      </div>
    ),
    size,
  );
}
