"use client";

import { useEffect, useState } from "react";

const HEART = [
  "...............",
  "....XX...XX....",
  "...XXXX.XXXX...",
  "..XXXXXXXXXXX..",
  "..XXXXXXXXXXX..",
  "..XXXXXXXXXXX..",
  "...XXXXXXXXX...",
  "....XXXXXXX....",
  ".....XXXXX.....",
  "......XXX......",
  ".......X.......",
  "...............",
];

const COLS = HEART[0].length;
const cells = HEART.join("").split("").map((c) => c === "X");

export function PixelHeart() {
  const [lit, setLit] = useState<Record<number, number>>({});

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setInterval(() => {
      const now = Date.now();
      setLit((prev) => {
        const next: Record<number, number> = {};
        for (const [i, until] of Object.entries(prev)) {
          if (until > now) next[Number(i)] = until;
        }
        if (!reduceMotion) next[Math.floor(Math.random() * cells.length)] = now + 600;
        return next;
      });
    }, 120);
    return () => clearInterval(id);
  }, []);

  const light = (i: number) => setLit((prev) => ({ ...prev, [i]: Date.now() + 900 }));

  return (
    <div
      aria-hidden
      className="grid gap-[3px] border-2 border-black bg-black p-[3px]"
      style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
    >
      {cells.map((isHeart, i) => {
        const on = i in lit;
        return (
          <div
            key={i}
            onPointerEnter={() => light(i)}
            className={`aspect-square transition-colors ${on ? "duration-0" : "duration-700"} ${
              isHeart
                ? on
                  ? "bg-white"
                  : "bg-red-600"
                : on
                  ? "bg-red-600"
                  : "bg-neutral-900"
            }`}
          />
        );
      })}
    </div>
  );
}
