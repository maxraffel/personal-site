"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./CyclingContent.module.css";

export type CyclingContentItem = {
  title: string;
  body: ReactNode;
};

type CyclingContentProps = {
  items: CyclingContentItem[];
};

type Anim = "idle" | "exit" | "enter";
type Direction = "next" | "prev";

const TRANSITION_MS = 320;

const panelMotion = {
  idle: styles.idle,
  exit_next: styles.exitNext,
  exit_prev: styles.exitPrev,
  enter_next: styles.enterNext,
  enter_prev: styles.enterPrev,
} as const;

export function CyclingContent({ items }: CyclingContentProps) {
  const [index, setIndex] = useState(0);
  const [anim, setAnim] = useState<Anim>("idle");
  const [direction, setDirection] = useState<Direction>("next");
  const [titleWidth, setTitleWidth] = useState<number>();
  const [bodyMinHeight, setBodyMinHeight] = useState<number>();
  const titleMeasureRef = useRef<HTMLSpanElement>(null);
  const bodyMeasureRef = useRef<HTMLDivElement>(null);
  const bodyViewportRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const measure = titleMeasureRef.current;
    if (!measure) return;

    let max = 0;
    for (const child of measure.children) {
      max = Math.max(max, (child as HTMLElement).offsetWidth);
    }
    setTitleWidth(max);
  }, [items]);

  useLayoutEffect(() => {
    const measure = bodyMeasureRef.current;
    const viewport = bodyViewportRef.current;
    if (!measure || !viewport) return;

    const update = () => {
      measure.style.width = `${viewport.clientWidth}px`;
      let max = 0;
      for (const child of measure.children) {
        max = Math.max(max, (child as HTMLElement).offsetHeight);
      }
      setBodyMinHeight(max);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [items]);

  const item = items[index];
  if (!item) return null;

  const go = (dir: Direction) => {
    if (anim !== "idle" || items.length < 2) return;

    setDirection(dir);
    setAnim("exit");

    window.setTimeout(() => {
      const step = dir === "next" ? 1 : -1;
      setIndex((current) => (current + step + items.length) % items.length);
      setAnim("enter");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnim("idle"));
      });
    }, TRANSITION_MS);
  };

  const motionClass =
    anim === "idle"
      ? panelMotion.idle
      : panelMotion[`${anim}_${direction}` as Exclude<keyof typeof panelMotion, "idle">];

  return (
    <div>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          className={styles.arrow}
          onClick={() => go("prev")}
          aria-label="Previous"
        >
          &lsaquo;
        </button>
        <div className={styles.title}>
          <span
            ref={titleMeasureRef}
            className={styles.titleMeasure}
            aria-hidden="true"
          >
            {items.map((entry, i) => (
              <span key={i} className="text-md font-bold">
                {entry.title}
              </span>
            ))}
          </span>
          <p
            className={cx("text-md font-bold opacity-70", styles.titleLabel)}
            style={titleWidth != null ? { width: titleWidth } : undefined}
          >
            {item.title}
          </p>
        </div>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => go("next")}
          aria-label="Next"
        >
          &rsaquo;
        </button>
      </div>
      <div
        ref={bodyViewportRef}
        className={styles.bodyViewport}
        style={bodyMinHeight != null ? { minHeight: bodyMinHeight } : undefined}
      >
        <div
          ref={bodyMeasureRef}
          className={styles.bodyMeasure}
          aria-hidden="true"
        >
          {items.map((entry, i) => (
            <div key={i} className="text-xl">
              {entry.body}
            </div>
          ))}
        </div>
        <div className={cx("text-xl", motionClass)}>{item.body}</div>
      </div>
    </div>
  );
}
