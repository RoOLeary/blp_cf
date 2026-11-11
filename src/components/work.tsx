import { getTranslations } from "next-intl/server";
import { WorkGrid } from "@/components/work-grid";

export type ProjectImage = { src?: string; alt: string };

export type Project = {
  id: string;
  title: string;
  description: string;
  year: string;
  role: string;
  stack: string[];
  summary: string[];
  images: ProjectImage[];
  link?: { href: string; label: string };
};

const projectData: {
  id: string;
  year?: string;
  stack: string[];
  images: { key: string; src?: string }[];
}[] = [
  {
    id: "cogar",
    year: "2025/26",
    stack: ["React Native", "Expo", "TypeScript", "Supabase"],
    images: [
      { key: "logo", src: "/cogar-logo.png" },
      { key: "feed" },
      { key: "profile" },
      { key: "compose" },
      { key: "onboarding" },
    ],
  },
  // Draft copy: edit before launch.
  {
    id: "consultancy",
    year: "2025/26",
    stack: ["architecture", "performance", "ci", "security", "roadmap"],
    images: [{ key: "audit" }, { key: "decision" }, { key: "action" }],
  },
  // Draft copy: edit before launch.
  {
    id: "embedded",
    stack: ["React Native", "EAS", "Next.js", "TypeScript", "PHP", "Python"],
    images: [
      { key: "pipeline" },
      { key: "architecture" },
      { key: "workflow" },
      { key: "product" },
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
      year: p.year ?? t(key("year")),
      role: t(key("role")),
      stack: p.stack.map((item) =>
        t.has(key(`stack.${item}`)) ? t(key(`stack.${item}`)) : item,
      ),
      summary: [t(key("summary.p1")), t(key("summary.p2"))],
      images: p.images.map((image) => ({
        src: image.src,
        alt: t(key(`images.${image.key}`)),
      })),
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
