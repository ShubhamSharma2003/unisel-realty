import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Unisel Realty — Gurgaon Real Estate Consultants";
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
              fontSize: "64px",
              fontWeight: 800,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            Unisel Realty
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
              fontSize: "28px",
              fontWeight: 500,
              color: "#94a3b8",
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            Gurgaon&apos;s Trusted Real Estate Consultants
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 400,
              color: "#64748b",
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            Residential &bull; Commercial &bull; New Launch &bull; Pre-Leased
          </div>
          <div
            style={{
              marginTop: "32px",
              padding: "14px 40px",
              background: "#2596be",
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: 600,
              borderRadius: "50px",
            }}
          >
            Explore Properties
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
