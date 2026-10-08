import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ChevronLeft,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Zap,
  Wallet,
  Clock,
} from "lucide-react";
import { LOCATION_MAP, LOCATIONS, locationKeywords } from "@/lib/locations";
import { GAME_LIST } from "@/lib/games";

const WHATSAPP_NUMBER = "917906047337";

export const Route = createFileRoute("/online-cricket-id/$city")({
  loader: ({ params }) => {
    const location = LOCATION_MAP[params.city];
    if (!location) throw notFound();
    return { location };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "City not found — Cricbet99" }, { name: "robots", content: "noindex" }] };
    }
    const l = loaderData.location;
    const path = `/online-cricket-id/${params.city}`;
    const title = `Online Cricket ID in ${l.city} — Cricbet99 IPL & Casino Betting ID`;
    const desc = `Cricbet99 (cricbet 99) online cricket betting ID in ${l.city}, ${l.region}. Instant WhatsApp ID, UPI deposit & withdrawal, IPL live betting, Teen Patti & casino. 24×7 support in ${l.language}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: locationKeywords(l) },
        { name: "geo.region", content: l.countryCode === "IN" ? `IN-${l.city.slice(0, 2).toUpperCase()}` : "AE" },
        { name: "geo.placename", content: `${l.city}, ${l.region}, ${l.country}` },
        { name: "geo.position", content: `${l.lat};${l.lng}` },
        { name: "ICBM", content: `${l.lat}, ${l.lng}` },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: path },
        { property: "og:locale", content: l.countryCode === "IN" ? "en_IN" : "en_AE" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: path }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `Cricbet99 ${l.city}`,
            alternateName: ["cricbet 99", "crickbet99", "cricbet99 ind"],
            description: desc,
            url: path,
            areaServed: { "@type": "City", name: l.city },
            address: {
              "@type": "PostalAddress",
              addressLocality: l.city,
              addressRegion: l.region,
              addressCountry: l.countryCode,
            },
            geo: { "@type": "GeoCoordinates", latitude: l.lat, longitude: l.lng },
            openingHours: "Mo-Su 00:00-23:59",
            telephone: `+${WHATSAPP_NUMBER}`,
            priceRange: "₹100+",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Online Cricket ID", item: "/online-cricket-id" },
              { "@type": "ListItem", position: 3, name: l.city, item: path },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `How to get an online cricket ID in ${l.city}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Send your name, email and mobile number to the Cricbet99 WhatsApp desk (+91 79060 47337). Your ${l.city} cricket ID is activated within 2–5 minutes, 24×7.`,
                },
              },
              {
                "@type": "Question",
                name: `Is Cricbet99 available in ${l.city}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Yes. Cricbet99 serves players across ${l.city}, ${l.region} and the rest of ${l.country} with local ${l.language} support.`,
                },
              },
              {
                "@type": "Question",
                name: `What is the minimum deposit for ${l.city} players?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Deposits start from ₹100 via UPI, Google Pay, PhonePe, Paytm or bank transfer, with withdrawals processed in minutes.`,
                },
              },
            ],
          }),
        },
      ],
    };
  },
  component: CityPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-extrabold">City not covered yet</h1>
      <Link to="/online-cricket-id" className="btn-gold mt-6 inline-flex rounded-lg px-5 py-2 text-sm">
        See all cities
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div role="alert" className="mx-auto max-w-xl px-4 py-24 text-center text-sm text-destructive">
      {error.message}
    </div>
  ),
});

function CityPage() {
  const { location: l } = Route.useLoaderData();
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I want a Cricbet99 online cricket ID in ${l.city}.`,
  )}`;
  const nearby = LOCATIONS.filter((x) => x.slug !== l.slug && x.countryCode === l.countryCode).slice(0, 8);

  const usps = [
    { icon: Zap, t: `2-minute ID in ${l.city}`, d: "WhatsApp par details bhejo, ID turant active." },
    { icon: Wallet, t: "Instant UPI deposit", d: "GPay, PhonePe, Paytm, bank transfer — ₹100 se start." },
    { icon: ShieldCheck, t: "100% safe & private", d: "SSL encrypted, details sirf verified desk tak." },
    { icon: Clock, t: `24×7 ${l.language} support`, d: "Din ho ya raat, local language me help." },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-16">
        <nav className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            <ChevronLeft className="mr-1 inline h-3 w-3" />Home
          </Link>
          <span>/</span>
          <Link to="/online-cricket-id" className="hover:text-foreground">Online Cricket ID</Link>
          <span>/</span>
          <span className="text-foreground">{l.city}</span>
        </nav>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/40 px-3 py-1 text-[11px] font-semibold text-primary">
          <MapPin className="h-3 w-3" /> {l.city}, {l.region} — {l.country}
        </div>

        <h1 className="mt-4 text-2xl font-extrabold leading-tight md:text-4xl">
          Online Cricket ID in {l.city} — <span className="text-primary">Cricbet99</span>
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground md:text-base">
          {l.blurb} Cricbet99 (cricbet 99 / crickbet99) {l.city} ke players ko IPL live betting,
          cricket exchange, Teen Patti, Andar Bahar aur live casino ek hi ID par deta hai — instant
          UPI deposit aur minutes me withdrawal ke saath.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-whatsapp inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold">
            <MessageCircle className="h-4 w-4" /> Get {l.city} ID on WhatsApp
          </a>
          <Link to="/" className="btn-gold inline-flex items-center rounded-xl px-5 py-3 text-sm font-bold">
            Login / Sign Up
          </Link>
        </div>

        <section className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map((u) => (
            <div key={u.t} className="card-surface rounded-xl border border-border/50 p-4">
              <u.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-2 text-sm font-bold">{u.t}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{u.d}</p>
            </div>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-bold md:text-xl">Popular markets for {l.city} players</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {GAME_LIST.map((g) => (
              <Link
                key={g.slug}
                to="/games/$slug"
                params={{ slug: g.slug }}
                className="card-surface rounded-xl border border-border/50 p-3 text-center transition hover:border-primary/60"
              >
                <img src={g.image} alt={`${g.title} online in ${l.city}`} className="mx-auto h-14 w-14 object-contain" loading="lazy" />
                <span className="mt-2 block truncate text-xs font-semibold">{g.title}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="text-lg font-bold md:text-xl">
            How to get your Cricbet99 ID in {l.city}
          </h2>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li><strong className="text-foreground">1.</strong> WhatsApp par apna naam, email aur {l.city} mobile number bhejo.</li>
            <li><strong className="text-foreground">2.</strong> Desk 2–5 minute me ID aur password activate karta hai.</li>
            <li><strong className="text-foreground">3.</strong> UPI (GPay / PhonePe / Paytm) se ₹100+ deposit karo.</li>
            <li><strong className="text-foreground">4.</strong> IPL, cricket, casino markets par khelo — withdrawal minutes me.</li>
          </ol>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="text-lg font-bold md:text-xl">FAQs — cricket ID in {l.city}</h2>
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <h3 className="font-semibold">Kya Cricbet99 {l.city} me available hai?</h3>
              <p className="mt-1 text-muted-foreground">Haan — {l.city}, {l.region} aur poore {l.country} me players ko {l.language} support ke saath service milti hai.</p>
            </div>
            <div>
              <h3 className="font-semibold">{l.city} me ID banane me kitna time lagta hai?</h3>
              <p className="mt-1 text-muted-foreground">Sirf 2–5 minute. WhatsApp desk 24×7 open hai.</p>
            </div>
            <div>
              <h3 className="font-semibold">Minimum deposit kitna hai?</h3>
              <p className="mt-1 text-muted-foreground">₹100 se shuru — UPI, Google Pay, PhonePe, Paytm ya bank transfer.</p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-bold md:text-xl">Cricket ID in nearby cities</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {nearby.map((n) => (
              <Link
                key={n.slug}
                to="/online-cricket-id/$city"
                params={{ city: n.slug }}
                className="rounded-full border border-border/60 px-3 py-1 text-xs hover:border-primary/60 hover:text-primary"
              >
                {n.city}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
