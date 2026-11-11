import { getTranslations } from "next-intl/server";
import { PixelHeart } from "@/components/pixel-heart";
import { Link } from "@/i18n/navigation";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative overflow-hidden border-b-8 border-red-600 bg-black text-white">
      <div className="container mx-auto px-4 pt-32 pb-12 md:px-8 md:pt-40 md:pb-16">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-8">
          <div className="@container col-span-12 md:col-span-7">
            <h1 className="text-[clamp(4rem,36cqw,15rem)] leading-[0.82] font-bold tracking-tighter">
              <span className="block">busy</span>
              <span className="block">
                <span className="text-red-600">little</span>
              </span>
              <span className="block whitespace-nowrap">
                pixels
                <span
                  aria-hidden
                  className="ml-[0.04em] inline-block size-[0.16em] bg-red-600 motion-safe:animate-blink"
                />
              </span>
            </h1>
          </div>

          <div className="col-span-12 flex flex-col justify-between gap-8 md:col-span-5">
            <PixelHeart />

            <div>
              <p className="mb-8 text-xl text-white/85 md:text-2xl">
                {t("tagline")}
              </p>
              <div className="flex flex-wrap gap-4 text-sm tracking-widest uppercase">
                <Link
                  href="/hire-me"
                  className="border-2 border-red-600 bg-red-600 px-6 py-3 text-white transition-colors hover:border-white hover:bg-white hover:text-black"
                >
                  {t("hireMe")}
                </Link>
                <Link
                  href="/#work"
                  className="border-2 border-white px-6 py-3 transition-colors hover:border-red-600 hover:text-red-600"
                >
                  {t("whatIDo")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
