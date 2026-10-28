import { notFound } from "next/navigation";
import { ogImage, ogSize } from "@/lib/og";
import { getCaseStudies } from "@/lib/work";

export const alt = "Case study by Ifeanyi Anyanwu";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getCaseStudies()).map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = (await getCaseStudies()).find((s) => s.slug === slug);
  if (!study) notFound();
  return ogImage({
    eyebrow: `Case study · ${study.title}${study.when ? ` · ${study.when}` : ""}`,
    lead: study.headline?.lead ?? study.title,
    accent: study.headline?.accent ?? "",
    sub: study.summary,
  });
}
