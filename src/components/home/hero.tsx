import Image from "next/image";
import { Reveal, SplitText } from "@/components/motion";
import { PlotPoint } from "@/components/plot-point";
import { ButtonLink } from "@/components/ui";
import { profile, timeline } from "@/content/site";

/**
 * Plot route through the hero: down the left gutter (1, 2), along the timeline
 * dots (3 to 7, eased by 1.5 and 7.5), a loop around the portrait (8 to 11), out the bottom right (12).
 * Mobile stacks text → timeline → portrait so the same order still reads top to bottom.
 */
export function Hero() {
  return (
    <section className="container-page relative grid gap-x-6 gap-y-14 pt-28 pb-24 [grid-template-areas:'text'_'time'_'photo'] md:pt-36 md:pb-32 md:grid-cols-[7fr_5fr] md:[grid-template-areas:'text_photo'_'time_time']">
      <PlotPoint n={1} className="plot-l top-0" />

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
        <SplitText as="h1" className="text-display" text={profile.headline.lead} accent={profile.headline.accent} afterIntro />
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
          <PlotPoint n={8} className="-right-10 bottom-8" />
          <PlotPoint n={9} className="-top-10 left-2/3" />
          <PlotPoint n={10} className="top-1/2 -left-12" />
          <PlotPoint n={11} className="-bottom-10 left-1/2" />
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

      <PlotPoint n={12} className="plot-r bottom-0" />
    </section>
  );
}
