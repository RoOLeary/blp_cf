import type { MetadataRoute } from "next";
import { languageAlternates, localizedUrl } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

const pages = ["/", "/hire-me", "/privacy-policy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, href),
      changeFrequency: "monthly" as const,
      priority: href === "/" ? 1 : href === "/hire-me" ? 0.8 : 0.3,
      alternates: { languages: languageAlternates(href) },
    })),
  );
}
