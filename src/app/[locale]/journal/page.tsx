import type { Metadata } from "next";
import type { Locale } from "next-intl";
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Footer } from "@/components/footer";
import { JournalList } from "@/components/journal-list";
import { Nav } from "@/components/nav";
import { PageTransition } from "@/components/page-transition";
import Particles from "@/components/particles";
import { posts } from "@/content/blog";
import { Link } from "@/i18n/navigation";
import { blogMetadata } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/journal">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.blog" });
  return blogMetadata({
    locale: locale as Locale,
    href: "/journal",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Journal({
  params,
}: PageProps<"/[locale]/journal">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("blog");
  const format = await getFormatter();

  return (
    <PageTransition>
      <main className="min-h-screen bg-white">
        <Nav />

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
            <p className="mb-6 text-sm tracking-widest text-white/70 uppercase">
              {t("eyebrow")}
            </p>
            <div className="grid grid-cols-12 gap-y-8 md:gap-x-8">
              <div className="@container col-span-12 md:col-span-8">
                <h1 className="text-[clamp(4rem,24cqw,13rem)] leading-[0.82] font-bold tracking-tighter whitespace-nowrap pl-[0.08em]">
                  {t("wordmark")}
                  <span
                    aria-hidden
                    className="ml-[0.04em] inline-block size-[0.16em] bg-red-600 motion-safe:animate-blink"
                  />
                </h1>
              </div>
              <p className="col-span-12 text-xl text-white/85 md:col-span-4 md:self-end md:text-2xl">
                {t("lead")}
              </p>
            </div>
          </div>
        </header>

        <section className="container mx-auto px-4 py-20 md:px-8">
          <JournalList
            labels={{
              filter: t("filterByTag"),
              all: t("allTags"),
              latest: t("latest"),
            }}
            entries={posts.map((post, i) => ({
              slug: post.slug,
              tags: post.tags,
              content: (
                <Link
                  href={`/journal/${post.slug}`}
                  transitionTypes={["nav-forward"]}
                  className="group grid grid-cols-12 gap-y-6 border-t-2 border-black py-10 md:gap-x-8 md:py-14"
                >
                  <span className="font-display col-span-12 text-7xl leading-[0.8] font-bold text-red-600 tabular-nums md:col-span-2 md:text-8xl">
                    {String(posts.length - i).padStart(2, "0")}
                  </span>
                  <div className="col-span-12 md:col-span-8">
                    <p className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-xs tracking-widest uppercase tabular-nums">
                      <time dateTime={post.date}>
                        {format.dateTime(new Date(post.date), {
                          dateStyle: "long",
                        })}
                      </time>
                      <span aria-hidden className="text-red-600">
                        /
                      </span>
                      <span>
                        {t("minRead", { minutes: post.readingMinutes })}
                      </span>
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-black/50">
                          {tag}
                        </span>
                      ))}
                    </p>
                    <h2 className="cursor-target mb-4 w-fit text-4xl leading-[0.95] font-bold tracking-tighter transition-colors group-hover:text-red-600 md:text-6xl lg:text-7xl">
                      {post.title}
                    </h2>
                    <p className="max-w-2xl text-lg text-black/70 md:text-xl">
                      {post.subtitle}
                    </p>
                  </div>
                  <span className="col-span-12 flex items-end text-sm tracking-widest uppercase md:col-span-2 md:justify-end">
                    <span className="inline-flex items-center gap-3 border-2 border-black px-5 py-3 whitespace-nowrap transition-colors group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white">
                      {t("readArticle")}
                      <span
                        aria-hidden
                        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </span>
                </Link>
              ),
            }))}
            after={
              <li className="grid grid-cols-12 gap-y-4 border-t-2 border-b-2 border-black py-10 text-black/30 md:gap-x-8">
                <span className="font-display col-span-12 text-7xl leading-[0.8] font-bold tabular-nums md:col-span-2 md:text-8xl">
                  {String(posts.length + 1).padStart(2, "0")}
                </span>
                <div className="col-span-12 md:col-span-10">
                  <p className="text-4xl font-bold tracking-tighter md:text-6xl">
                    {t("moreSoon")}
                  </p>
                  <p className="mt-2 text-lg">{t("moreSoonLead")}</p>
                </div>
              </li>
            }
          />
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}
