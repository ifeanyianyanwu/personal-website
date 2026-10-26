import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { PlotLine } from "@/components/plot-line";
import { SmoothScroll } from "@/components/providers";

/** Nav, footer, smooth scroll and the pen line around every site page (not the Studio). */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <div className="relative flex flex-1 flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
        <PlotLine />
      </div>
    </>
  );
}
