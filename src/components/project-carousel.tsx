"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import type { ProjectImage } from "@/components/work";

const pad = (n: number) => String(n).padStart(2, "0");

const placeholders = [
  <div key="a" className="absolute inset-0 bg-red-600">
    <div className="absolute right-[12%] bottom-[12%] aspect-square w-1/4 bg-black" />
  </div>,
  <div key="b" className="absolute inset-0 bg-black">
    <div className="absolute top-1/2 left-1/2 aspect-square w-2/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
    <div className="absolute top-[15%] left-[10%] h-1/3 w-3 bg-red-600" />
  </div>,
  <div key="c" className="absolute inset-0 grid grid-cols-6 gap-2 bg-neutral-100 p-[8%]">
    {[60, 90, 40, 100, 75, 30].map((h, i) => (
      <div
        key={h}
        style={{ height: `${h}%` }}
        className={`self-end ${i === 3 ? "bg-red-600" : "bg-black"}`}
      />
    ))}
  </div>,
  <div key="d" className="absolute inset-0 border-[1.5rem] border-black bg-white">
    <div className="absolute top-0 left-0 h-1/2 w-1/2 bg-red-600" />
  </div>,
];

export function ProjectCarousel({ images }: { images: ProjectImage[] }) {
  const t = useTranslations("carousel");
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const go = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = (i + images.length) % images.length;
    track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t("label")}
    >
      <div
        ref={trackRef}
        tabIndex={0}
        onScroll={(e) => {
          const t = e.currentTarget;
          setCurrent(Math.round(t.scrollLeft / t.clientWidth));
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(current + 1);
          if (e.key === "ArrowLeft") go(current - 1);
        }}
        className="flex aspect-[4/3] snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-[0_15%] [scrollbar-width:none] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-red-600 [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, i) => (
          <figure
            key={image.alt}
            role="group"
            aria-roledescription="slide"
            aria-label={t("slide", { current: i + 1, total: images.length })}
            className="shiney-wrapper relative h-full w-full shrink-0 snap-start"
          >
            <div className="shimmer relative h-full w-full overflow-hidden">
              {image.src ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 48rem) 48rem, 100vw"
                  className="object-cover"
                />
              ) : (
                placeholders[i % placeholders.length]
              )}
            </div>
            {!image.src && (
              <figcaption className="absolute bottom-4 left-4 z-10 bg-white px-2 py-1 text-xs tracking-widest text-black uppercase">
                {image.alt}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex items-center gap-4">
          <p className="w-16 shrink-0 text-sm tracking-widest tabular-nums">
            {pad(current + 1)} / {pad(images.length)}
          </p>
          <div className="flex flex-1 gap-1">
            {images.map((image, i) => (
              <button
                key={image.alt}
                type="button"
                onClick={() => go(i)}
                aria-label={t("show", { number: i + 1 })}
                aria-current={i === current}
                className="group flex h-6 flex-1 items-center"
              >
                <span
                  className={`h-1 w-full transition-colors duration-300 ${
                    i === current
                      ? "bg-red-600"
                      : "bg-black/15 group-hover:bg-black/40"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => go(current - 1)}
              aria-label={t("previous")}
              className="flex h-10 w-10 items-center justify-center border-2 border-black transition-colors hover:bg-black hover:text-white"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(current + 1)}
              aria-label={t("next")}
              className="flex h-10 w-10 items-center justify-center border-2 border-black transition-colors hover:bg-black hover:text-white"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
