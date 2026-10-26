"use client";

import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Fades and rises its children into view once. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

type SplitTag = "h1" | "h2" | "h3" | "p";

/**
 * Word-by-word rise from a clipped line. Screen readers get the plain text
 * via the sr-only copy; the animated words are hidden from them.
 */
export function SplitText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  accent,
  afterIntro = false,
}: {
  text: string;
  as?: SplitTag;
  className?: string;
  delay?: number;
  /** Trailing words set in the serif italic accent style. */
  accent?: string;
  /** Wait for the home intro on a first visit (see `components/home/intro.tsx`). */
  afterIntro?: boolean;
}) {
  const introPlaying =
    afterIntro && typeof document !== "undefined" && !("introSeen" in document.documentElement.dataset);
  const words = text.split(" ").map((w) => ({ w, accent: false }));
  const accentWords = accent?.split(" ").map((w) => ({ w, accent: true })) ?? [];
  const all = [...words, ...accentWords];

  return (
    <Tag className={className}>
      <span className="sr-only">{accent ? `${text} ${accent}` : text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.06, delayChildren: introPlaying ? delay + 1.1 : delay }}
      >
        {all.map(({ w, accent }, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className={`inline-block ${accent ? "italic text-accent" : ""}`}
              variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
              transition={{ duration: 1, ease }}
            >
              {w}
              {i < all.length - 1 && " "}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
