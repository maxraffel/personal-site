"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cx } from "@/lib/cx";
import styles from "./StarField.module.css";

type StarTone = "light" | "dark";

/** Deterministic PRNG so star attributes stay stable across resizes. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Star = {
  x: number;
  y: number;
  size: number;
  depth: number;
  duration: number;
  delay: number;
  peak: number;
};

/** Target density: one star per this many px². */
const PX_PER_STAR = 36_000;
const MIN_STARS = 24;
const MAX_STARS = 220;
/** Max parallax shift for the nearest layer from pointer (px). */
const PARALLAX_STRENGTH = 20;
/** Star travel as a fraction of how far the section has scrolled up. */
const SCROLL_STRENGTH = 0.5;

function createStars(count: number, seed = 42): Star[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => {
    const size = 6 + rand() * 14;
    return {
      x: rand() * 100,
      y: rand() * 100,
      size,
      depth: 0.3 + ((size - 6) / 14) * 0.7,
      duration: 2.5 + rand() * 4.5,
      delay: rand() * -8,
      peak: 0.45 + rand() * 0.55,
    };
  });
}

const STAR_POOL = createStars(MAX_STARS);

function countForArea(width: number, height: number) {
  return Math.min(
    MAX_STARS,
    Math.max(MIN_STARS, Math.round((width * height) / PX_PER_STAR)),
  );
}

function StarNodes({
  stars,
  tone,
}: {
  stars: Star[];
  tone: StarTone;
}) {
  return stars.map((star, i) => (
    <span
      key={i}
      className={cx(styles.star, tone === "light" && styles.starLight)}
      style={
        {
          left: `${star.x}%`,
          top: `${star.y}%`,
          width: star.size,
          height: star.size,
          "--star-duration": `${star.duration}s`,
          "--star-delay": `${star.delay}s`,
          "--star-peak": star.peak,
        } as CSSProperties
      }
    />
  ));
}

type StarFieldProps = {
  className?: string;
  tone?: StarTone;
};

export function StarField({ className, tone = "dark" }: StarFieldProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(MIN_STARS);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const frame = useRef(0);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const update = (width: number, height: number) => {
      if (width <= 0 || height <= 0) return;
      setCount(countForArea(width, height));
    };

    update(node.clientWidth, node.clientHeight);

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      update(width, height);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const far = farRef.current;
    const near = nearRef.current;
    if (!root || !far || !near) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const apply = () => {
      frame.current = 0;
      const px = pointer.current.x * PARALLAX_STRENGTH;
      const py = pointer.current.y * PARALLAX_STRENGTH;
      const sy = scroll.current;
      far.style.transform = `translate3d(${px * 0.35}px, ${py * 0.35 + sy * 0.4}px, 0)`;
      near.style.transform = `translate3d(${px}px, ${py + sy}px, 0)`;
    };

    const schedule = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(apply);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointer.current = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
      };
      schedule();
    };

    const onScroll = () => {
      scroll.current =
        Math.max(0, -root.getBoundingClientRect().top) * SCROLL_STRENGTH;
      schedule();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });
    onScroll();
    apply();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, { capture: true });
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [count]);

  const stars = STAR_POOL.slice(0, count);
  const farStars = stars.filter((star) => star.depth < 0.65);
  const nearStars = stars.filter((star) => star.depth >= 0.65);

  return (
    <div
      ref={rootRef}
      className={cx(styles.root, className)}
      aria-hidden="true"
    >
      <div ref={farRef} className={styles.layer}>
        <StarNodes stars={farStars} tone={tone} />
      </div>
      <div ref={nearRef} className={styles.layer}>
        <StarNodes stars={nearStars} tone={tone} />
      </div>
    </div>
  );
}
