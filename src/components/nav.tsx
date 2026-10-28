"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { nav, profile } from "@/content/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? "border-b border-line bg-bg/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" aria-label={`${profile.name}, home`} className="inline-flex items-center gap-2.5 font-semibold tracking-tight">
          <DiceMark />
          <span aria-hidden>{profile.initials}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {/* The current path is URL data, so it streams in; the shell shows the same links unmarked. */}
          <Suspense fallback={<DesktopLinks pathname="" />}>
            <CurrentDesktopLinks />
          </Suspense>
          <ThemeToggle />
          <Link
            href="#contact"
            className="inline-flex h-11 items-center rounded-full bg-cta px-5 text-sm font-medium text-cta-fg transition hover:opacity-90"
          >
            Work with me
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-11 items-center rounded-full px-4 text-sm font-medium ring-1 ring-line"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="container-page pb-8 md:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link href={item.href} onClick={() => setOpen(false)} className="text-headline block py-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex h-12 items-center rounded-full bg-cta px-6 font-medium text-cta-fg"
          >
            Work with me
          </Link>
        </nav>
      )}
    </header>
  );
}

// Icons swap via the `dark:` variant so server and client markup always match.
function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex size-11 items-center justify-center rounded-full text-muted ring-1 ring-line transition hover:text-fg"
    >
      <svg viewBox="0 0 24 24" className="size-4 dark:hidden" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
      <svg viewBox="0 0 24 24" className="hidden size-4 dark:block" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}

// The diced monogram from the intro, as a 3x2 grid of cubes.
function DiceMark() {
  return (
    <span aria-hidden className="grid grid-cols-3 gap-0.5">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`size-[7px] rounded-[2px] ${i % 2 ? "bg-fg" : "bg-plot"}`} />
      ))}
    </span>
  );
}

function CurrentDesktopLinks() {
  return <DesktopLinks pathname={usePathname()} />;
}

function DesktopLinks({ pathname }: { pathname: string }) {
  return nav.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      aria-current={pathname.startsWith(item.href) ? "page" : undefined}
      className="text-sm text-muted transition hover:text-fg aria-[current=page]:text-fg"
    >
      {item.label}
    </Link>
  ));
}
