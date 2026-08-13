"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { Button } from "@/components/Button";
import {
  Card,
  CardGrid,
  type CardData,
  type ProjectData,
} from "@/components/Card";
import { useProjectFilter } from "@/components/ProjectFilter";
import { ProjectModal } from "@/components/ProjectModal";
import styles from "./ProjectGrid.module.css";

const PROJECT_PARAM = "project";

type ProjectGridProps = {
  projects: ProjectData[];
  tags: string[];
};

function projectHref(slug: string) {
  return `/?${PROJECT_PARAM}=${encodeURIComponent(slug)}`;
}

function toCardData(project: ProjectData): CardData {
  return {
    title: project.title,
    subtitle: project.subtitle,
    year: project.year,
    description: project.description,
    tags: project.tags,
    image: project.image,
    imageAlt: project.imageAlt,
  };
}

function ProjectModalFromUrl({ projects }: { projects: ProjectData[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get(PROJECT_PARAM);
  const activeProject =
    projects.find((project) => project.slug === activeSlug) ?? null;

  function closeProject() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(PROJECT_PARAM);
    const query = params.toString();
    router.push(query ? `/?${query}` : "/", { scroll: false });
  }

  useEffect(() => {
    if (!activeSlug || activeProject) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete(PROJECT_PARAM);
    const query = params.toString();
    router.replace(query ? `/?${query}` : "/", { scroll: false });
  }, [activeSlug, activeProject, router, searchParams]);

  if (!activeProject) return null;
  return <ProjectModal project={activeProject} onClose={closeProject} />;
}

export function ProjectGrid({ projects, tags }: ProjectGridProps) {
  const { selectedTag, setSelectedTag } = useProjectFilter();

  const ordered = selectedTag
    ? [...projects].sort(
        (a, b) =>
          Number(b.tags.includes(selectedTag)) -
          Number(a.tags.includes(selectedTag)),
      )
    : projects;

  return (
    <div>
      <div className={styles.filters} role="group" aria-label="Filter projects by tag">
        {tags.map((tag) => {
          const pressed = selectedTag === tag;
          return (
            <Button
              key={tag}
              className={styles.filterButton}
              aria-pressed={pressed}
              onClick={() => setSelectedTag(pressed ? null : tag)}
            >
              {tag}
            </Button>
          );
        })}
      </div>
      <CardGrid>
        {ordered.map((project) => {
          const matches =
            selectedTag != null && project.tags.includes(selectedTag);
          return (
            <Link
              key={project.slug}
              href={projectHref(project.slug)}
              scroll={false}
              className={styles.cardLink}
              aria-haspopup="dialog"
            >
              <Card
                {...toCardData(project)}
                highlighted={matches}
                dimmed={selectedTag != null && !matches}
                activeTag={selectedTag}
              />
            </Link>
          );
        })}
      </CardGrid>
      <Suspense fallback={null}>
        <ProjectModalFromUrl projects={projects} />
      </Suspense>
    </div>
  );
}
