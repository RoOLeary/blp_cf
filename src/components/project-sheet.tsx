"use client";

import { useTranslations } from "next-intl";
import { useRef, type Ref } from "react";
import { ProjectCarousel } from "@/components/project-carousel";
import type { Project } from "@/components/work";

const ease = "ease-[cubic-bezier(0.76,0,0.24,1)]";
const pad = (n: number) => String(n).padStart(2, "0");

type Props = {
  ref: Ref<HTMLDialogElement>;
  projects: Project[];
  index: number;
  onIndexChange: (index: number) => void;
};

export function ProjectSheet({ ref, projects, index, onIndexChange }: Props) {
  const t = useTranslations("projectSheet");
  const scrollRef = useRef<HTMLDivElement>(null);
  const project = projects[index];
  const nextIndex = (index + 1) % projects.length;

  const showNext = () => {
    onIndexChange(nextIndex);
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby="project-sheet-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
      className={`fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-dvh w-full max-w-3xl translate-x-full bg-white p-0 text-black transition-[translate,display,overlay] transition-discrete duration-700 ${ease} backdrop:bg-black/0 backdrop:backdrop-blur-none backdrop:transition-[background-color,backdrop-filter,display,overlay] backdrop:transition-discrete backdrop:duration-700 open:translate-x-0 open:backdrop:bg-black/60 open:backdrop:backdrop-blur-sm starting:open:translate-x-full starting:open:backdrop:bg-black/0 starting:open:backdrop:backdrop-blur-none`}
    >
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto overscroll-contain border-l-8 border-red-600"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-black bg-white/90 px-6 py-4 backdrop-blur md:px-10">
          <p className="text-sm tracking-widest uppercase tabular-nums">
            {t("counter", {
              current: pad(index + 1),
              total: pad(projects.length),
            })}
          </p>
          <form method="dialog">
            <button
              type="submit"
              aria-label={t("close")}
              className="group relative -mr-2 flex h-10 w-10 items-center justify-center"
            >
              <span className="absolute h-0.5 w-7 rotate-45 bg-black transition-colors group-hover:bg-red-600" />
              <span className="absolute h-0.5 w-7 -rotate-45 bg-black transition-colors group-hover:bg-red-600" />
            </button>
          </form>
        </header>

        <article key={project.id} className="px-6 pt-10 pb-16 md:px-10">
          <span className="mb-4 block text-sm font-bold tracking-widest text-red-600 tabular-nums">
            {pad(index + 1)}
          </span>
          <h2
            id="project-sheet-title"
            className="mb-4 text-5xl leading-none font-bold tracking-tighter md:text-7xl"
          >
            {project.title}
          </h2>
          <p className="mb-10 max-w-xl text-xl">{project.description}</p>

          <ProjectCarousel images={project.images} />

          <div className="mt-12 grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-8">
            <dl className="space-y-4 border-t-2 border-black pt-6 md:col-span-4">
              <div>
                <dt className="mb-1 text-sm tracking-widest uppercase">{t("year")}</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt className="mb-1 text-sm tracking-widest uppercase">{t("role")}</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt className="mb-1 text-sm tracking-widest uppercase">{t("stack")}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {project.stack.map((item) => (
                      <li
                        key={item}
                        className="border border-black px-2 py-0.5 text-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
            <div className="space-y-6 md:col-span-8 md:border-t-2 md:border-black md:pt-6">
              {project.summary.map((paragraph) => (
                <p key={paragraph} className="first:text-xl">
                  {paragraph}
                </p>
              ))}
              {project.link && (
                <a
                  href={project.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 px-8 py-3 text-sm tracking-widest text-white uppercase transition-colors hover:bg-black"
                >
                  {project.link.label}
                </a>
              )}
            </div>
          </div>
        </article>

        {projects.length > 1 && (
          <button
            type="button"
            onClick={showNext}
            className="group flex w-full items-end justify-between gap-4 bg-black px-6 py-10 text-left text-white transition-colors hover:bg-red-600 md:px-10"
          >
            <span>
              <span className="mb-2 block text-sm tracking-widest uppercase">
                {t("next")}
              </span>
              <span className="block text-4xl font-bold tracking-tighter md:text-5xl">
                {projects[nextIndex].title}
              </span>
            </span>
            <span
              aria-hidden
              className="text-4xl transition-transform duration-500 group-hover:translate-x-2"
            >
              →
            </span>
          </button>
        )}
      </div>
    </dialog>
  );
}
