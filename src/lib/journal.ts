import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import GithubSlugger from "github-slugger";
import { cacheLife } from "next/cache";

import type { JournalEntry, JournalMeta, TocItem } from "./journal-meta";

export * from "./journal-meta";

const dir = path.join(process.cwd(), "src/content/journal");

/** Words per minute for the reading time. */
const WPM = 230;

/** Body text only: drops the `meta` export and code fences, keeps prose. */
function body(source: string) {
  return source.replace(/^export const meta[\s\S]*?\n};\n/m, "").replace(/```[\s\S]*?```/g, "");
}

/** `##` headings, slugged the same way `rehype-slug` slugs them, so links land. */
function toc(source: string): TocItem[] {
  const slugger = new GithubSlugger();
  return [...body(source).matchAll(/^## (.+)$/gm)].map(([, raw]) => {
    const title = raw.replace(/[*_`]/g, "").trim();
    return { id: slugger.slug(title), title };
  });
}

export async function getJournal(): Promise<JournalEntry[]> {
  "use cache";
  cacheLife("max"); // content only changes with a deploy
  const files = (await readdir(dir)).filter((f) => f.endsWith(".mdx"));
  const entries = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const source = await readFile(path.join(dir, file), "utf8");
      const { meta } = (await import(`@/content/journal/${slug}.mdx`)) as { meta: JournalMeta };
      const words = body(source).split(/\s+/).filter(Boolean).length;
      return { ...meta, slug, minutes: Math.max(1, Math.ceil(words / WPM)), toc: toc(source) };
    }),
  );
  return entries.sort((a, b) => b.date.localeCompare(a.date));
}

/** A post with its neighbours: `newer` and `older` in date order. */
export async function getPost(slug: string) {
  const posts = await getJournal();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  return { post: posts[i], newer: posts[i - 1], older: posts[i + 1] };
}
