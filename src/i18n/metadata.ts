import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export const SITE_URL = "https://busylittlepixels.com";
export const SITE_NAME = "Busy Little Pixels";

const ogLocales: Record<Locale, string> = {
  en: "en_IE",
  ga: "ga_IE",
  nl: "nl_NL",
};

type Href = Parameters<typeof getPathname>[0]["href"];

export function localizedUrl(locale: Locale, href: Href) {
  return new URL(getPathname({ locale, href }), SITE_URL).toString();
}

export function languageAlternates(href: Href) {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, localizedUrl(locale, href)]),
    ),
    "x-default": localizedUrl(routing.defaultLocale, href),
  };
}

export async function pageMetadata({
  locale,
  href,
  page,
}: {
  locale: Locale;
  href: Href;
  page: "home" | "hireMe" | "privacy";
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `metadata.${page}` });
  const title = t("title");
  const description = t("description");
  const url = localizedUrl(locale, href);
  const image = {
    url: `/${locale}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: SITE_NAME,
  };

  return {
    title: page === "home" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(href),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
      locale: ogLocales[locale],
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => ogLocales[l]),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
