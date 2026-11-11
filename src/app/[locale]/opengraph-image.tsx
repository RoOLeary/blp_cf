import { ImageResponse } from "next/og";
import { outfitBold } from "@/assets/fonts/outfit-bold";
import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/i18n/metadata";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const RED = "#dc2626";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const outfit = outfitBold();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "64px 72px",
          background: "#000",
          color: "#fff",
          fontFamily: "Outfit",
          borderBottom: `16px solid ${RED}`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 150,
            fontWeight: 700,
            lineHeight: 0.85,
            letterSpacing: "-0.05em",
          }}
        >
          <span>busy</span>
          <span style={{ color: RED }}>little</span>
          <span style={{ display: "flex", alignItems: "flex-end" }}>
            pixels
            <span
              style={{
                width: 24,
                height: 24,
                marginLeft: 8,
                marginBottom: 18,
                background: RED,
              }}
            />
          </span>
        </div>
        <p
          style={{
            width: 420,
            fontSize: 30,
            lineHeight: 1.3,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {t("tagline")}
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Outfit", data: outfit, weight: 700, style: "normal" }],
    },
  );
}
