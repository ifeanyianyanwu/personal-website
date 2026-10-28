import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { PlotLine } from "@/components/plot-line";
import { SmoothScroll } from "@/components/providers";

/** Nav, footer, smooth scroll, the pen line and cookieless analytics around every site page (not the Studio). */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[110] focus:rounded-full focus:bg-cta focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-cta-fg"
      >
        Skip to content
      </a>
      <Nav />
      <div className="relative flex flex-1 flex-col">
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <PlotLine />
      </div>
      <Analytics />
    </>
  );
}
