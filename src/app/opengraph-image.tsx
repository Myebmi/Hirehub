import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "HireHub - سیستم مدیریت استخدام"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              background: "white",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "60px",
              fontWeight: "bold",
              color: "#3b82f6",
            }}
          >
            H
          </div>
          <div
            style={{
              fontSize: "80px",
              fontWeight: "bold",
            }}
          >
            HireHub
          </div>
        </div>
        <div
          style={{
            fontSize: "32px",
            opacity: 0.9,
          }}
        >
          سیستم مدیریت استخدام
        </div>
        <div
          style={{
            fontSize: "24px",
            opacity: 0.7,
            marginTop: "20px",
          }}
        >
          استخدام هوشمند با HireHub
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}