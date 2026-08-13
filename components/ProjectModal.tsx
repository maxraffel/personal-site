"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import type { ProjectData } from "@/components/Card";
import styles from "./ProjectModal.module.css";

type ProjectModalProps = {
  project: ProjectData;
  onClose: () => void;
};

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) return;

    // overflow:hidden removes the scrollbar; pad by its width so layout doesn't shift.
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    closeRef.current?.focus();

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isClient, onClose]);

  const body: ReactNode = project.content ?? (
    <div className={styles.defaultBody}>
      <div className={styles.cover}>
        <Image
          src={project.image}
          alt={project.imageAlt || project.title}
          fill
          className={styles.coverImage}
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>
      <p className={styles.description}>{project.description}</p>
      {project.tags.length > 0 ? (
        <ul className={styles.tags}>
          {project.tags.map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );

  if (!isClient) return null;

  return createPortal(
    <div className={styles.root} role="presentation">
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Close project"
        onClick={onClose}
      />
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className={styles.header}>
          <div className={styles.headerText}>
            <div className={styles.meta}>
              <p className={styles.subtitle}>{project.subtitle}</p>
              <p className={styles.year}>{project.year}</p>
            </div>
            <h2 id={titleId} className={styles.title}>
              {project.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            aria-label="Close project"
            onClick={onClose}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>
        <div className={styles.body}>{body}</div>
      </div>
    </div>,
    document.body,
  );
}
