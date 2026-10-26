import { Reveal } from "@/components/motion";
import { PlotPoint } from "@/components/plot-point";
import { LinkArrow } from "@/components/ui";
import { chapters, faq, proof } from "@/content/site";

/** Proof numbers. Plot route: crosses the top gap from the right gutter to the left (15, 15.5). */
export function Proof() {
  return (
    <section aria-label="Proof" className="container-page relative pt-28 md:pt-36">
      <PlotPoint n={15} className="plot-r top-14" />
      <PlotPoint n={15.5} className="plot-l top-14" />
      <dl className="grid grid-cols-2 border-t border-line-strong md:grid-cols-4">
        {proof.map((p, i) => (
          <Reveal key={p.label} delay={i * 0.06} className="pt-8 pr-6">
            <dt className="sr-only">{p.label}</dt>
            <dd>
              <span className="block font-serif text-[clamp(3.5rem,6vw,6.5rem)] leading-[0.9] text-accent">{p.value}</span>
              <span className="mt-3 block max-w-[22ch] text-muted">{p.label}</span>
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

/** The story, three chapters. Heading pins on desktop. Plot route: left gutter (16, 17). */
export function Story() {
  return (
    <section id="story" className="mt-28 bg-sky text-on-sky md:mt-36">
      <div className="container-page relative flex flex-col gap-14 py-28 md:flex-row md:gap-16 md:py-36">
        <PlotPoint n={16} className="plot-l top-0" />
        <div className="md:sticky md:top-28 md:w-5/12 md:self-start">
          <p className="text-eyebrow opacity-70">The story</p>
          <h2 className="text-display mt-6">
            From screwdrivers to <em>software.</em>
          </h2>
        </div>
        <ol className="flex flex-1 flex-col gap-5">
          {chapters.map((c) => (
            <li key={c.id}>
              <Reveal className="flex flex-col gap-3 rounded-[2rem] bg-surface p-8 text-fg md:p-10">
                <span className="text-hand text-[1.875rem] text-accent">{c.num}</span>
                <h3 className="font-serif text-[clamp(2.25rem,3.4vw,2.625rem)] leading-none">{c.title}</h3>
                <p className="text-lede max-w-2xl text-muted">{c.body}</p>
                {c.id === "plot" && (
                  <LinkArrow href="/gallery" className="mt-2">
                    See the plot points
                  </LinkArrow>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
        <PlotPoint n={17} className="plot-l bottom-0" />
      </div>
    </section>
  );
}

/** FAQ with native disclosure. Plot route: left gutter (18). */
export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="container-page relative flex flex-col gap-12 py-28 md:flex-row md:gap-16 md:py-36">
      <div className="md:w-5/12">
        <p className="text-eyebrow text-muted">FAQ</p>
        <h2 id="faq-title" className="text-headline mt-4">
          Things you might <em className="text-accent">ask.</em>
        </h2>
      </div>
      <div className="flex-1 border-t border-line-strong">
        {faq.map((f, i) => (
          <details key={f.q} open={i === 0} className="group border-b border-line-strong py-5">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[1.375rem] font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden className="text-2xl font-normal text-accent transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="text-lede mt-3 max-w-[60ch] text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      <PlotPoint n={18} className="plot-l bottom-0" />
    </section>
  );
}
