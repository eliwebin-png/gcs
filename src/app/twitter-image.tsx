import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const alt = siteConfig.name;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0284c7 0%, #1e40af 50%, #0f172a 100%)",
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
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            🎓
          </div>
          <span style={{ fontSize: "28px", fontWeight: "900" }}>
            {siteConfig.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
          <h1
            style={{
              fontSize: "50px",
              fontWeight: "900",
              lineHeight: 1.2,
              margin: 0,
              color: "#ffffff",
            }}
          >
            Excellence in Education. Ranked Top CBSE School.
          </h1>
          <p style={{ fontSize: "22px", color: "#e0f2fe", margin: 0 }}>
            {siteConfig.description}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            paddingTop: "20px",
          }}
        >
          <span style={{ fontSize: "18px", color: "#bae6fd" }}>Admissions Open 2025-26</span>
          <span style={{ fontSize: "18px", color: "#ffffff", fontWeight: "bold" }}>
            {siteConfig.url}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
