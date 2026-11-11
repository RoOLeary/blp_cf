import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Work } from "@/components/work";
import { socials } from "@/components/socials";
import {
  localizedUrl,
  pageMetadata,
  SITE_NAME,
  SITE_URL,
} from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale: locale as Locale, href: "/", page: "home" });
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: localizedUrl(locale as Locale, "/"),
    image: `${SITE_URL}/me.jpg`,
    email: "hello@busylittlepixels.com",
    telephone: "+31618066136",
    identifier: { "@type": "PropertyValue", propertyID: "KVK", value: "96955260" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amsterdam",
      addressCountry: "NL",
    },
    founder: {
      "@type": "Person",
      name: "Rónán Ó Laoire",
      alternateName: "Ronan O'Leary",
      jobTitle: "Software Developer & Technical Lead",
      knowsLanguage: ["ga", "en"],
      sameAs: socials.map((social) => social.href),
    },
    sameAs: socials.map((social) => social.href),
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Nav />
      <Hero />
      <Work />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
