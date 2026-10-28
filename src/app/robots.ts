import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

/** Everything is public except the Sanity Studio. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/studio" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
