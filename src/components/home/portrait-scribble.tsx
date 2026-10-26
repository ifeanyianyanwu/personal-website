"use client";

import { motion } from "motion/react";

/**
 * A hand-drawn loop around the portrait, drawn once when the hero appears.
 * Kept separate from the scroll-drawn plot line so that line only ever travels
 * down the page (a loop above the timeline would draw off-screen).
 */
export function PortraitScribble() {
  const introPlaying = typeof document !== "undefined" && !("introSeen" in document.documentElement.dataset);
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -inset-[12%] z-10 h-[124%] w-[124%] overflow-visible"
    >
      <motion.path
        d="M 72 6 C 98 14, 102 62, 86 86 C 68 108, 20 104, 8 76 C -4 48, 12 8, 48 4 C 62 2, 78 6, 84 16"
        fill="none"
        className="stroke-plot"
        strokeWidth={4}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: introPlaying ? 1.6 : 0.5, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}
