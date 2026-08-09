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

type CardProps = CardData;

export function Card({
  title,
  subtitle,
  year,
  description,
  tags,
  image,
  imageAlt = "",
}: CardProps) {
  return (
    <article className={styles.card}>
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
              <li key={tag} className={styles.tag}>
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
