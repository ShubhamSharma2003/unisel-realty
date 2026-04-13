import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Luxury Residential Properties in Gurgaon - Unisel Realty";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: "#2596be",
              textTransform: "uppercase" as const,
              letterSpacing: "0.15em",
            }}
          >
            Unisel Realty
          </div>
          <div
            style={{
              fontSize: "52px",
              fontWeight: 800,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            Luxury Residential Properties
          </div>
          <div
            style={{
              width: "80px",
              height: "4px",
              background: "#2596be",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              fontSize: "24px",
              fontWeight: 500,
              color: "#94a3b8",
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            Golf Course Road &bull; Dwarka Expressway &bull; New Gurgaon
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 400,
              color: "#64748b",
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            RERA Verified &bull; Direct Developer Pricing &bull; Est. 2006
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            right: "40px",
            fontSize: "16px",
            color: "#475569",
          }}
        >
          uniselrealty.com
        </div>
      </div>
    ),
    { ...size }
  );
}
