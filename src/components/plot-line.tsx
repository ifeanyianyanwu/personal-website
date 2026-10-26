"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type Point = { x: number; y: number };
type Sample = { len: number; y: number };

/** Smooth path through every point (Catmull-Rom converted to cubic Béziers). */
function toPath(pts: Point[]) {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

/**
 * The signature pen line. Joins every `PlotPoint` inside the parent element and
 * draws itself as you scroll, so its tip stays a little below the middle of the
 * viewport. Fully drawn when reduced motion is on.
 */
export function PlotLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGCircleElement>(null);
  const [geo, setGeo] = useState<{ d: string; w: number; h: number } | null>(null);
  const reduce = useReducedMotion();
  const pathname = usePathname();

  // Measure points relative to the wrapper; re-measure on resize, font load and route change.
  useEffect(() => {
    const host = svgRef.current?.parentElement;
    if (!host) return;
    const measure = () => {
      const box = host.getBoundingClientRect();
      const pts = [...host.querySelectorAll<HTMLElement>("[data-plot]")]
        .filter((el) => el.getClientRects().length > 0) // skip points hidden at this breakpoint
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { n: Number(el.dataset.plot), x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
        })
        .sort((a, b) => a.n - b.n);
      setGeo(pts.length < 2 ? null : { d: toPath(pts), w: box.width, h: box.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [pathname]);

  // Draw on scroll: find how far along the path we can go before it dips below the target line.
  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!geo || !path || !svg) return;
    const total = path.getTotalLength();
    const samples: Sample[] = [];
    for (let len = 0; len <= total; len += 6) samples.push({ len, y: path.getPointAtLength(len).y });
    path.style.strokeDasharray = `${total}`;

    let frame = 0;
    const draw = () => {
      frame = 0;
      let drawn = total;
      if (!reduce) {
        const target = window.innerHeight * 0.72 - svg.getBoundingClientRect().top;
        const stop = samples.find((s) => s.y > target);
        drawn = stop ? stop.len : total;
      }
      path.style.strokeDashoffset = `${total - drawn}`;
      const tip = path.getPointAtLength(drawn);
      tipRef.current?.setAttribute("cx", `${tip.x}`);
      tipRef.current?.setAttribute("cy", `${tip.y}`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [geo, reduce]);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      width={geo?.w ?? 0}
      height={geo?.h ?? 0}
      viewBox={geo ? `0 0 ${geo.w} ${geo.h}` : undefined}
      className="pointer-events-none absolute inset-0 z-20 overflow-visible mix-blend-multiply dark:mix-blend-normal"
    >
      {geo && (
        <>
          <path
            ref={pathRef}
            d={geo.d}
            fill="none"
            className="stroke-plot"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle ref={tipRef} r={6} className="fill-plot" />
        </>
      )}
    </svg>
  );
}
