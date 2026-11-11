"use client";

import { useLocale, useTranslations, type Locale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

const languages: { code: Locale; name: string }[] = [
  { code: "en", name: "EN" },
  { code: "ga", name: "GA" },
  { code: "nl", name: "NL" },
];

export function LanguageSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  return (
    <select
      aria-label={t("language")}
      value={locale}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as Locale;
        startTransition(() => {
          router.replace(`${pathname}${window.location.hash}`, { locale: next });
        });
      }}
      className="cursor-pointer bg-transparent text-sm tracking-widest uppercase transition-colors hover:text-red-600 focus:outline-none focus-visible:text-red-600 disabled:opacity-50"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}
