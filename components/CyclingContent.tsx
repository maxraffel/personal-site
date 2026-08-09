"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

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

  const panelClass = [
    "cycling-content__panel",
    `cycling-content__panel--${anim}`,
    `cycling-content__panel--${direction}`,
  ].join(" ");

  return (
    <div className="cycling-content">
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          className="cycling-content__arrow"
          onClick={() => go("prev")}
          aria-label="Previous"
        >
          &lsaquo;
        </button>
        <div className="cycling-content__title">
          <span
            ref={titleMeasureRef}
            className="cycling-content__title-measure"
            aria-hidden="true"
          >
            {items.map((entry, i) => (
              <span key={i} className="text-md font-bold">
                {entry.title}
              </span>
            ))}
          </span>
          <p
            className="text-md font-bold opacity-70"
            style={titleWidth != null ? { width: titleWidth } : undefined}
          >
            {item.title}
          </p>
        </div>
        <button
          type="button"
          className="cycling-content__arrow"
          onClick={() => go("next")}
          aria-label="Next"
        >
          &rsaquo;
        </button>
      </div>
      <div
        ref={bodyViewportRef}
        className="cycling-content__body-viewport"
        style={bodyMinHeight != null ? { minHeight: bodyMinHeight } : undefined}
      >
        <div
          ref={bodyMeasureRef}
          className="cycling-content__body-measure"
          aria-hidden="true"
        >
          {items.map((entry, i) => (
            <div key={i} className="text-xl">
              {entry.body}
            </div>
          ))}
        </div>
        <div className={`text-xl ${panelClass}`}>{item.body}</div>
      </div>
    </div>
  );
}
