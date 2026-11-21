"use client";

import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const DURATION_MS = 1100;

/**
 * Counts every number in a label up from zero when it scrolls into view, so
 * "19-9" and "9-3" animate the way a broadcast graphic does. Non-digits pass
 * through untouched.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const start = performance.now();
        const step = (now: number) => {
          const elapsed = Math.min(1, (now - start) / DURATION_MS);
          // Ease out so the last digits settle instead of snapping.
          setProgress(1 - Math.pow(1 - elapsed, 3));
          if (elapsed < 1) frame = requestAnimationFrame(step);
        };

        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const shown =
    reducedMotion || progress >= 1
      ? value
      : value.replace(/\d+/g, (digits) =>
          String(Math.round(Number(digits) * progress)),
        );

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
    </span>
  );
}
