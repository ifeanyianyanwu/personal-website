import { SiteChrome } from "@/components/site-chrome";
import { ButtonLink } from "@/components/ui";
import { PlotPoint } from "@/components/plot-point";

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="container-page relative pt-32 pb-32 md:pt-40">
        <PlotPoint n={1} className="plot-l top-0" />
        <p className="text-eyebrow text-muted">404</p>
        <h1 className="text-display mt-5">
          Off the <em className="text-accent">plot.</em>
        </h1>
        <p className="text-lede mt-6 max-w-[40ch] text-muted">This page doesn&apos;t exist, or it moved.</p>
        <ButtonLink href="/" className="mt-10">
          Back home
        </ButtonLink>
        <PlotPoint n={90} className="plot-l bottom-16" />
      </section>
    </SiteChrome>
  );
}
