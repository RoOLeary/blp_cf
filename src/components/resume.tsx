import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const experience = [
  { id: "cogar", from: "2025", company: "Cogar Technologies" },
  { id: "blp", from: "2024", company: "Busy Little Pixels" },
  { id: "picnic", from: "2022", to: "2024", company: "Picnic" },
  { id: "tnw", from: "2017", to: "2022", company: "The Next Web" },
  { id: "websummit", from: "2014", to: "2016", company: "Web Summit" },
];

export async function getTechSkills() {
  const t = await getTranslations("skills");
  return [
    {
      heading: t("mobile"),
      items: [
        "React Native",
        "EAS / EXPO",
        "AppStore Connect",
        "Google Play Console",
        "Zustand / RTK Query",
        "Expo Router",
        "Reanimated",
      ],
    },
    {
      heading: t("web"),
      items: [
        "TypeScript",
        "React / Next.js",
        "Node.js",
        "PHP",
        "Python",
        "Tailwind CSS",
      ],
    },
    {
      heading: t("platform"),
      items: [
        "Laravel",
        "Supabase",
        "Cloudflare",
        "Docker",
        "CI/CD",
        t("items.agentic"),
      ],
    },
  ];
}

const services = ["consultancy", "development", "growth"];

const sectionHeading =
  "mb-12 uppercase text-5xl xl:text-6xl font-bold tracking-tighter print:mb-6 print:text-3xl";

