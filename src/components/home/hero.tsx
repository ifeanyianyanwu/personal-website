import Image from "next/image";
import { Reveal, SplitText } from "@/components/motion";
import { PlotPoint } from "@/components/plot-point";
import { ButtonLink } from "@/components/ui";
import { profile, timeline } from "@/content/site";
import { PortraitScribble } from "./portrait-scribble";

/**
 * Plot route through the hero: down the left gutter (1, 2), along the timeline
 * dots (3 to 7, eased by 1.5, 7.5 and 7.8), then on to the right gutter of the work section. The portrait gets
 * its own drawn-on-load loop so the scroll line only ever travels down the page.
 * Mobile stacks name → text → timeline → portrait so the same order still reads top to bottom.
 */
export function Hero() {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <section className="container-page relative grid gap-x-6 gap-y-14 pt-28 pb-24 [grid-template-areas:'name'_'text'_'time'_'photo'] md:gap-y-10 md:pt-24 md:pb-32 md:grid-cols-[7fr_5fr] md:[grid-template-areas:'name_name'_'text_photo'_'time_time']">
      <PlotPoint n={1} className="plot-l top-0" />

      {/* Masthead: the name set edge to edge. textLength keeps it flush at every width. */}
      <div className="border-b border-line-strong pb-6 [grid-area:name]">
        <svg role="img" aria-label={profile.name} viewBox="0 0 1000 168" className="block h-auto w-full overflow-visible">
          <text
            x="0"
            y="128"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="fill-fg text-[166px]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {first} <tspan className="fill-accent italic">{rest.join(" ")}</tspan>
          </text>
        </svg>
      </div>

      <div className="flex flex-col gap-8 [grid-area:text]">
        <ul aria-label="At a glance" className="flex flex-wrap gap-2">
          {profile.glance.map((item, i) => (
            <li
              key={item}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-3.5 text-[0.95rem]"
            >
              {i === profile.glance.length - 1 && <span aria-hidden className="size-2 rounded-full bg-[#4f9a6b]" />}
              {item}
            </li>
          ))}
        </ul>
        <SplitText as="h1" className="text-display text-[clamp(3.75rem,6.6vw,6.5rem)]! leading-[0.88]!" text={profile.headline.lead} accent={profile.headline.accent} afterIntro />
        <Reveal delay={0.3} className="flex flex-wrap gap-3">
          <ButtonLink href="#contact">Work with me</ButtonLink>
          <ButtonLink href="#work" variant="secondary">
            See my work
          </ButtonLink>
        </Reveal>
      </div>

      <div className="relative flex flex-col items-center gap-6 [grid-area:photo] md:items-end">
        <p className="text-hand relative z-30 max-w-[16rem] -rotate-3 rounded-lg bg-bg px-2.5 py-1 text-right text-[1.75rem] text-accent md:self-end">
          {profile.note}
        </p>
        <div className="relative md:mr-10">
          <PortraitScribble />
          <div className="relative h-[300px] w-[240px] overflow-hidden rounded-full bg-sand md:h-[340px] md:w-[270px]">
            <Image
              src={profile.portrait.src}
              alt={profile.portrait.alt}
              fill
              sizes="270px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="relative [grid-area:time] md:w-[84%]">
        <PlotPoint n={1.5} className="plot-in-l -top-12" />
        <PlotPoint n={2} className="plot-in-l top-2" />
        <PlotPoint n={7.5} className="top-2 -right-4 hidden md:block" />
        <PlotPoint n={7.8} className="top-28 -right-[14%] hidden md:block" />
        <ol aria-label="The plot so far" className="flex flex-col gap-6 md:grid md:grid-cols-5 md:gap-4">
          {timeline.map((t, i) => (
            <li key={t.year} className="flex items-start gap-4 md:flex-col md:gap-2">
              <span aria-hidden data-plot={3 + i} className="size-4 shrink-0 rounded-full border-4 border-fg bg-bg" />
              <span className="flex flex-col gap-1">
                <span className="text-hand text-[1.75rem] text-accent">{t.year}</span>
                <span className="text-[0.95rem]">{t.label}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

    </section>
  );
}
