"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cx } from "@/lib/cx";
import {
  dropdownToTag,
  useProjectFilterOptional,
} from "@/components/ProjectFilter";
import styles from "./RotatingContent.module.css";

export type RotatingContentItem = {
  title: string;
  body: ReactNode;
};

type RotatingContentProps = {
  items: RotatingContentItem[];
  className?: string;
  /** Automatically advance to the next item after a delay. */
  autoRotate?: boolean;
  /** Delay between auto-rotations in seconds. */
  autoRotateInterval?: number;
};

type Anim = "idle" | "exit" | "enter";

const TRANSITION_MS = 320;
const DEFAULT_INTERVAL_SECONDS = 5;
/** Vertical slot size for the active title (rem). */
const ACTIVE_SLOT = 3.4;
/** Vertical slot size for each inactive title (rem). */
const INACTIVE_SLOT = 2.15;

const panelMotion = {
  idle: styles.idle,
  exit: styles.exit,
  enter: styles.enter,
} as const;

function offsetForPosition(position: number) {
  if (position <= 0) return 0;
  return ACTIVE_SLOT + (position - 1) * INACTIVE_SLOT;
}

export function RotatingContent({
  items,
  className,
  autoRotate = false,
  autoRotateInterval = DEFAULT_INTERVAL_SECONDS,
}: RotatingContentProps) {
  const filter = useProjectFilterOptional();
  const dropdownValue = filter?.dropdownValue ?? null;

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [anim, setAnim] = useState<Anim>("idle");
  const [bodyHeight, setBodyHeight] = useState<number>();
  const [progressEpoch, setProgressEpoch] = useState(0);
  const bodyMeasureRef = useRef<HTMLDivElement>(null);
  const bodyViewportRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);
  const activeIndexRef = useRef(0);
  const itemsRef = useRef(items);

  const count = items.length;
  const listHeight =
    count <= 0 ? 0 : ACTIVE_SLOT + Math.max(0, count - 1) * INACTIVE_SLOT;

  activeIndexRef.current = activeIndex;
  itemsRef.current = items;

  const select = (index: number) => {
    if (index === activeIndexRef.current || animating.current) return;

    animating.current = true;
    setActiveIndex(index);
    setAnim("exit");

    window.setTimeout(() => {
      setDisplayedIndex(index);
      setAnim("enter");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnim("idle");
          animating.current = false;
        });
      });
    }, TRANSITION_MS);
  };

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
      setBodyHeight(max);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    for (const child of measure.children) {
      observer.observe(child);
    }
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    if (dropdownValue == null) return;
    const title = dropdownToTag[dropdownValue];
    if (title == null) return;
    const index = itemsRef.current.findIndex((item) => item.title === title);
    if (index < 0) return;
    select(index);
  }, [dropdownValue]);

  if (count === 0) return null;

  const positionOf = (index: number) =>
    (index - activeIndex + count) % count;

  const displayed = items[displayedIndex];
  // When Learn more context exists, only autorotate on "Everything".
  const shouldAutoRotate =
    autoRotate && (dropdownValue == null || dropdownValue === "everything");
  const showProgress = shouldAutoRotate && count > 1;

  return (
    <div className={cx(styles.root, className)}>
      <div
        className={styles.titles}
        style={{ height: `${listHeight}rem` }}
        role="list"
      >
        {items.map((item, index) => {
          const position = positionOf(index);
          const active = position === 0;
          return (
            <button
              key={item.title}
              type="button"
              role="listitem"
              className={cx(
                styles.title,
                active ? styles.titleActive : styles.titleInactive,
                active && showProgress && styles.titleActiveResettable,
              )}
              style={{
                transform: `translateY(${offsetForPosition(position)}rem)`,
              }}
              aria-current={active ? "true" : undefined}
              tabIndex={active && !showProgress ? -1 : 0}
              onClick={() => {
                if (index === activeIndexRef.current) {
                  if (showProgress) setProgressEpoch((epoch) => epoch + 1);
                  return;
                }
                select(index);
              }}
            >
              <span className={styles.titleText}>{item.title}</span>
              {active && showProgress ? (
                <span className={styles.progressTrack} aria-hidden="true">
                  <span
                    key={`${activeIndex}-${progressEpoch}`}
                    className={styles.progressFill}
                    style={{ animationDuration: `${autoRotateInterval}s` }}
                    onAnimationEnd={() => {
                      select((activeIndexRef.current + 1) % count);
                    }}
                  />
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        ref={bodyViewportRef}
        className={styles.bodyViewport}
        style={bodyHeight != null ? { height: bodyHeight } : undefined}
      >
        <div
          ref={bodyMeasureRef}
          className={styles.bodyMeasure}
          aria-hidden="true"
        >
          {items.map((item) => (
            <div key={item.title} className={styles.bodyPanel}>
              {item.body}
            </div>
          ))}
        </div>
        <div className={cx(styles.bodyPanel, panelMotion[anim])}>
          {displayed?.body}
        </div>
      </div>
    </div>
  );
}
