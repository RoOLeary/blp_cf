import type { ComponentType } from "react";

export type TocEntry = {
  id: string;
  label: string;
  children?: { id: string; label: string }[];
};

export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  readingMinutes: number;
  tags: string[];
  toc: TocEntry[];
  repo?: string;
  Body: ComponentType;
};
