import Image from "next/image";
import { Reveal, SplitText } from "@/components/motion";
import { ButtonLink, Chip, LinkArrow, Marquee, Section } from "@/components/ui";
import { chapters, marquee, profile, proof } from "@/content/site";

// M1 preview of the approved design system. Replaced by the real home page in M2.
export default function Home() {
  return (
    <>
      <section className="container-page grid gap-12 pt-32 pb-20 md:grid-cols-12 md:pt-40">
        <div className="flex flex-col gap-8 md:col-span-7">
          <ul aria-label="At a glance" className="flex flex-wrap gap-2">
            {profile.glance.map((item) => (
              <li key={item}>
                <Chip>{item}</Chip>
              </li>
            ))}
          </ul>
          <SplitText
            as="h1"
            className="text-display"
            text={profile.headline.lead}
            accent={profile.headline.accent}
          />
          <Reveal delay={0.4} className="flex flex-wrap gap-3">
            <ButtonLink href="#contact">Work with me</ButtonLink>
            <ButtonLink href="/work" variant="secondary">
              See my work
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="flex flex-col items-center gap-4 md:col-span-5">
          <p className="text-hand max-w-[16rem] -rotate-3 self-end text-right text-[1.75rem] text-accent">
            {profile.note}
          </p>
          <div className="relative h-[340px] w-[270px] overflow-hidden rounded-full bg-sand">
            <Image
              src={profile.portrait.src}
              alt={profile.portrait.alt}
              fill
              sizes="270px"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
      </section>

      <Marquee className="bg-sky py-6 font-serif text-[2.875rem] text-on-sky" items={marquee} />

      <Section eyebrow="Proof" title={<>Real users. <em className="text-accent">Real numbers.</em></>}>
        <dl className="mt-16 grid grid-cols-2 border-t border-line-strong md:grid-cols-4">
          {proof.map((p) => (
            <div key={p.label} className="pt-8 pr-6">
              <dt className="sr-only">{p.label}</dt>
              <dd>
                <span className="block font-serif text-[clamp(3.5rem,6vw,6.5rem)] leading-[0.9] text-accent">
                  {p.value}
                </span>
                <span className="mt-3 block max-w-[22ch] text-muted">{p.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        eyebrow="The story"
        title={<>From screwdrivers to <em>software.</em></>}
        className="bg-sky text-on-sky"
      >
        <div className="mt-16 grid gap-5">
          {chapters.map((c) => (
            <Reveal key={c.id} className="rounded-[2rem] bg-surface p-8 text-fg md:p-10">
              <p className="text-hand text-[1.875rem] text-accent">{c.num}</p>
              <h3 className="mt-2 font-serif text-[2.625rem] leading-none">{c.title}</h3>
              <p className="text-lede mt-4 max-w-2xl text-muted">{c.body}</p>
            </Reveal>
          ))}
        </div>
        <LinkArrow href="/gallery" className="mt-10 text-on-sky">
          See the plot points
        </LinkArrow>
      </Section>
    </>
  );
}
