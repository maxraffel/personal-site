import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Card.module.css";

export type CardData = {
  title: string;
  subtitle: string;
  /** Arbitrary label, typically a year or date range. */
  year: string;
  description: string;
  tags: string[];
  image: StaticImageData | string;
  imageAlt?: string;
};

/** Project card data plus deep-link slug and optional modal body. */
export type ProjectData = CardData & {
  slug: string;
  /** Arbitrary modal content. Falls back to the card summary when omitted. */
  content?: ReactNode;
};

type CardProps = CardData & {
  highlighted?: boolean;
  dimmed?: boolean;
  activeTag?: string | null;
};

export function Card({
  title,
  subtitle,
  year,
  description,
  tags,
  image,
  imageAlt = "",
  highlighted = false,
  dimmed = false,
  activeTag = null,
}: CardProps) {
  return (
    <article
      className={cx(
        styles.card,
        highlighted && styles.highlighted,
        dimmed && styles.dimmed,
      )}
    >
      <div className={styles.cover}>
        <Image
          src={image}
          alt={imageAlt || title}
          fill
          className={styles.coverImage}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <p className={styles.subtitle}>{subtitle}</p>
          <p className={styles.year}>{year}</p>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        {tags.length > 0 ? (
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li
                key={tag}
                className={cx(
                  styles.tag,
                  activeTag === tag && styles.tagActive,
                )}
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

type CardGridProps = {
  children: ReactNode;
  className?: string;
};

export function CardGrid({ children, className }: CardGridProps) {
  return <div className={cx(styles.grid, className)}>{children}</div>;
}
