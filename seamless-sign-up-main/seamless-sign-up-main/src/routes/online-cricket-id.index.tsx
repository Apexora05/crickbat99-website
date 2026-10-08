import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, MessageCircle, ChevronLeft } from "lucide-react";
import { LOCATIONS } from "@/lib/locations";

const WHATSAPP_NUMBER = "917906047337";
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi, I want a Cricbet99 online cricket ID.",
)}`;

const TITLE = "Online Cricket ID Near You — Cricbet99 City Wise ID (India & UAE)";
const DESC =
  "Cricbet99 (cricbet 99 / crickbet99) online cricket betting ID city wise — Mumbai, Delhi, Kolkata, Chennai, Jaipur, Lucknow, Dubai, Sharjah aur 20+ cities. Instant WhatsApp ID, UPI deposit & withdrawal.";

export const Route = createFileRoute("/online-cricket-id/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "cricbet99, cricbet 99, crickbet99, cricbet99 ind, cricbet99.ac, online cricket id, cricket id near me, city wise betting id, ipl betting id india, online betting id dubai, cricket id whatsapp",
      },
      { name: "geo.region", content: "IN" },
      { name: "geo.placename", content: "India, Dubai UAE" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/online-cricket-id" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/online-cricket-id" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Cricbet99 online cricket ID cities",
          itemListElement: LOCATIONS.map((l, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `Online Cricket ID in ${l.city}`,
            url: `/online-cricket-id/${l.slug}`,
          })),
        }),
      },
    ],
  }),
  component: LocationsHub,
});

function LocationsHub() {
  const india = LOCATIONS.filter((l) => l.countryCode === "IN");
  const uae = LOCATIONS.filter((l) => l.countryCode === "AE");

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Back to home
        </Link>

        <h1 className="mt-5 text-2xl font-extrabold leading-tight md:text-4xl">
          Cricbet99 Online Cricket ID — <span className="text-primary">City Wise</span>
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground md:text-base">
          Cricbet99 (also searched as cricbet 99, crickbet99, cricbet99 ind) India ke 20+ sheharon
          aur UAE me online cricket ID deta hai. Apna city choose karo — local rates, local language
          support, instant UPI deposit aur 24×7 WhatsApp desk.
        </p>

        <CityGrid title="India" items={india} />
        <CityGrid title="UAE / Middle East" items={uae} />

        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp mt-10 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold"
        >
          <MessageCircle className="h-4 w-4" /> Get My ID on WhatsApp
        </a>
      </div>
    </div>
  );
}

function CityGrid({ title, items }: { title: string; items: typeof LOCATIONS }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold md:text-xl">{title}</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((l) => (
          <Link
            key={l.slug}
            to="/online-cricket-id/$city"
            params={{ city: l.slug }}
            className="card-surface group rounded-xl border border-border/50 p-3 transition hover:border-primary/60"
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <span className="truncate text-sm font-semibold">{l.city}</span>
            </div>
            <p className="mt-1 truncate text-[11px] text-muted-foreground">
              Cricket ID in {l.city}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
