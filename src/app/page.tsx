import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { Faq, Proof, Story } from "@/components/home/sections";
import { Work } from "@/components/home/work";
import { Marquee } from "@/components/ui";
import { marquee } from "@/content/site";

export default function Home() {
  return (
    <>
      <Intro />
      <Hero />
      <Marquee className="bg-sky py-6 font-serif text-[clamp(2rem,4vw,2.875rem)] text-on-sky" items={marquee} />
      <Work />
      <Proof />
      <Story />
      <Faq />
    </>
  );
}
