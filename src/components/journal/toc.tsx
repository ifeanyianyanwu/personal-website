"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/journal-meta";

/**
 * "The plot": the post's table of contents, with one dot per section sitting on the
 * page's pen line (the dots use the same gutter x as `PlotPoint`). Sections you've
 * reached fill in; the one you're reading is marked as the current location.
 * Sticky beside the text on wide screens, a plain list above it on small ones.
 */
export function Toc({ items }: { items: TocItem[] }) {
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    const headings = items.map((t) => document.getElementById(t.id)).filter((h): h is HTMLElement => !!h);
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let at = -1;
      headings.forEach((h, i) => {
        if (h.getBoundingClientRect().top <= line) at = i;
      });
      setCurrent(at);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="On this page" className="lg:sticky lg:top-28">
      <p className="text-hand mb-3 text-[1.625rem] text-accent">the plot</p>
      <ol>
        {items.map((t, i) => (
          <li key={t.id} className="relative">
            <span
              aria-hidden
              className={`plot-in-l absolute top-[1.15rem] size-4 -translate-1/2 rounded-full border-4 border-fg motion-safe:transition-colors ${
                i <= current ? "bg-plot" : "bg-bg"
              }`}
            />
            <a
              href={`#${t.id}`}
              aria-current={i === current ? "location" : undefined}
              className={`flex min-h-11 flex-col justify-center py-1.5 pl-3 md:pl-0 text-[0.9375rem] leading-snug motion-safe:transition-colors ${
                i <= current ? "text-fg" : "text-muted hover:text-fg"
              } ${i === current ? "font-semibold" : ""}`}
            >
              <span className="text-xs tracking-[0.1em] opacity-70">{String(i + 1).padStart(2, "0")}</span>
              {t.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
