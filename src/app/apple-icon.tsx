import { ImageResponse } from "next/og";
import { outfitBold } from "@/assets/fonts/outfit-bold";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const outfit = outfitBold();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#000",
          color: "#fff",
          fontFamily: "Outfit",
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
        }}
      >
        <span>busy</span>
        <span style={{ color: "#dc2626" }}>little</span>
        <span>pixels</span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Outfit", data: outfit, weight: 700, style: "normal" }],
    },
  );
}
