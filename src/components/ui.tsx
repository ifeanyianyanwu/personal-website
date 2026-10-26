import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "sky";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-cta text-cta-fg hover:opacity-90",
  secondary: "border border-line-strong text-fg hover:border-fg/50",
  sky: "bg-sky text-on-sky hover:brightness-95",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex h-12 items-center gap-2 rounded-full px-6 text-[0.95rem] font-medium transition ${buttonStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

/** Inline text link with an arrow that nudges on hover. */
export function LinkArrow({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  return (
    <Link
      href={href}
      {...(external && !href.startsWith("mailto:") ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group inline-flex items-center gap-1.5 font-medium text-accent ${className}`}
    >
      <span className="underline decoration-current/30 underline-offset-4 transition group-hover:decoration-current">
        {children}
      </span>
      <span aria-hidden className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1">
        {external ? "↗" : "→"}
      </span>
    </Link>
  );
}

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-24 md:py-36 ${className}`}>
      <div className="container-page">
        {eyebrow && <p className="text-eyebrow text-muted">{eyebrow}</p>}
        {title && <h2 className="text-headline mt-4 max-w-[16ch]">{title}</h2>}
        {children}
      </div>
    </section>
  );
}

/** Tag/filter pill. Renders a toggle button when `onClick` is given. */
export function Chip({
  children,
  active = false,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  const cls = `inline-flex h-11 items-center rounded-full px-4 text-sm transition ${
    active ? "bg-cta text-cta-fg" : "bg-surface text-fg ring-1 ring-line hover:ring-fg/30"
  }`;
  if (!onClick) return <span className={cls}>{children}</span>;
  return (
    <button type="button" aria-pressed={active} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function Marquee({ items, className = "" }: { items: readonly string[]; className?: string }) {
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center gap-12 pr-12">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-12 whitespace-nowrap">
          {item}
          <span aria-hidden className="size-2 rounded-full bg-current opacity-40" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`group flex overflow-hidden ${className}`}>
      <div className="flex w-max animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused]">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
