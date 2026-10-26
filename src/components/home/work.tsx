import { Reveal } from "@/components/motion";
import { PlotPoint } from "@/components/plot-point";
import { LinkArrow } from "@/components/ui";
import { recipes, type Recipe } from "@/content/site";
import { Compare } from "@/components/work/compare";
import { PlotChart } from "./plot-chart";

/** Selected work as recipe cards. Plot route: down the right gutter (13, 14) on desktop; mobile stays in the left gutter. */
export function Work() {
  const [flagship, ...rest] = [...recipes].sort((a, b) => Number(!!b.flagship) - Number(!!a.flagship));

  return (
    <section id="work" className="container-page relative scroll-mt-24 pt-32 md:pt-40">
      <PlotPoint n={13} className="plot-r top-0 hidden md:block" />

      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-eyebrow text-muted">Selected work · served three ways</p>
          <h2 className="text-headline mt-4 max-w-[14ch]">
            Real users. <em className="text-accent">Real numbers.</em>
          </h2>
        </div>
        <LinkArrow href="/work">All projects</LinkArrow>
      </div>

      <Reveal className="mt-14">
        <article data-plot-surface className="relative grid gap-10 rounded-[2.5rem] bg-sky p-7 text-on-sky md:grid-cols-2 md:p-11">
          {/* Mobile: run the line inside the card's left padding so it turns navy instead of blurring into the card edge. */}
          <PlotPoint n={13.5} className="top-10 left-3 md:hidden" />
          <PlotPoint n={13.7} className="bottom-10 left-3 md:hidden" />
          <div className="flex flex-col gap-4">
            <p className="text-eyebrow opacity-70">{flagship.eyebrow}</p>
            <h3 className="font-serif text-[clamp(3rem,5vw,4.5rem)] leading-[0.92]">{flagship.headline}</h3>
            <Facts recipe={flagship} rule="border-on-sky/25" big />
            <div className="mt-auto pt-2">
              <LinkArrow href={`/work/${flagship.slug}`} className="text-on-sky">
                Read the case study
              </LinkArrow>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {flagship.compare && <Compare {...flagship.compare} />}
            {flagship.chart && <PlotChart {...flagship.chart} />}
          </div>
        </article>
      </Reveal>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {rest.map((r, i) => (
          <Reveal key={r.slug} delay={i * 0.08}>
            <article className={`flex h-full flex-col gap-4 rounded-[2.25rem] p-7 md:p-10 ${i ? "bg-mist text-mist-fg" : "bg-sand"}`}>
              <p className="text-eyebrow opacity-70">{r.eyebrow}</p>
              <h3 className="font-serif text-[clamp(2.5rem,4vw,3rem)] leading-[0.95]">{r.headline}</h3>
              <Facts recipe={r} rule={i ? "border-mist-fg/25" : "border-line-strong"} />
              <div className="mt-auto pt-2">
                <LinkArrow href={`/work/${r.slug}`} className="text-current">
                  Read the case study
                </LinkArrow>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {flagship.footnote && (
        <p className="mt-5 text-[0.8125rem] text-muted">
          <sup>1</sup> {flagship.footnote}
        </p>
      )}
      <PlotPoint n={14} className="plot-r bottom-0 hidden md:block" />
    </section>
  );
}

function Facts({ recipe, rule, big = false }: { recipe: Recipe; rule: string; big?: boolean }) {
  const rows = [
    ["Serves", recipe.serves],
    ["Prep", recipe.prep],
    ["Ingredients", recipe.ingredients],
  ];
  return (
    <dl className={`mt-2 grid grid-cols-[7rem_1fr] gap-x-4 gap-y-3 border-t pt-4 text-[0.95rem] ${rule}`}>
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="opacity-70">{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
      <div className="contents">
        <dt className="self-center opacity-70">Result</dt>
        <dd>
          <strong className={`font-serif font-normal leading-none ${big ? "text-[2.5rem]" : "text-[1.75rem]"}`}>
            {recipe.result.value}
          </strong>{" "}
          {recipe.result.note}
          {big && recipe.footnote && <sup>1</sup>}
        </dd>
      </div>
    </dl>
  );
}
