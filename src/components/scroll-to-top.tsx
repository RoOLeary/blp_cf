"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { WindMill } from "@/components/windmill";

export function ScrollToTop() {
  const t = useTranslations("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight / 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={t("scrollToTop")}
      inert={!visible}
      onClick={() => window.scrollTo({ top: 0 })}
      className={`fixed right-4 bottom-4 z-40 flex h-14 w-14 items-center justify-center bg-black text-white transition-[opacity,translate] duration-300 md:right-8 md:bottom-8 print:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <WindMill />
    </button>
  );
}
