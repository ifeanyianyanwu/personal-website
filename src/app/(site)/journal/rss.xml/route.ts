import { profile } from "@/content/site";
import { getJournal, plainTitle } from "@/lib/journal";

const site = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  "http://localhost:3000"
).replace(/\/$/, "");

const escape = (s: string) =>
  s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

/** RSS 2.0 feed of every post: title, summary and link. Built with the site, like the posts. */
export async function GET() {
  const posts = await getJournal();
  const items = posts
    .map((p) => {
      const url = `${site}/journal/${p.slug}`;
      return `    <item>
      <title>${escape(plainTitle(p))}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(p.summary)}</description>
${p.tags.map((t) => `      <category>${escape(t)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`Journal · ${profile.name}`)}</title>
    <link>${site}/journal</link>
    <atom:link href="${site}/journal/rss.xml" rel="self" type="application/rss+xml" />
    <description>What I learn building things, written down while it's fresh.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
