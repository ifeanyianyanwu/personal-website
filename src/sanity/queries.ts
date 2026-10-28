import { cacheLife, cacheTag } from "next/cache";
import { createClient, defineQuery } from "next-sanity";
import { apiVersion, dataset, isConfigured, projectId } from "./env";
import type { PlotPoint } from "./types";

export type { PlotPoint, SanityImage } from "./types";

const client = createClient({ projectId: projectId || "unset", dataset, apiVersion, useCdn: true });

const photo = `
  alt,
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip
`;

// `images` is photos only (covers and thumbnails); `media` is photos and clips in their Studio order.
const fields = `
  _id, title, "slug": slug.current, date, category, location, tags, caption, recipe,
  "images": images[_type == "image"]{ ${photo} },
  "media": images[]{
    "kind": _type,
    _type == "image" => { ${photo} },
    _type == "clip" => { alt, "url": video.asset->url, "mimeType": video.asset->mimeType, "poster": poster.asset->url }
  },
  "clips": count(images[_type == "clip"])
`;

const allQuery = defineQuery(`*[_type == "plotPoint" && defined(slug.current) && count(images[_type == "image"]) > 0] | order(date desc) { ${fields} }`);
const oneQuery = defineQuery(`*[_type == "plotPoint" && slug.current == $slug][0] { ${fields} }`);

/** Every plot point, newest first. Empty until a Sanity project is configured. */
export async function getPlotPoints(): Promise<PlotPoint[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("plot-points");
  if (!isConfigured) return [];
  return client.fetch<PlotPoint[]>(allQuery);
}

export async function getPlotPoint(slug: string): Promise<PlotPoint | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("plot-points");
  if (!isConfigured) return null;
  return client.fetch<PlotPoint | null>(oneQuery, { slug });
}
