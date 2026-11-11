"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { socials } from "@/components/socials";
import { Link, usePathname } from "@/i18n/navigation";

type NavLink = { href: string; label: string };

const ease = "ease-[cubic-bezier(0.76,0,0.24,1)]";
const panelWidth = "w-[min(24rem,calc(100vw-4.5rem))]";

export function MobileNav({ links }: { links: NavLink[] }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    root.style.overflow = "hidden";
    firstLinkRef.current?.focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 48rem)");
    const onResize = () => desktop.matches && setOpen(false);

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-drawer"
        aria-label={open ? t("closeMenu") : t("openMenu")}
        onClick={() => setOpen((o) => !o)}
        className="relative z-30 -mr-2 flex h-10 w-10 items-center justify-center"
      >
        <span
          className={`absolute h-0.5 w-7 bg-black transition-transform duration-500 ${ease} ${
            open ? "rotate-45" : "-translate-y-1.5"
          }`}
        />
        <span
          className={`absolute h-0.5 transition-all duration-500 ${ease} ${
            open
              ? "w-7 -rotate-45 bg-black"
              : "w-4 translate-x-1.5 translate-y-1.5 bg-red-600"
          }`}
        />
      </button>

      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-0 bg-white/70 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        aria-hidden
        className={`fixed top-0 left-0 z-10 h-dvh ${panelWidth} bg-red-600 transition-transform duration-700 ${ease} ${
          open ? "translate-x-3 delay-0" : "-translate-x-full delay-150"
        }`}
      />

      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={t("siteNavigation")}
        inert={!open}
        className={`fixed top-0 left-0 z-20 flex h-dvh ${panelWidth} flex-col bg-black text-white transition-transform duration-700 ${ease} ${
          open ? "translate-x-0 delay-100" : "-translate-x-full delay-0"
        }`}
      >
        <div className="flex items-center border-b border-white/20 px-6 py-4">
          <span className="font-display text-xl font-bold tracking-tighter">
            busy<span className="text-red-600">little</span>pixels
          </span>
        </div>

        <ol className="flex flex-1 flex-col justify-center gap-2 px-6">
          {links.map((link, i) => {
            const active = pathname === link.href;
            return (
              <li
                key={link.href}
                style={{ transitionDelay: open ? `${300 + i * 70}ms` : "0ms" }}
                className={`transition-all duration-500 ${ease} ${
                  open ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
              >
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className="group flex items-baseline gap-4 py-1 focus:outline-none"
                >
                  <span className="w-6 text-sm font-bold text-red-600 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-5xl font-bold tracking-tighter uppercase transition-[color,transform] duration-300 group-hover:translate-x-2 group-hover:text-red-600 group-focus-visible:translate-x-2 group-focus-visible:text-red-600 ${
                      active ? "text-red-600" : ""
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        <div
          style={{ transitionDelay: open ? "650ms" : "0ms" }}
          className={`relative border-t border-white/20 px-6 pt-6 pb-10 transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="mb-4 text-xs tracking-widest text-neutral-400 uppercase">
            {t("elsewhere")}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 pr-16">
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
          <div className="absolute right-6 bottom-10 h-10 w-10 bg-red-600">
            <div className="absolute -right-2 -bottom-2 h-4 w-4 bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
