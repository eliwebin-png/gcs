import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const alt = siteConfig.name;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            🏫
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "-0.5px" }}>
              {siteConfig.name}
            </span>
            <span style={{ fontSize: "16px", color: "#93c5fd", fontWeight: "600" }}>
              CBSE Affiliated Senior Secondary School
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(59, 130, 246, 0.2)",
              border: "1px solid rgba(147, 197, 253, 0.3)",
              padding: "6px 16px",
              borderRadius: "999px",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: "bold", color: "#60a5fa" }}>
              ADMISSIONS OPEN 2025-26 • NURSERY TO GRADE XII
            </span>
          </div>

          <h1
            style={{
              fontSize: "52px",
              fontWeight: "900",
              lineHeight: 1.15,
              letterSpacing: "-1px",
              margin: 0,
              background: "linear-gradient(to right, #ffffff, #93c5fd)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Empowering Minds. Inspiring Future Leaders.
          </h1>

          <p style={{ fontSize: "20px", color: "#cbd5e1", margin: 0, lineHeight: 1.4 }}>
            State-of-the-art STEM laboratories, smart classrooms, experienced faculty, and holistic CBSE curriculum.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
          }}
        >
          <span style={{ fontSize: "18px", color: "#94a3b8", fontWeight: "600" }}>
            📍 Gidhaur, Jamui, Bihar
          </span>
          <span style={{ fontSize: "18px", color: "#60a5fa", fontWeight: "700" }}>
            {siteConfig.url.replace(/^https?:\/\//, "")}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
