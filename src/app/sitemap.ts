import type { MetadataRoute } from "next";
import { getJournal } from "@/lib/journal";
import { siteUrl } from "@/lib/site-url";
import { getCaseStudies } from "@/lib/work";
import { getPlotPoints } from "@/sanity/queries";

/** Every page, case study, post and plot point. Dates come from content only (no build clock). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [studies, posts, points] = await Promise.all([getCaseStudies(), getJournal(), getPlotPoints()]);
  return [
    ...["", "/work", "/about", "/journal", "/gallery"].map((path) => ({ url: `${siteUrl}${path}` })),
    ...studies.map((s) => ({ url: `${siteUrl}/work/${s.slug}` })),
    ...posts.map((p) => ({ url: `${siteUrl}/journal/${p.slug}`, lastModified: p.date })),
    ...points.map((p) => ({ url: `${siteUrl}/gallery/${p.slug}`, lastModified: p.date })),
  ];
}
