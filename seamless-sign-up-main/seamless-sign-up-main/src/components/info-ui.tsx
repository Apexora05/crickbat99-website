import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ChevronRight, ArrowRight, type LucideIcon } from "lucide-react";
import {
  SiteHeader,
  SiteFooter,
  SupportFab,
  SupportImageFab,
} from "@/components/site-chrome";

/** Full informational page shell: shared header, hero, content, related, footer + FABs. */
export function InfoPage({
  crumbLabel,
  badge,
  title,
  lead,
  children,
}: {
  crumbLabel: string;
  badge?: string;
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden pb-24 md:pb-0">
      <SiteHeader />

      <section className="relative overflow-hidden px-4 pt-10 pb-8 md:pt-14 md:pb-10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-80 w-full max-w-[46rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl">
          <nav className="flex flex-wrap items-center gap-1 text-xs text-foreground/70" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{crumbLabel}</span>
          </nav>
          {badge && (
            <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-gold">
              {badge}
            </span>
          )}
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-gold md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-foreground/85 md:text-base">{lead}</p>
        </div>
      </section>

      <main className="px-4 pb-16">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">{children}</div>
      </main>

      <SiteFooter />
      <SupportFab />
      <SupportImageFab />
    </div>
  );
}

/** White content card with an H2 heading — matches the site's card-surface sections. */
export function InfoSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
}) {
  return (
    <section className="card-surface p-6 md:p-8">
      <div className="flex items-center gap-3">
        {Icon && (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/20 text-brand-2">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <h2 className="text-xl font-extrabold text-primary md:text-2xl">{title}</h2>
      </div>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
        {children}
      </div>
    </section>
  );
}

/** Sub-heading inside a content card. */
export function InfoSub({ children }: { children: ReactNode }) {
  return <h3 className="mt-5 text-base font-bold text-primary md:text-lg">{children}</h3>;
}

/** Bulleted list styled for white cards. */
export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-2" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** Numbered steps styled like the game "How to play" card. */
export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="mt-3 space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-xs font-bold text-brand-2">
            {i + 1}
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ol>
  );
}

/** Accordion FAQ block — same visual style as the homepage FAQ. */
export function FaqAccordion({
  title = "Frequently Asked Questions",
  items,
}: {
  title?: string;
  items: Array<{ q: string; a: string }>;
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="pt-2">
      <h2 className="text-2xl font-extrabold text-gold md:text-3xl">{title}</h2>
      <div className="mt-5 space-y-3">
        {items.map((f, i) => (
          <div
            key={f.q}
            className="overflow-hidden rounded-2xl border border-gold/15 bg-white/[0.04] backdrop-blur-sm transition-colors hover:border-gold/40"
          >
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-foreground md:text-base"
            >
              {f.q}
              <span className={`text-gold transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>
                +
              </span>
            </button>
            {open === i && (
              <p className="animate-fade-in px-5 pb-5 text-sm text-foreground/80">{f.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/** Grid of related-page cards for internal linking. */
export function RelatedPages({ links }: { links: Array<{ to: string; label: string; desc: string }> }) {
  return (
    <section className="pt-2">
      <h2 className="text-2xl font-extrabold text-gold md:text-3xl">Related Pages</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="group card-surface flex items-start justify-between gap-3 p-5 transition-transform hover:-translate-y-1"
          >
            <span>
              <span className="block text-sm font-bold text-primary">{l.label}</span>
              <span className="mt-1 block text-xs text-muted-foreground">{l.desc}</span>
            </span>
            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gold-2 transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Internal text link to the homepage with a descriptive anchor. */
export function HomeLink({ children }: { children: ReactNode }) {
  return (
    <Link to="/" className="font-semibold text-secondary underline-offset-2 hover:underline">
      {children}
    </Link>
  );
}

/** Internal text link to another route with a descriptive anchor. */
export function RouteLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="font-semibold text-secondary underline-offset-2 hover:underline">
      {children}
    </Link>
  );
}
