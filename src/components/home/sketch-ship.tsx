"use client";

import { useId, useState } from "react";

/**
 * Before/after wipe between a hand-drawn wireframe and the shipped UI.
 * A real range input drives it, so it works with keyboard and screen readers.
 * TODO(Ifeanyi): swap the drawn "shipped" mock for a real screenshot.
 */
export function SketchShip({ note, label }: { note: string; label: string }) {
  const [split, setSplit] = useState(48);
  const id = useId();

  return (
    <div className="relative h-[340px] overflow-hidden rounded-[1.625rem] bg-sand-100">
      {/* Shipped: a clean mini storefront */}
      <div aria-hidden className="absolute inset-0 flex flex-col gap-3 p-6">
        <div className="flex h-8 items-center justify-between rounded-lg bg-sand-50 px-3">
          <span className="h-2 w-16 rounded-full bg-sky-900" />
          <span className="h-2 w-24 rounded-full bg-sand-300" />
        </div>
        <div className="grid flex-1 grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col gap-2 rounded-xl bg-sand-50 p-2.5">
              <span className={`flex-1 rounded-lg ${i === 1 ? "bg-sky-300" : "bg-sky-200"}`} />
              <span className="h-2 w-3/4 rounded-full bg-sand-300" />
              <span className="h-2 w-1/2 rounded-full bg-sky-900/70" />
            </div>
          ))}
        </div>
      </div>

      {/* Sketch: graph paper + pen wireframe */}
      <div
        aria-hidden
        className="absolute inset-0 bg-sand-50 bg-[linear-gradient(var(--color-sky-100)_1px,transparent_1px),linear-gradient(90deg,var(--color-sky-100)_1px,transparent_1px)] bg-[size:22px_22px] p-6 text-sky-900"
        style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
      >
        <span className="text-hand text-[1.6rem]">{note}</span>
        <svg viewBox="0 0 240 190" className="mt-2 h-[190px] w-[240px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M5 8 C 80 5, 160 9, 236 7 L 236 30 C 160 32, 80 28, 5 31 Z" />
          <path d="M5 46 L 74 44 L 75 116 L 6 118 Z M 85 45 L 154 46 L 153 117 L 84 116 Z M 165 44 L 235 46 L 234 118 L 164 117 Z" />
          <path d="M8 142 L 228 140 M 8 162 L 176 163" />
        </svg>
      </div>

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
        min={5}
        max={95}
        value={split}
        onChange={(e) => setSplit(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
