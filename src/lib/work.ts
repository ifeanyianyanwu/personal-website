import { readdir } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";

import type { WorkEntry, WorkMeta } from "./work-meta";

export * from "./work-meta";

const dir = path.join(process.cwd(), "src/content/work");

export async function getWork(): Promise<WorkEntry[]> {
  "use cache";
  cacheLife("max"); // content only changes with a deploy
  const files = (await readdir(dir)).filter((f) => f.endsWith(".mdx"));
  const entries = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { meta } = (await import(`@/content/work/${slug}.mdx`)) as { meta: WorkMeta };
      return { ...meta, slug };
    }),
  );
  return entries.sort((a, b) => b.year - a.year || (b.order ?? 0) - (a.order ?? 0));
}

export async function getCaseStudies() {
  return (await getWork()).filter((w) => w.status === "case-study");
}
