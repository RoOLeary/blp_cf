"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { ProjectSheet } from "@/components/project-sheet";
import type { Project } from "@/components/work";

const featured = {
  tile: "[ul:not(:has(button:is(:hover,:focus-visible)))_&]:bg-red-600",
  number: "[ul:not(:has(button:is(:hover,:focus-visible)))_&]:text-white",
  label: "[ul:not(:has(button:is(:hover,:focus-visible)))_&]:opacity-100",
  title: "[ul:not(:has(button:is(:hover,:focus-visible)))_&]:text-red-600",
};

export function WorkGrid({ projects }: { projects: Project[] }) {
  const t = useTranslations("work");
  const sheetRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const sheet = sheetRef.current;
    const onClose = () => setIsOpen(false);
    sheet?.addEventListener("close", onClose);
    return () => sheet?.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [isOpen]);

  const open = (i: number) => {
    flushSync(() => setActive(i));
    setIsOpen(true);
    sheetRef.current?.showModal();
  };

  return (
    <>
      <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 py-2 [scrollbar-width:none] md:-mx-8 md:scroll-px-8 md:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-y-8 lg:overflow-visible lg:px-0 lg:py-0 [&::-webkit-scrollbar]:hidden">
        {projects.map((project, i) => (
          <li
            key={project.id}
            className="w-[80%] shrink-0 snap-start sm:w-[45%] md:w-[42%] lg:w-auto"
          >
            <button
              type="button"
              onClick={() => open(i)}
              aria-haspopup="dialog"
              className="group block w-full cursor-pointer text-left focus-visible:outline-none"
            >
              <div className={`relative mb-4 flex aspect-square items-center justify-center rounded-[0_15%] bg-neutral-100 transition-colors duration-300 group-hover:bg-red-600 group-focus-visible:bg-red-600 group-focus-visible:ring-4 group-focus-visible:ring-red-600 group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-black ${i === 0 ? featured.tile : ""}`}>
                <span className={`text-8xl font-bold tracking-tighter text-black transition-colors duration-300 group-hover:text-white group-focus-visible:text-white ${i === 0 ? featured.number : ""}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`absolute bottom-[12%] left-[12%] text-sm tracking-widest text-white uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 ${i === 0 ? featured.label : ""}`}>
                  {t("moreInfo")}
                </span>
              </div>
              <h3 className={`mb-2 text-xl font-bold transition-colors group-hover:text-red-600 ${i === 0 ? featured.title : ""}`}>
                {project.title}
              </h3>
              <p className="text-neutral-400">{project.description}</p>
            </button>
          </li>
        ))}
      </ul>
      <ProjectSheet
        ref={sheetRef}
        projects={projects}
        index={active}
        onIndexChange={setActive}
      />
    </>
  );
}
