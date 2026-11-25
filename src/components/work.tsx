import { getTranslations } from "next-intl/server";
import { WorkGrid } from "@/components/work-grid";

export type ProjectImage = { src?: string; alt: string; fit?: "contain" };

export type Project = {
  id: string;
  title: string;
  description: string;
  year?: string;
  role: string;
  stack: string[];
  technologies?: string[];
  summary: string[];
  images: ProjectImage[];
  link?: { href: string; label: string };
};

const projectData: {
  id: string;
  year?: string;
  stack: string[];
  technologies?: string[];
  images: { key: string; src?: string; fit?: "contain" }[];
  href?: string;
}[] = [
  {
    id: "cogar",
    year: "2025/26",
    stack: ["React Native", "Expo", "TypeScript", "Supabase"],
    href: "https://cogar.ie",
    images: [
      { key: "logo", src: "/cogar-logo.png" },
      { key: "feed", src: "/CogarIMG_6935.PNG", fit: "contain" },
      { key: "profile", src: "/CogarIMG_6937.PNG", fit: "contain" },
      { key: "compose", src: "/CogarIMG-8.PNG", fit: "contain" },
      { key: "onboarding", src: "/CogarIMG-1-1-1.PNG", fit: "contain" },
    ],
  },
  // Draft copy: edit before launch.
  {
    id: "engineering",
    stack: [
      "React Native",
      "Expo / EAS",
      "TypeScript",
      "Next.js",
      "Supabase",
      "agentic",
    ],
    images: [
      {
        key: "scopeOverview",
        src: "/scope-studio/overview.png",
        fit: "contain",
      },
      {
        key: "scopeSituation",
        src: "/scope-studio/situation.png",
        fit: "contain",
      },
      {
        key: "scopeOrchestration",
        src: "/scope-studio/orchestration.png",
        fit: "contain",
      },
    ],
  },
  // Draft copy: edit before launch.
  {
    id: "consultancy",
    stack: ["architecture", "performance", "ci", "security", "roadmap"],
    technologies: [
      "React Native",
      "Expo / EAS",
      "React / Next.js",
      "TypeScript",
      "Node.js",
      "PHP / Laravel",
      "Python",
      "Supabase / Postgres",
      "Cloudflare",
      "Docker",
      "App Store",
      "Google Play",
    ],
    images: [
      { key: "whiteboard", src: "/whiteboard.jpg" },
      { key: "phases", src: "/Phases-of-Product-engineering.webp" },
      { key: "terminal", src: "/terminal.jpeg" },
    ],
  },
];

export async function Work() {
  const t = await getTranslations("work");
  const projects: Project[] = projectData.map((p) => {
    const key = (k: string) => `projects.${p.id}.${k}`;
    return {
      id: p.id,
      title: t(key("title")),
      description: t(key("description")),
      year: p.year ?? (t.has(key("year")) ? t(key("year")) : undefined),
      role: t(key("role")),
      stack: p.stack.map((item) =>
        t.has(key(`stack.${item}`)) ? t(key(`stack.${item}`)) : item,
      ),
      technologies: p.technologies,
      summary: Array.from({ length: 10 }, (_, i) => key(`summary.p${i + 1}`))
        .filter((k) => t.has(k))
        .map((k) => t(k)),
      images: p.images.map((image) => ({
        src: image.src,
        fit: image.fit,
        alt: t(key(`images.${image.key}`)),
      })),
      link: p.href ? { href: p.href, label: t(key("linkLabel")) } : undefined,
    };
  });

  return (
    <section id="work" className="bg-black px-4 py-20 text-white md:px-8">
      <div className="container mx-auto">
        <h2 className="mb-12 text-6xl font-bold tracking-tighter uppercase">
          {t("heading")}
        </h2>
        <WorkGrid projects={projects} />
      </div>
    </section>
  );
}
