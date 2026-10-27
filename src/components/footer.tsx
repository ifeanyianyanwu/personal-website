import Link from "next/link";
import { contact, links, nav, profile } from "@/content/site";
import { LinkArrow } from "@/components/ui";
import { Year } from "@/components/year";
import { PlotPoint } from "@/components/plot-point";

export function Footer() {
  return (
    <footer id="contact" data-plot-surface className="mt-auto bg-sky pt-32 pb-10 text-on-sky">
      <div className="container-page">
        <p className="text-eyebrow opacity-70">{contact.eyebrow}</p>
        <h2 className="text-display mt-6 max-w-[12ch]">
          {contact.headline.lead} <em>{contact.headline.accent}</em>
        </h2>
        <p className="text-lede mt-8 max-w-[40ch] opacity-80">{contact.body}</p>
        <div className="relative mt-10 flex items-center gap-3 md:gap-8">
          <PlotPoint n={997} className="plot-in-l -top-16" />
          <PlotPoint n={998} className="plot-in-l top-1/2" />
          <span aria-hidden data-plot={999} className="size-4 shrink-0 rounded-full bg-on-sky" />
          <a
            href={`mailto:${profile.email}`}
            className="text-title min-w-0 break-all border-b-2 border-current pb-1.5 transition hover:opacity-80 max-md:text-[1.2rem]"
          >
            {profile.email}
          </a>
        </div>

        <div className="mt-28 flex flex-col gap-8 border-t border-on-sky/20 pt-8 md:flex-row md:items-end md:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[0.95rem]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:opacity-70">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <LinkArrow href={links.linkedin} className="text-current">LinkedIn</LinkArrow>
            </li>
            <li>
              <LinkArrow href={links.github} className="text-current">GitHub</LinkArrow>
            </li>
            <li>
              <LinkArrow href={links.cv} className="text-current">CV (PDF)</LinkArrow>
            </li>
          </ul>
          <p className="text-[0.95rem] opacity-75">
            © <Year /> {profile.name} ·{" "}
            <em className="font-serif text-lg">{profile.signature}</em>
          </p>
        </div>
      </div>
    </footer>
  );
}
