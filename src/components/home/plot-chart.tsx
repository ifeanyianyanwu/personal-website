"use client";

import { motion } from "motion/react";

const paths = {
  down: "M 4 10 C 90 14, 150 30, 200 70 S 300 98, 396 96",
  up: "M 4 100 C 90 98, 150 80, 200 50 S 300 26, 396 24",
};

/** The plot line in miniature: draws the real result when it scrolls into view. */
export function PlotChart({ label, from, to, trend }: { label: string; from: string; to: string; trend: "down" | "up" }) {
  return (
    <figure className="flex flex-col gap-2 rounded-[1.625rem] bg-sand-50 px-6 py-5 text-ink">
      <figcaption className="text-eyebrow text-ink-soft">
        {label}: {from} to {to}
      </figcaption>
      <svg aria-hidden viewBox="0 0 400 110" preserveAspectRatio="none" className="h-[110px] w-full">
        <line x1="0" y1="104" x2="400" y2="104" stroke="var(--color-sand-300)" />
        <motion.path
          d={paths[trend]}
          fill="none"
          stroke="var(--color-sky-500)"
          strokeWidth={5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div aria-hidden className="flex justify-between text-sm text-ink-soft">
        <span>{from}</span>
        <span>{to}</span>
      </div>
    </figure>
  );
}
