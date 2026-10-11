import { ImageResponse } from "next/og";
import { profile, siteUrl } from "@/app/content/site";

export const alt = `${profile.name}, full-stack developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f5f1",
          color: "#1a1917",
          padding: 72,
          fontFamily: "sans-serif",
          borderTop: "12px solid #c6402d",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#1a1917",
              color: "#f6f5f1",
              fontSize: 30,
            }}
          >
            K
          </div>
          <div style={{ fontSize: 28, color: "#6b675c", letterSpacing: 4 }}>
            PORTFOLIO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 1.05 }}>{profile.name}</div>
          <div style={{ fontSize: 44, color: "#56534c", marginTop: 20 }}>
            Full-stack developer. React, Next.js, Laravel, PHP, Node.js.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 30, color: "#6b675c" }}>
          {siteUrl.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size
  );
}