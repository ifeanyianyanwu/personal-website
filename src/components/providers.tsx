"use client";

import { MotionConfig, useReducedMotion } from "motion/react";
import { ThemeProvider } from "next-themes";
import { ReactLenis } from "lenis/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light" disableTransitionOnChange>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}

// Mounted beside the page (not around it) so toggling it never remounts content. Site pages only, not the Studio.
export function SmoothScroll() {
  const reduce = useReducedMotion();
  return reduce ? null : <ReactLenis root options={{ lerp: 0.1 }} />;
}
