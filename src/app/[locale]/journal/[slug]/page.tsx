import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "next-intl";
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { PageTransition } from "@/components/page-transition";
import Particles from "@/components/particles";
import { getPost, posts } from "@/content/blog";
import { Link } from "@/i18n/navigation";
import { blogMetadata } from "@/i18n/metadata";
import { routing } from "@/i18n/routing";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/journal/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return blogMetadata({
    locale: locale as Locale,
    href: `/journal/${post.slug}`,
    title: post.title,
    description: post.description,
    publishedTime: post.date,
  });
}

export default async function JournalPost({
  params,
}: PageProps<"/[locale]/journal/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const post = getPost(slug);
  if (!post) notFound();

  const t = await getTranslations("blog");
  const format = await getFormatter();
  const { Body } = post;

  return (
    <PageTransition>
      <main className="min-h-screen bg-white">
        <Nav />
        <div
          aria-hidden
          className="reading-progress fixed inset-x-0 top-[3.8125rem] z-40 h-1 origin-left bg-red-600 print:hidden"
        />

        <header className="relative overflow-clip border-b-8 border-red-600 bg-black text-white">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <Particles
              particleColors={["#ffffff", "#dc2626"]}
              shape="square"
              particleCount={120}
              particleBaseSize={70}
              speed={0.08}
              opacity={0.45}
              clickBurst={false}
            />
          </div>
          <div className="relative container mx-auto px-4 pt-32 pb-12 md:px-8 md:pt-40 md:pb-16">
            <Link
              href="/journal"
              transitionTypes={["nav-back"]}
              className="mb-10 inline-flex items-center gap-3 text-sm tracking-widest text-white/70 uppercase transition-colors hover:text-red-600"
            >
              <span aria-hidden>←</span>
              {t("back")}
            </Link>
            <ul className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-white/40 px-3 py-1 text-xs tracking-widest uppercase"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <h1
              lang="en"
              className="max-w-6xl text-5xl leading-[0.9] font-bold tracking-tighter md:text-7xl lg:text-8xl"
            >
              {post.title}
            </h1>
            <p
              lang="en"
              className="mt-8 max-w-3xl text-xl text-white/80 italic md:text-2xl"
            >
              {post.subtitle}
            </p>
            {post.repo && (
              <a
                href={post.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-3 border-2 border-white px-5 py-3 text-sm tracking-widest uppercase transition-colors hover:border-red-600 hover:bg-red-600"
              >
                {t("viewRepo")}
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  ↗
                </span>
              </a>
            )}
            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-white/30 pt-6 text-sm tracking-widest uppercase sm:grid-cols-3">
              <div>
                <dt className="mb-1 text-white/50">{t("by")}</dt>
                <dd>Rónán Ó Laoire</dd>
              </div>
              <div>
                <dt className="mb-1 text-white/50">{t("published")}</dt>
                <dd className="tabular-nums">
                  <time dateTime={post.date}>
                    {format.dateTime(new Date(post.date), { dateStyle: "long" })}
                  </time>
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-white/50">{t("readingTime")}</dt>
                <dd className="text-red-600">
                  {t("minRead", { minutes: post.readingMinutes })}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <article className="container mx-auto px-4 py-20 md:px-8">
          <div className="grid grid-cols-12 gap-y-12 md:gap-x-8">
            <aside className="col-span-12 md:col-span-4 lg:col-span-3">
              <nav
                aria-label={t("contents")}
                className="md:sticky md:top-28"
              >
                <p className="mb-4 text-sm font-bold tracking-widest text-red-600 uppercase">
                  {t("contents")}
                </p>
                <ol lang="en" className="space-y-3 border-l-2 border-black pl-4">
                  {post.toc.map((entry) => (
                    <li key={entry.id}>
                      <a
                        href={`#${entry.id}`}
                        className="text-base leading-snug transition-colors hover:text-red-600"
                      >
                        {entry.label}
                      </a>
                      {entry.children && (
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {entry.children.map((child) => (
                            <li key={child.id}>
                              <a
                                href={`#${child.id}`}
                                title={child.label}
                                className="font-display flex size-9 items-center justify-center bg-red-600 text-lg font-bold text-white transition-colors hover:bg-black"
                              >
                                <span aria-hidden>{child.label[0]}</span>
                                <span className="sr-only">{child.label}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ol>
                {locale !== "en" && (
                  <p className="mt-8 text-sm text-black/60">
                    {t("englishOnly")}
                  </p>
                )}
              </nav>
            </aside>

            <div lang="en" className="col-span-12 max-w-2xl md:col-span-8 lg:col-span-7">
              <Body />

              <footer className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t-2 border-black pt-8">
                <p className="text-sm tracking-widest uppercase">
                  <span className="text-black/50">{t("by")} </span>
                  Rónán Ó Laoire
                </p>
                {post.repo && (
                  <a
                    href={post.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 border-2 border-black bg-black px-5 py-3 text-sm tracking-widest text-white uppercase transition-colors hover:border-red-600 hover:bg-red-600"
                  >
                    {t("viewRepo")}
                    <span
                      aria-hidden
                      className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                    >
                      ↗
                    </span>
                  </a>
                )}
                <Link
                  href="/journal"
                  transitionTypes={["nav-back"]}
                  className="group inline-flex items-center gap-3 border-2 border-black px-5 py-3 text-sm tracking-widest uppercase transition-colors hover:border-red-600 hover:bg-red-600 hover:text-white"
                >
                  <span
                    aria-hidden
                    className="transition-transform duration-300 ease-out group-hover:-translate-x-1"
                  >
                    ←
                  </span>
                  {t("back")}
                </Link>
              </footer>
            </div>
          </div>
        </article>

        <Footer />
      </main>
    </PageTransition>
  );
}
