import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { Link } from "@/i18n/navigation";

export async function Nav() {
  const t = await getTranslations("nav");
  const links = [
    { href: "/#work", label: t("work") },
    { href: "/#about", label: t("about") },
    { href: "/#contact", label: t("contact") },
    { href: "/hire-me", label: t("hireMe") },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-black bg-white print:hidden">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="font-display text-xl font-bold tracking-tighter">
          busy<span className="text-red-600">little</span>pixels
        </Link>
        <div className="flex items-center gap-6 md:gap-8">
          <div className="hidden space-x-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-widest uppercase transition-colors hover:text-red-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <LanguageSwitcher />
          <MobileNav links={links} />
        </div>
      </div>
    </nav>
  );
}
