"use client";

import { useId, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { diagrams, type DiagramKey } from "./diagrams";

type Side = { label: string; note: string; diagram: DiagramKey };

/**
 * Before/after wipe. It follows the scroll until the visitor drags it, then stays
 * where they left it. A real range input drives it, so keyboard and screen readers work.
 */
export function Compare({ before, after, label }: { before: Side; after: Side; label: string }) {
  const [split, setSplit] = useState(50);
  const touched = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const id = useId();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce || touched.current) return;
    setSplit(Math.round(Math.min(92, Math.max(8, 100 - v * 100))));
  });

  const Before = diagrams[before.diagram];
  const After = diagrams[after.diagram];

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[2rem] text-sky-900 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent"
    >
      <Panel side={after} className="items-end bg-sky-300 text-right">
        <After />
      </Panel>
      <Panel side={before} className="absolute inset-0 bg-sand-100" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
        <Before />
      </Panel>

      <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-sky-900" style={{ left: `${split}%` }}>
        <span className="absolute top-1/2 left-1/2 grid size-[3.25rem] -translate-1/2 place-items-center rounded-full bg-sky-900 text-xl text-sand-100">
          ⇆
        </span>
      </div>

      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={split}
        onChange={(e) => {
          touched.current = true;
          setSplit(Number(e.target.value));
        }}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

function Panel({
  side,
  className,
  style,
  children,
}: {
  side: Side;
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-5 p-4 sm:p-6 md:gap-6 md:p-12 ${className}`} style={style}>
      <p className="text-eyebrow max-w-[45%] font-semibold">{side.label}</p>
      <div className="mx-auto w-full max-w-4xl">{children}</div>
      <p className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-none">{side.note}</p>
    </div>
  );
}
