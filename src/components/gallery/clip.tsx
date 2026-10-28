"use client";

import { useEffect, useRef, useState } from "react";
import type { Clip as ClipData } from "@/sanity/types";

/**
 * A short clip: muted, looping and plays only while on screen. The pause button
 * covers WCAG 2.2.2 (moving content needs a stop). With reduced motion it never
 * starts by itself; the first frame (or poster) shows until the visitor presses play.
 */
export function Clip({ clip, className = "" }: { clip: ClipData; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Reduced motion starts as if paused: only the visitor's play button starts it.
    userPaused.current = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    userPaused.current = !video.paused;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <figure className={`relative overflow-hidden bg-sand ${className}`}>
      <video
        ref={ref}
        aria-label={clip.alt}
        muted
        loop
        playsInline
        preload="metadata"
        poster={clip.poster}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="block h-auto w-full"
      >
        {/* #t=0.1 makes Safari paint the first frame when there's no poster and it isn't playing. */}
        <source src={`${clip.url}#t=0.1`} type={clip.mimeType} />
      </video>
      {/* Two-tone focus ring (light outline on a navy halo) so it shows over any frame of the clip. */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause clip" : "Play clip"}
        className="absolute right-4 bottom-4 grid size-11 place-items-center rounded-full bg-sky-900/85 text-sand-100 backdrop-blur-sm transition hover:bg-sky-900 focus-visible:outline-sand-100 focus-visible:shadow-[0_0_0_5px_var(--color-sky-900)]"
      >
        {playing ? (
          <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="currentColor">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
          </svg>
        )}
      </button>
    </figure>
  );
}

/** Marks a thumbnail whose plot point has a clip. Sits in the tile's top-left corner. */
export function ClipMark({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-sky-900/85 font-medium text-sand-100 backdrop-blur-sm ${small ? "px-1.5 py-0.5 text-[0.625rem]" : "px-2.5 py-1 text-[0.75rem]"}`}
    >
      <svg aria-hidden viewBox="0 0 24 24" className={small ? "size-2" : "size-2.5"} fill="currentColor">
        <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
      </svg>
      Clip
    </span>
  );
}
