"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

type RotatingTextProps = {
  words: string[];
  /** Time each word stays fully visible before exiting. */
  intervalMs?: number;
  /**
   * Reserve the width of the widest word and center each word in that space.
   * Avoids the surrounding layout shifting as words change.
   */
  fixedWidth?: boolean;
};

export function RotatingText({
  words,
  intervalMs = 2500,
  fixedWidth = false,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const [anim, setAnim] = useState<"idle" | "exit" | "enter">("idle");
  const [width, setWidth] = useState<number | undefined>(undefined);
  const measureRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!fixedWidth) {
      setWidth(undefined);
      return;
    }

    const measure = measureRef.current;
    if (!measure) return;

    let max = 0;
    for (const child of measure.children) {
      max = Math.max(max, (child as HTMLElement).offsetWidth);
    }
    setWidth(max);
  }, [words, fixedWidth]);

  useEffect(() => {
    if (words.length < 2) return;

    let exitTimer: ReturnType<typeof setTimeout>;

    const cycle = setInterval(() => {
      setAnim("exit");
      exitTimer = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setAnim("enter");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setAnim("idle"));
        });
      }, 350);
    }, intervalMs);

    return () => {
      clearInterval(cycle);
      clearTimeout(exitTimer);
    };
  }, [words.length, intervalMs]);

  return (
    <span
      className={[
        "rotating-text",
        fixedWidth ? "rotating-text--fixed" : undefined,
      ]
        .filter(Boolean)
        .join(" ")}
      style={width != null ? { width } : undefined}
      aria-live="polite"
    >
      {fixedWidth ? (
        <span ref={measureRef} className="rotating-text__measure" aria-hidden="true">
          {words.map((word) => (
            <span key={word} className="rotating-text__measure-word">
              {word}
            </span>
          ))}
        </span>
      ) : null}
      <span className={`rotating-text__word rotating-text__word--${anim}`}>
        {words[index]}
      </span>
    </span>
  );
}
