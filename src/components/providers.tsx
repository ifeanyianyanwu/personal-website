"use client";

import { domAnimation, LazyMotion, MotionConfig, useReducedMotion } from "motion/react";
import { ThemeProvider } from "next-themes";
import { ReactLenis } from "lenis/react";

// LazyMotion + `m` components ship only the features we use (no layout or drag); strict catches a stray `motion.*`.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light" disableTransitionOnChange>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}

// Mounted beside the page (not around it) so toggling it never remounts content. Site pages only, not the Studio.
export function SmoothScroll() {
  const reduce = useReducedMotion();
  return reduce ? null : <ReactLenis root options={{ lerp: 0.1 }} />;
}
