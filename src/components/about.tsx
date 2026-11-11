import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getTechSkills } from "@/components/resume";

export async function About() {
  const t = await getTranslations("about");
  const techSkills = await getTechSkills();

  return (
    <section id="about" className="px-4 py-20 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-y-8 md:gap-x-8">
          <div className="col-span-12 md:col-span-5">
            <h2 className="mb-8 text-6xl font-bold tracking-tighter uppercase">
              {t("heading")}
            </h2>
            <div className="shiney-wrapper mb-8 md:mb-0">
              <div className="shimmer relative aspect-[4/5] w-full overflow-hidden rounded-[0_15%] bg-neutral-100">
                <Image
                  src="/me.jpg"
                  alt={t("photoAlt")}
                  fill
                  sizes="(min-width: 48rem) 40vw, 100vw"
                  className="object-cover object-[60%_center]"
                />
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 md:pt-24">
            <p className="mb-6 text-xl">
              {t.rich("p1", {
                brand: () => (
                  <span className="font-bold">
                    Busy<span className="text-red-600">Little</span>Pixels
                  </span>
                ),
                link: (chunks) => (
                  <a
                    href="https://www.linkedin.com/in/ronanoleary/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:underline"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
            <p className="mb-6">
              {t("p2")}
            </p>
            <p className="mb-6">
              {t("p3")}
            </p>
            <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
              {techSkills.map((list) => (
                <div key={list.heading}>
                  <h3 className="mb-2 text-sm tracking-widest uppercase">
                    {list.heading}
                  </h3>
                  <ul className="tick-list space-y-2">
                    {list.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
