import type { Metadata } from "next";
import type { Locale } from "next-intl";
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { pageMetadata } from "@/i18n/metadata";

const EMAIL = "hello@busylittlepixels.com";
const KVK = "96955260";
const LAST_UPDATED = new Date("2026-11-11");

const linkClass = "underline underline-offset-4 hover:text-red-600";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy-policy">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale: locale as Locale,
    href: "/privacy-policy",
    page: "privacy",
  });
}

export default async function PrivacyPolicy({
  params,
}: PageProps<"/[locale]/privacy-policy">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("privacy");
  const format = await getFormatter();

  const tags = {
    b: (chunks: ReactNode) => <strong>{chunks}</strong>,
    email: (chunks: ReactNode) => (
      <a href={`mailto:${EMAIL}`} className={linkClass}>
        {chunks}
      </a>
    ),
    ap: (chunks: ReactNode) => (
      <a
        href="https://autoriteitpersoonsgegevens.nl"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {chunks}
      </a>
    ),
  };
  const sections: { key: string; paragraphs: string[] }[] = [
    { key: "who", paragraphs: ["p1", "p2"] },
    { key: "collect", paragraphs: ["form", "cookies", "technical"] },
    { key: "why", paragraphs: ["p1"] },
    { key: "share", paragraphs: ["p1"] },
    { key: "retention", paragraphs: ["p1"] },
    { key: "rights", paragraphs: ["p1", "p2"] },
    { key: "changes", paragraphs: ["p1"] },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <section className="container mx-auto px-4 pt-32 pb-20 md:px-8">
        <div className="mb-16 grid grid-cols-12 gap-y-8 md:gap-x-8">
          <div className="@container col-span-12 md:col-span-8">
            <h1 className="text-[clamp(2.5rem,10cqw,6rem)] leading-none font-bold tracking-tighter uppercase">
              {t("titleLine1")}
              <br />
              {t("titleLine2")}
            </h1>
          </div>
          <p className="col-span-12 text-xl md:col-span-4 md:self-end">
            {t("lead")}
          </p>
        </div>

        <ol className="space-y-12">
          {sections.map((section, i) => (
            <li
              key={section.key}
              className="grid grid-cols-12 gap-4 border-t border-black pt-8 md:gap-x-8"
            >
              <div className="col-span-12 md:col-span-4">
                <span className="mb-2 block text-sm font-bold tracking-widest text-red-600 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-2xl font-bold tracking-tight">
                  {t(`sections.${section.key}.title`)}
                </h2>
              </div>
              <div className="col-span-12 max-w-2xl space-y-4 md:col-span-8">
                {section.paragraphs.map((para) => (
                  <p key={para}>
                    {t.rich(`sections.${section.key}.${para}`, {
                      ...tags,
                      kvk: KVK,
                      address: EMAIL,
                    })}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-16 border-t-2 border-black pt-6 text-sm tracking-widest uppercase">
          {t("lastUpdated", {
            date: format.dateTime(LAST_UPDATED, { dateStyle: "long" }),
          })}
        </p>
      </section>
      <Footer />
    </main>
  );
}
