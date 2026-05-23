import { ImageResponse } from "next/og";

export const alt = "Growframe — Creator Growth Systems";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(circle at 50% -10%, rgba(124,58,237,0.30), transparent 42%), linear-gradient(180deg, rgba(255,255,255,0.06), transparent 34%), #0A0A0A",
          color: "#F5F5F5",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            color: "rgba(245,245,245,0.72)",
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          <span>Growframe</span>
          <span style={{ color: "rgba(245,245,245,0.42)" }}>
            Creator Growth Systems
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              maxWidth: 920,
              fontSize: 96,
              lineHeight: 0.96,
              fontWeight: 700,
              letterSpacing: 0,
            }}
          >
            Premium content systems for creators serious about growth.
          </div>
          <div
            style={{
              maxWidth: 780,
              fontSize: 30,
              lineHeight: 1.35,
              color: "rgba(245,245,245,0.62)",
            }}
          >
            Editing, thumbnail systems, and scalable content operations with a
            cinematic, software-grade finish.
          </div>
        </div>

        <div
          style={{
            height: 1,
            width: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
