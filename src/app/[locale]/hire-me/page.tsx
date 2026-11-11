import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Resume } from "@/components/resume";
import { pageMetadata } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/hire-me">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale: locale as Locale,
    href: "/hire-me",
    page: "hireMe",
  });
}

export default async function HireMe({ params }: PageProps<"/[locale]/hire-me">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <Resume />
      <Footer />
    </main>
  );
}
