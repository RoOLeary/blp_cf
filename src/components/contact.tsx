import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact-form";

export async function Contact() {
  const t = await getTranslations("contact");
  const details = [
    { label: t("email"), value: "hello@busylittlepixels.com", href: "mailto:hello@busylittlepixels.com" },
    { label: t("phone"), value: "+31 (0) 618 066136", href: "tel:+31618066136" },
    { label: t("location"), value: t("locationValue") },
  ];

  return (
    <section id="contact" className="bg-red-600 px-4 py-20 text-white md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-8 text-6xl font-bold tracking-tighter uppercase">
              {t("heading")}
            </h2>
            <p className="mb-8 text-xl">
              {t("lead")}
            </p>
            <div className="space-y-4">
              {details.map((detail) => (
                <p key={detail.label} className="flex items-center">
                  <span className="min-w-24 shrink-0 pr-4 text-sm tracking-widest uppercase">
                    {detail.label}
                  </span>
                  {detail.href ? (
                    <a href={detail.href} className="hover:underline">
                      {detail.value}
                    </a>
                  ) : (
                    <span>{detail.value}</span>
                  )}
                </p>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
