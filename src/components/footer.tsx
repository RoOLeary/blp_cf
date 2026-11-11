import { getTranslations } from "next-intl/server";
import { socials } from "@/components/socials";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="bg-black px-4 py-8 text-white md:pr-28 md:pl-8 print:hidden">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
        <div className="space-y-1 text-center text-sm md:text-left">
          <p>
            {t.rich("copyright", {
              year: 2026,
              kvk: "96955260",
              heart: (chunks) => (
                <span className="text-red-600" aria-label={t("love")}>
                  {chunks}
                </span>
              ),
            })}
          </p>
          <address className="text-white/60 not-italic">
            De Nieuwe Erven 3, Unit 14849, 5431 NV Cuijk, The Netherlands
          </address>
        </div>
        <div className="flex space-x-8">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-widest uppercase transition-colors hover:text-red-600"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
