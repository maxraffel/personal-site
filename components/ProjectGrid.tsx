"use client";

import { Button } from "@/components/Button";
import { Card, CardGrid, type CardData } from "@/components/Card";
import { useProjectFilter } from "@/components/ProjectFilter";
import styles from "./ProjectGrid.module.css";

type ProjectGridProps = {
  projects: CardData[];
  tags: string[];
};

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
            <Card
              key={project.title}
              {...project}
              highlighted={matches}
              dimmed={selectedTag != null && !matches}
              activeTag={selectedTag}
            />
          );
        })}
      </CardGrid>
    </div>
  );
}