export async function Resume() {
  const t = await getTranslations("hireMe");
  const tSkills = await getTranslations("skills");
  const tCommon = await getTranslations("common");

  const facts = [
    { label: t("facts.basedIn"), value: t("facts.basedInValue") },
    { label: t("facts.availability"), value: t("facts.availabilityValue") },
    { label: t("facts.engagement"), value: t("facts.engagementValue") },
    { label: t("facts.timezone"), value: "CET (UTC+1)" },
  ];

  const skills = [
    ...(await getTechSkills()),
    {
      heading: tSkills("practice"),
      items: ["consultancy", "strategy", "ux", "leadership", "growth"].map(
        (key) => tSkills(`items.${key}`),
      ),
    },
  ];

  return (
    <>
      <section className="container mx-auto px-4 pt-32 pb-20 md:px-8 print:pt-0 print:pb-8">
        <div className="grid grid-cols-12 gap-y-8 md:gap-x-8">
          <div className="@container col-span-12 md:col-span-8">
            <h1 className="mb-6 text-[clamp(4rem,19cqw,8rem)] leading-none font-bold tracking-tighter uppercase print:text-6xl">
              {t("titleLine1")}
              <br />
              {t("titleLine2")}
            </h1>
            <p className="mb-8 max-w-xl text-xl">
              {t("lead")}
            </p>
            <div className="flex flex-wrap gap-4 print:hidden">
              <Link
                href="/#contact"
                className="bg-red-600 px-8 py-3 text-sm tracking-widest text-white uppercase transition-colors hover:bg-black"
              >
                {tCommon("getInTouch")}
              </Link>
              <a
                href="/ROLeary2026_CV.pdf"
                download
                className="border-2 border-black px-8 py-3 text-sm tracking-widest uppercase transition-colors hover:bg-black hover:text-white"
              >
                {tCommon("downloadPdf")}
              </a>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 md:self-end">
            <div className="shiney-wrapper mb-6 print:hidden">
              <div className="shimmer relative aspect-[4/3] w-full overflow-hidden rounded-[0_15%] bg-neutral-100 sm:aspect-[16/9] md:aspect-[4/3]">
                <Image
                  src="/me.jpg"
                  alt={t("photoAlt")}
                  fill
                  preload
                  sizes="(min-width: 48rem) 33vw, 100vw"
                  className="object-cover object-[60%_30%]"
                />
              </div>
            </div>
            <dl className="space-y-4 border-t-2 border-black pt-6">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-wrap justify-between gap-x-4"
                >
                  <dt className="text-sm tracking-widest uppercase">
                    {fact.label}
                  </dt>
                  <dd className="ml-auto text-right">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section
        id="intro"
        className="container mx-auto px-4 pb-20 md:px-8 print:pb-8 break-inside-avoid"
      >
        <div className="grid grid-cols-12 gap-y-8 border-t-2 border-black pt-12 md:gap-x-8 print:pt-6">
          <div className="col-span-12 space-y-6 md:col-span-8">
            <p className="text-2xl leading-snug print:text-lg">
              {t("intro.p1")}
            </p>
            <p className="text-lg">{t("intro.p2")}</p>
          </div>
          <div className="col-span-12 space-y-4 md:col-span-4 md:self-end">
            <p>{t("intro.origin")}</p>
            <p>
              <span className="mr-2 text-sm tracking-widest uppercase">
                {t("intro.languagesLabel")}
              </span>
              {t("intro.languagesValue")}
            </p>
          </div>
        </div>
      </section>

      <section
        id="experience"
        className="bg-black px-4 py-20 text-white md:px-8 print:bg-white print:py-8 print:text-black"
      >
        <div className="container mx-auto">
          <h2 className={sectionHeading}>{t("experience.heading")}</h2>
          <ol className="space-y-12 print:space-y-6">
            {experience.map((job) => (
              <li
                key={job.id}
                className="grid grid-cols-12 gap-4 border-t border-white/30 pt-8 break-inside-avoid print:border-black/30 print:pt-4"
              >
                <p className="col-span-12 text-sm tracking-widest text-red-600 uppercase md:col-span-3">
                  {job.from} — {job.to ?? t("experience.present")}
                </p>
                <div className="col-span-12 md:col-span-9">
                  <h3 className="text-2xl font-bold">
                    {t(`experience.jobs.${job.id}.role`)}
                  </h3>
                  <p className="mb-4 text-neutral-400 print:text-neutral-600">
                    {job.company}
                  </p>
                  <p className="mb-4 max-w-2xl">
                    {t(`experience.jobs.${job.id}.description`)}
                  </p>
                  <ul className="space-y-2">
                    {["h1", "h2", "h3"].map((key) => (
                      <li key={key} className="flex gap-3">
                        <span className="mt-2.5 h-2 w-2 shrink-0 bg-red-600" />
                        {t(`experience.jobs.${job.id}.highlights.${key}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="skills"
        className="px-4 py-20 md:px-8 print:py-8 break-inside-avoid"
      >
        <div className="container mx-auto grid grid-cols-12 gap-y-8 md:gap-x-8">
          <div className="col-span-12 lg:col-span-5">
            <h2 className={sectionHeading}>{t("skillsHeading")}</h2>
          </div>
          <div className="col-span-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-7 xl:grid-cols-4 lg:pt-4">
            {skills.map((group) => (
              <div key={group.heading}>
                <h3 className="mb-4 border-b-2 border-black pb-2 text-sm tracking-widest uppercase">
                  {group.heading}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        className="bg-neutral-100 px-4 py-20 md:px-8 print:bg-white print:py-8 break-inside-avoid"
      >
        <div className="container mx-auto">
          <h2 className={sectionHeading}>{t("services.heading")}</h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {services.map((service, i) => (
              <div key={service} className="bg-white p-8 print:p-0">
                <span className="mb-6 block text-6xl font-bold text-red-600 print:mb-2 print:text-2xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2 text-xl font-bold">
                  {t(`services.${service}.title`)}
                </h3>
                <p className="text-neutral-600">
                  {t(`services.${service}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-red-600 px-4 py-20 text-white md:px-8 print:hidden">
        <div className="container mx-auto flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2 className="text-[clamp(2.25rem,11vw,3rem)] font-bold tracking-tighter uppercase sm:text-6xl">
            {t("cta.line1")}
            <br />
            {t("cta.line2")}
          </h2>
          <Link
            href="/#contact"
            className="bg-black px-8 py-3 text-sm tracking-widest text-white uppercase transition-colors hover:bg-white hover:text-black"
          >
            {tCommon("getInTouch")}
          </Link>
        </div>
      </section>
    </>
  );
}
