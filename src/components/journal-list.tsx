"use client";

import { type ReactNode, useState } from "react";

type Entry = { slug: string; tags: string[]; content: ReactNode };

export function JournalList({
  entries,
  after,
  labels,
}: {
  entries: Entry[];
  after: ReactNode;
  labels: { filter: string; all: string; latest: string };
}) {
  const [active, setActive] = useState<string | null>(null);

  const counts = new Map<string, number>();
  for (const tag of entries.flatMap((entry) => entry.tags)) {
    counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  const tags = [...counts.keys()].sort(
    (a, b) => counts.get(b)! - counts.get(a)! || a.localeCompare(b),
  );
  const visible = active
    ? entries.filter((entry) => entry.tags.includes(active))
    : entries;

  const chip = (selected: boolean) =>
    `inline-flex items-center gap-2 border px-3 py-1 text-xs tracking-widest uppercase transition-colors ${
      selected
        ? "border-red-600 bg-red-600 text-white"
        : "border-black/40 hover:border-red-600 hover:text-red-600"
    }`;

  return (
    <>
      <div className="mb-12">
        <p className="mb-4 text-sm font-bold tracking-widest uppercase">
          {labels.filter}
        </p>
        <ul className="flex flex-wrap gap-2">
          <li>
            <button
              type="button"
              aria-pressed={active === null}
              onClick={() => setActive(null)}
              className={chip(active === null)}
            >
              {labels.all}
              <span className="tabular-nums opacity-60">{entries.length}</span>
            </button>
          </li>
          {tags.map((tag) => (
            <li key={tag}>
              <button
                type="button"
                lang="en"
                aria-pressed={active === tag}
                onClick={() => setActive(active === tag ? null : tag)}
                className={chip(active === tag)}
              >
                {tag}
                <span className="tabular-nums opacity-60">
                  {counts.get(tag)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <p className="mb-8 text-sm font-bold tracking-widest text-red-600 uppercase">
        {active ?? labels.latest}
      </p>
      <ol>
        {visible.map((entry) => (
          <li key={entry.slug}>{entry.content}</li>
        ))}
        {after}
      </ol>
    </>
  );
}
