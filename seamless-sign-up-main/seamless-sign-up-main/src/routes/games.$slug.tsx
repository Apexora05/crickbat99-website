import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  MessageCircle,
  Trophy,
  Target,
  Spade,
  Dice5,
  Gamepad2,
  Zap,
  ChevronLeft,
  type LucideIcon,
} from "lucide-react";
import { GAMES, GAME_LIST, type GameSlug } from "@/lib/games";

const WHATSAPP_NUMBER = "917906047337";

function whatsappUrlFor(gameTitle: string) {
  const msg = `Hi, I want a Cricbet99 ID to play ${gameTitle}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const ICONS: Record<string, LucideIcon> = {
  trophy: Trophy,
  target: Target,
  spade: Spade,
  dice: Dice5,
  gamepad: Gamepad2,
  zap: Zap,
};

export const Route = createFileRoute("/games/$slug")({
  loader: ({ params }) => {
    const game = GAMES[params.slug as GameSlug];
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Game not found — Cricbet99" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { game } = loaderData;
    const title = `${game.title} on Cricbet99 — Online ID for India & Dubai`;
    const desc = `${game.description} Get your Cricbet99 (cricbet 99) ID on WhatsApp in minutes — trusted by players across India and Dubai (UAE).`;
    const path = `/games/${params.slug}`;
    const canonicalUrl = `https://www.crickbat99.online${path}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: `cricbet99 ${game.title.toLowerCase()}, cricbet99, cricbet 99, crickbet99, ${game.title}, ${game.tag} online, online cricket id india, betting id dubai, ${game.title.toLowerCase()} id whatsapp` },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonicalUrl },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: game.title,
            description: game.description,
            url: canonicalUrl,
            image: game.image,
            category: game.tag,
            brand: { "@type": "Brand", name: "Cricbet99" },
            offers: {
              "@type": "Offer",
              price: game.minStake.replace(/[^0-9]/g, ""),
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              areaServed: ["IN", "AE"],
            },
          }),
        },
      ],
    };
  },
  component: GamePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-extrabold">Game not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This game isn&rsquo;t on Cricbet99 yet.
      </p>
      <Link
        to="/"
        className="btn-gold mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm"
      >
        <ChevronLeft className="h-4 w-4" /> Back to home
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div role="alert" className="mx-auto max-w-xl px-4 py-24 text-center text-sm text-destructive">
      {error.message}
    </div>
  ),
});

function GamePage() {
  const { game } = Route.useLoaderData();
  const Icon = ICONS[game.icon] ?? Trophy;
  const related = GAME_LIST.filter((g) => g.slug !== game.slug).slice(0, 3);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/40 bg-brand-2/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-gold text-primary font-black shadow-[var(--shadow-gold)]">
              C
            </div>
            <span className="logo-text text-2xl md:text-3xl">CRICBET99</span>
          </Link>
          <Link to="/" className="text-sm font-semibold text-foreground/80 hover:text-gold">
            <ChevronLeft className="mr-1 inline h-4 w-4" />
            All games
          </Link>
        </div>
      </header>

      <section className="px-4 pt-12 pb-10 md:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-gold/20 text-brand-2">
            <Icon className="h-10 w-10" />
          </div>
          <span className="mt-4 inline-block rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
            {game.tag}
          </span>
          <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">
            <span className="logo-text">{game.title}</span>
          </h1>
          <p className="mt-3 text-lg text-foreground/85">{game.tagline}</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-foreground/70">{game.description}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappUrlFor(game.title)}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm"
            >
              <MessageCircle className="h-5 w-5" /> Get ID on WhatsApp
            </a>
            <Link
              to="/wallet"
              className="btn-gold inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm"
            >
              Deposit to play
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-2/50 px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="card-surface p-6 md:p-8">
            <h2 className="text-xl font-bold text-primary">How to play</h2>
            <ol className="mt-4 space-y-3">
              {game.howToPlay.map((step: string, i: number) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-xs font-bold text-brand-2">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-border/30 pt-4 text-xs text-muted-foreground">
              Minimum stake: <span className="font-semibold text-primary">{game.minStake}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h3 className="mb-6 text-center text-2xl font-extrabold">
            Other <span className="logo-text">Games</span>
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.map((g) => {
              const RIcon = ICONS[g.icon] ?? Trophy;
              return (
                <Link
                  key={g.slug}
                  to="/games/$slug"
                  params={{ slug: g.slug }}
                  className="group card-surface flex items-center gap-4 p-5 transition-transform hover:-translate-y-1"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold/20 text-brand-2 transition-colors group-hover:bg-gold">
                    <RIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary">{g.title}</div>
                    <div className="text-xs text-muted-foreground">{g.tag}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/30 bg-brand-2 px-4 py-6 text-center text-xs text-foreground/70">
        © 2026 Cricbet99. 18+ Only. Play Responsibly.
      </footer>
    </div>
  );
}
