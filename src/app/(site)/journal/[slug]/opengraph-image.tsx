import { notFound } from "next/navigation";
import { formatDate, getJournal, getPost } from "@/lib/journal";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Journal post by Ifeanyi Anyanwu";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  return (await getJournal()).map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const found = await getPost((await params).slug);
  if (!found) notFound();
  const { post } = found;
  return ogImage({ eyebrow: `Journal · ${formatDate(post.date)}`, lead: post.title.lead, accent: post.title.accent, sub: post.summary });
}
