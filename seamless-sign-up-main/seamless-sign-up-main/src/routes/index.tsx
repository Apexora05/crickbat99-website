import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  User,
  KeyRound,
  ArrowRight,
  MessageCircle,
  Shield,
  Zap,
  Trophy,
  Wallet,
  Gamepad2,
  Dice5,
  Spade,
  Target,
  Lock,
  BadgeCheck,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { listMyTransactions } from "@/lib/wallet.functions";
import { LOCATIONS } from "@/lib/locations";
import { GAME_LIST } from "@/lib/games";
import { GetIdForm } from "@/components/GetIdForm";
import gpayImg from "@/assets/gpay.png";
import logoAsset from "@/assets/crickbet99-logo.png";
import phonepeImg from "@/assets/phonepe.png";
import paytmImg from "@/assets/paytm.png";
import upiImg from "@/assets/upi.png";
import bhim from "@/assets/bhim.jpeg";
import bankImg from "@/assets/bank.png";
import supportImg from "@/assets/support.webp";

const FAQS = [
  {
    q: "What is Cricbet99?",
    a: "Cricbet99 (also known as cricbet 99 or crickbet99) is India's trusted online cricket betting platform offering instant betting IDs, live IPL betting, competitive odds, and fast UPI deposits & withdrawals for seamless gameplay.",
  },
  {
    q: "How do I get a Cricbet99 ID?",
    a: "Fill the Get ID form with your name, email and phone number. The details open directly on our verified WhatsApp desk and your ID is activated within minutes.",
  },
  {
    q: "How fast are deposits and withdrawals?",
    a: "UPI deposits reflect in your wallet within minutes. Withdrawals are processed the same day via UPI, IMPS or bank transfer.",
  },
  {
    q: "Which games can I play?",
    a: "IPL live betting, cricket exchange, football markets, Teen Patti, Andar Bahar, Roulette and live dealer casino tables — all with a single Cricbet99 ID.",
  },
  {
    q: "Is Cricbet99 safe to use?",
    a: "Yes. All forms are SSL encrypted, your data stays private, and operations run under a Curacao e-Gaming licence with responsible-gaming controls.",
  },
  {
    q: "What is the minimum deposit?",
    a: "You can start with as little as ₹100 and place stakes from ₹50 on selected casino tables.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Cricbet99 | Official Website",
      },
      {
        name: "description",
        content:
          "Cricbet99 official website — explore the platform, available games, features and account information.",
      },
      {
        name: "geo.region",
        content: "IN",
      },
      {
        name: "geo.placename",
        content: "India, Delhi, Mumbai, Dubai UAE",
      },
      {
        name: "geo.position",
        content: "28.6139;77.2090",
      },
      {
        name: "ICBM",
        content: "28.6139, 77.2090",
      },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1",
      },
      {
        property: "og:title",
        content: "Cricbet99 | Official Website",
      },
      {
        property: "og:description",
        content:
          "Cricbet99 official website — explore the platform, available games, features and account information.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: "https://www.crickbat99.online/",
      },
      {
        property: "og:locale",
        content: "en_IN",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Cricbet99 | Official Website",
      },
      {
        name: "twitter:description",
        content:
          "Get your online Cricket Betting ID for live IPL, cricket and football betting on Cricbet99.",
      },
    ],

    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap",
      },
      {
        rel: "canonical",
        href: "/",
      },
    ],

    scripts: [
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-FCL493DCKD",
      },
      {
        children: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FCL493DCKD');
        `.trim(),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Cricbet99",
          alternateName: [
            "Cricbet 99",
            "Crickbet99",
            "Cricbet99 India",
          ],
          url: "/",
          inLanguage: ["en-IN", "hi-IN"],
          potentialAction: {
            "@type": "SearchAction",
            target: "/?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Cricbet99",
          description:
            "Cricbet99 is an online cricket ID provider for IPL betting, cricket exchange and live casino, serving players across India and Dubai (UAE).",
          areaServed: [
            {
              "@type": "Country",
              name: "India",
            },
            {
              "@type": "Country",
              name: "United Arab Emirates",
            },
            {
              "@type": "City",
              name: "Delhi",
            },
            {
              "@type": "City",
              name: "Mumbai",
            },
            {
              "@type": "City",
              name: "Dubai",
            },
          ],
          address: {
            "@type": "PostalAddress",
            addressCountry: "IN",
          },
          telephone: "+91-79706047337",
          openingHours: "Mo-Su 00:00-23:59",
          priceRange: "₹₹",
          sameAs: [
            "https://wa.me/917906047337",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        }),
      },
    ],
  }),

  component: Index,
});
const WHATSAPP_URL =
  "https://wa.me/917906047337?text=Hi%2C%20I%20want%20a%20new%20Cricbet99%20ID";
const WHATSAPP_SUPPORT_URL =
  "https://wa.me/917906047337?text=Hi%2C%20I%20need%20help%20with%20my%20Cricbet99%20account";

const FOOTER_COLS = [
  {
    title: "Quick Links",
    items: ["Get Cricket ID", "Cricbet99 Login", "Register", "Deposit", "Withdraw", "Download App"],
  },
  {
    title: "Popular Markets",
    items: ["IPL Betting", "Cricket Exchange", "Live Odds", "T20 Matches", "ODI Betting", "World Cup Markets"],
  },
  {
    title: "Company",
    items: ["About Cricbet99", "Promotions", "Affiliate Program", "Referral Program", "Blog"],
  },
  {
    title: "Support & Legal",
    items: ["FAQ", "Contact Support", "Live Chat", "Terms & Conditions", "Privacy Policy", "Responsible Gaming"],
  },
];

const WHY_CHOOSE = [
  { icon: Zap, title: "Instant ID in Minutes", text: "Fill the form, our WhatsApp desk activates your Cricbet99 ID within minutes — no paperwork." },
  { icon: Wallet, title: "Fast UPI Deposit & Withdrawal", text: "Google Pay, PhonePe, Paytm, BHIM UPI and bank transfer. Same-day payouts, zero hidden charges." },
  { icon: Trophy, title: "Best Odds on IPL & Cricket", text: "Live exchange rates, session and fancy markets on every IPL, T20, ODI and World Cup game." },
  { icon: Shield, title: "Secure & Encrypted", text: "SSL protected forms, private data, and a verified support desk — your details never leave us." },
  { icon: BadgeCheck, title: "Licensed & Trusted", text: "Curacao e-Gaming licensed operations with responsible-gaming controls built in." },
  { icon: MessageCircle, title: "24×7 Human Support", text: "Real agents on WhatsApp and live chat, in English and Hindi, round the clock." },
];

function Index() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden pb-24 md:pb-0">
      <Header />
      <Hero />
      <Games />
      <WhyChoose />
      <PaymentMethods />
      <Features />
      <Payments />
      <SupportSection />
      <CitiesSection />
      <Faq />
      <FooterCTA />
      <Footer />
      <SupportFab />
      <SupportImageFab />
    </div>
  );
}

function SupportImageFab() {
  const [imageError, setImageError] = useState(false);
  return (
    <a
      href={WHATSAPP_SUPPORT_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="24/7 Customer Support - Contact us on WhatsApp"
      className="fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-3 z-[99999] transition-all duration-300 hover:scale-110 active:scale-95"
    >
      {!imageError ? (
        <img
          src={supportImg}
          alt="24/7 Support"
          className="h-12 w-12 object-contain drop-shadow-[0_8px_25px_rgba(0,0,0,0.5)] sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl shadow-emerald-500/30 md:h-16 md:w-16 lg:h-20 lg:w-20">
          <div className="text-center">
            <MessageCircle className="mx-auto h-6 w-6" />
            <span className="text-[8px] font-bold md:text-[10px]">24/7</span>
          </div>
        </div>
      )}
      <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
      </span>
    </a>
  );
}

function SupportFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Get your Cricbet99 ID on WhatsApp"
      className="group fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] right-3 z-[99999] flex max-w-[60vw] items-center gap-1.5 rounded-full bg-[oklch(0.68_0.17_155)] px-3.5 py-2.5 text-xs font-bold text-white shadow-[0_15px_40px_-10px_oklch(0.5_0.15_155/0.7)] animate-glow transition-transform hover:-translate-y-0.5 sm:text-sm md:bottom-5 md:right-5 md:px-6 md:py-4 md:text-base"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-[oklch(0.68_0.17_155)] opacity-70 blur-md transition-opacity group-hover:opacity-100" />
      <MessageCircle className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
      <span className="truncate whitespace-nowrap">Get ID Now</span>
    </a>
  );
}

function Logo({ className = "h-9 md:h-11" }: { className?: string }) {
  const [logoError, setLogoError] = useState(false);
  if (logoError) {
    return (
      <Link to="/" className="flex items-center" aria-label="Cricbet99 home">
        <span className={`${className} font-extrabold text-gold text-xl`}>Cricbet99</span>
      </Link>
    );
  }
  return (
    <Link to="/" className="flex items-center" aria-label="Cricbet99 home">
      <img
        src={logoAsset}
        alt="Cricbet99 logo"
        className={`${className} w-auto drop-shadow-[0_6px_18px_oklch(0_0_0/0.5)]`}
        onError={() => setLogoError(true)}
      />
    </Link>
  );
}

function useSession() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setSignedIn(!!data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setSignedIn(!!session);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);
  return signedIn;
}

function Header() {
  const [open, setOpen] = useState(false);
  const signedIn = useSession();
  const links = [
    { label: "Games", href: "#games" },
    { label: "Wallet", href: signedIn ? "/wallet" : "/auth", route: true },
    { label: "Why Us", href: "#why" },
    { label: "Payments", href: "#payments" },
    { label: "FAQ", href: "#faq" },
  ];
  return (
    <header
      id="top"
      className="sticky top-0 z-50 border-b border-border/40 bg-brand-2/90 backdrop-blur-md"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-2.5 sm:px-4 md:px-8 md:py-3">
        <div className="flex min-w-0 items-center">
          <Logo className="h-8 sm:h-9 md:h-11" />
        </div>
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) =>
            l.route ? (
              <Link key={l.label} to={l.href} className="text-sm font-semibold text-foreground/90 hover:text-gold">
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} className="text-sm font-semibold text-foreground/90 hover:text-gold">
                {l.label}
              </a>
            ),
          )}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          {signedIn ? (
            <Link to="/wallet" className="btn-gold hidden rounded-full px-5 py-2 text-sm md:inline-flex">
              Wallet
            </Link>
          ) : (
            <Link to="/auth" className="btn-gold hidden rounded-full px-5 py-2 text-sm md:inline-flex">
              Login
            </Link>
          )}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp hidden rounded-full px-5 py-2 text-sm md:inline-flex"
          >
            Sign Up
          </a>
          <button
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border/50 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border/40 bg-brand-2 px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) =>
              l.route ? (
                <Link key={l.label} to={l.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-2 text-sm font-semibold text-foreground/90 hover:bg-foreground/5 hover:text-gold">
                  {l.label}
                </Link>
              ) : (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-2 text-sm font-semibold text-foreground/90 hover:bg-foreground/5 hover:text-gold">
                  {l.label}
                </a>
              ),
            )}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border/30 pt-3 md:hidden">
            <Link
              to={signedIn ? "/wallet" : "/auth"}
              onClick={() => setOpen(false)}
              className="btn-gold rounded-full px-4 py-2.5 text-center text-sm"
            >
              {signedIn ? "Wallet" : "Login"}
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="btn-whatsapp rounded-full px-4 py-2.5 text-center text-sm"
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const navigate = useNavigate();
  const signedIn = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate({ to: "/wallet" });
  }
  return (
    <section id="login" className="relative overflow-hidden px-4 pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-96 w-full max-w-[46rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />
      </div>
      <div className="mx-auto max-w-xl">
        <div className="mb-8 text-center animate-fade-in">
          {!logoError ? (
            <img
              src={logoAsset}
              alt="Cricbet99 — online cricket ID and IPL betting"
              className="mx-auto h-14 w-auto md:h-20"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="text-2xl font-extrabold text-gold">Cricbet99</span>
          )}
          <p className="mt-3 text-sm text-foreground/85 whitespace-pre-line">
            India&rsquo;s trusted cricket ID — IPL, casino & instant UPI.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-4 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm"
          >
            <MessageCircle className="h-5 w-5" />
            Send to WhatsApp &amp; Get My ID
          </a>
        </div>
        <div className="card-surface relative overflow-hidden p-6 md:p-9 animate-scale-in">
          {signedIn ? (
            <div className="text-center">
              <h2 className="text-2xl font-extrabold text-primary">You&rsquo;re signed in</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Head to your wallet to deposit, withdraw or check status.
              </p>
              <Link
                to="/wallet"
                className="btn-gold mt-6 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm"
              >
                Open wallet <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-center text-2xl font-extrabold tracking-tight text-primary md:text-3xl whitespace-pre-line">
                Cricbet99 LOGIN
              </h1>
              <p className="mt-1 text-center text-sm text-muted-foreground whitespace-pre-line">
                Enter your credentials to access your account
              </p>
              <form className="mt-6 space-y-3" onSubmit={handleLogin}>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="User Name / Email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-input bg-muted/60 px-4 py-3.5 pr-10 text-sm text-primary outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
                  />
                  <User className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="Password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-input bg-muted/60 px-4 py-3.5 pr-10 text-sm text-primary outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
                  />
                  <KeyRound className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <Link to="/auth" className="text-xs font-bold text-secondary hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                {error && <p className="text-center text-xs text-destructive">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-between rounded-xl bg-primary px-5 py-4 text-base font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 disabled:opacity-60"
                >
                  <span>{loading ? "Signing in…" : "Login"}</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex w-full items-center justify-between rounded-xl bg-primary px-5 py-4 text-base font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  <span>Login with Demo ID</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </form>
              <div className="my-7 flex items-center gap-3">
                <span className="h-px flex-1 bg-border/30" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  New here? Get your ID
                </span>
                <span className="h-px flex-1 bg-border/30" />
              </div>
              <GetIdForm />
              <div className="mt-6 border-t border-border/30 pt-4 text-center">
                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-bold text-secondary">
                  <span>Responsible Gaming</span>
                  <span className="text-muted-foreground">|</span>
                  <span>Terms &amp; Conditions</span>
                  <span className="text-muted-foreground">|</span>
                  <span>Privacy Policy</span>
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  SSL Encrypted &nbsp;|&nbsp; 18+ Only &nbsp;|&nbsp; Play Responsibly
                </p>
              </div>
            </>
          )}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold text-foreground/85">
          <TrustPill>🔒 SSL Encrypted</TrustPill>
          <TrustPill>⚡ 5-min Setup</TrustPill>
          <TrustPill>💸 Instant UPI</TrustPill>
          <TrustPill>🕐 24×7 Support</TrustPill>
        </div>
      </div>
    </section>
  );
}

function TrustPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border/40 bg-brand-2/70 px-3 py-1 backdrop-blur-sm">
      {children}
    </span>
  );
}

const ICONS: Record<string, LucideIcon> = {
  trophy: Trophy,
  target: Target,
  spade: Spade,
  dice: Dice5,
  gamepad: Gamepad2,
  zap: Zap,
};

function Games() {
  return (
    <section id="games" className="bg-brand-2/50 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-gold md:text-4xl">
            Most Played Games on Cricbet99
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-foreground/80">
            Explore live IPL betting, exchange cricket markets and premium casino games —
            all available with your Cricbet99 ID.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GAME_LIST.map((g, i) => (
            <div
              key={g.slug}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gold/15 bg-[oklch(0.18_0.03_60)] p-4 text-center shadow-[0_25px_60px_-25px_oklch(0_0_0/0.8)] transition-all duration-500 hover:-translate-y-2 hover:border-gold/50"
            >
              <div
                className="pay-tile mx-auto aspect-square w-28 animate-float"
                style={{ animationDelay: `${(i % 6) * 0.2}s` }}
              >
                <img
                  src={g.image}
                  alt={`${g.title} — ${g.tag} on Cricbet99`}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-gold">{g.title}</h3>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-foreground/60">
                {g.tag}
              </p>
              <p className="mt-2 flex-1 text-sm text-foreground/80">{g.tagline}</p>
              <Link
                to="/games/$slug"
                params={{ slug: g.slug }}
                className="btn-gold mt-4 block rounded-full px-5 py-2.5 text-sm transition-transform hover:-translate-y-0.5"
              >
                Play Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PaymentMethods() {
  const methods = [
    { name: "Google Pay", img: gpayImg },
    { name: "PhonePe", img: phonepeImg },
    { name: "Paytm", img: paytmImg },
    { name: "BHIM", img: bhim },
    { name: "UPI Transfer", img: upiImg },
    { name: "Bank Transfer", img: bankImg },
  ];
  return (
    <section id="payment-methods" className="relative overflow-hidden px-4 py-12 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div className="absolute left-1/2 top-8 h-64 w-full max-w-[36rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-gold">
            <Lock className="h-3.5 w-3.5" /> 256-bit SSL Encrypted
          </span>
          <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
            We Accept <span className="logo-text">Secure Payments</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-foreground/80">
            Cricbet99 supports fast and secure INR transactions with India&rsquo;s most trusted
            UPI and banking apps. Enjoy instant deposits and smooth withdrawals without any delays.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-6">
          {methods.map((m, i) => (
            <div key={m.name} className="group flex flex-col items-center gap-3">
              <div
                className="pay-tile aspect-square w-full animate-float"
                style={{ animationDelay: `${i * 0.25}s` }}
              >
                <img
                  src={m.img}
                  alt={`${m.name} logo — accepted on Cricbet99`}
                  loading="lazy"
                  className="h-full w-full object-contain drop-shadow-[0_8px_16px_oklch(0_0_0/0.25)] transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="text-center">
                <div className="text-sm font-extrabold text-foreground">{m.name}</div>
                <div className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-semibold text-gold/90">
                  <BadgeCheck className="h-3 w-3" /> Verified
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-foreground/80">
          <span className="rounded-full border border-border/40 bg-brand-2/70 px-3 py-1 backdrop-blur-sm">🔒 PCI-DSS Compliant</span>
          <span className="rounded-full border border-border/40 bg-brand-2/70 px-3 py-1 backdrop-blur-sm">⚡ Instant Settlement</span>
          <span className="rounded-full border border-border/40 bg-brand-2/70 px-3 py-1 backdrop-blur-sm">🛡️ Zero Hidden Fees</span>
          <span className="rounded-full border border-border/40 bg-brand-2/70 px-3 py-1 backdrop-blur-sm">🇮🇳 INR Accepted</span>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Zap, title: "Instant UPI Deposits", body: "Deposit using UPI, PhonePe, GPay or IMPS — funds reflect in your account within minutes." },
    { icon: Shield, title: "Secure & Reliable", body: "Encrypted transactions, OTP-based login, and protected servers keep your account safe." },
    { icon: MessageCircle, title: "WhatsApp Support 24/7", body: "Get a new ID or help with your account instantly on WhatsApp, any time of day." },
    { icon: Trophy, title: "Live Exchange Odds", body: "Back & lay markets, session bets, and real-time ball-by-ball odds updates." },
    { icon: Wallet, title: "Fast Withdrawals", body: "Same-day payouts through a safe, structured verification process. No hidden charges." },
    { icon: Gamepad2, title: "Casino & Card Games", body: "Teen Patti, Andar Bahar, Roulette and live dealer tables — all in one place." },
  ];
  return (
    <section id="features" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Why Choose <span className="logo-text">Cricbet99</span>
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} className="card-surface p-6">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gold/20 text-brand-2">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-primary">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800 border-amber-300",
    processing: "bg-blue-100 text-blue-800 border-blue-300",
    completed: "bg-emerald-100 text-emerald-800 border-emerald-300",
    failed: "bg-rose-100 text-rose-800 border-rose-300",
  };
  return `inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold capitalize ${map[status] ?? "bg-neutral-100 text-neutral-800 border-neutral-300"}`;
}

function Payments() {
  const signedIn = useSession();
  const { data: txns = [] } = useQuery({
    queryKey: ["transactions", "recent"],
    queryFn: () => listMyTransactions(),
    enabled: !!signedIn,
    refetchInterval: signedIn ? 15000 : false,
  });
  const staticRows: Array<[string, string, string, string]> = [
    ["UPI (GPay, PhonePe)", "Instant", "5–15 Minutes", "₹100"],
    ["Paytm Wallet", "Instant", "10–30 Minutes", "₹200"],
    ["Bank Transfer", "1–5 Minutes", "1–24 Hours", "₹500"],
    ["Crypto", "Instant", "15–60 Minutes", "₹1000"],
  ];
  return (
    <section id="payments" className="bg-brand-2/50 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            {signedIn ? (
              <>Your Recent <span className="logo-text">Transactions</span></>
            ) : (
              <>Fast & Secure <span className="logo-text">Deposits</span></>
            )}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-foreground/80">
            {signedIn
              ? "Live status of your deposits and withdrawals — auto-refreshing every 15 seconds."
              : "Zero hidden charges, full INR support, and 24/7 processing — even during IPL rush hours."}
          </p>
        </div>
        <div className="card-surface overflow-hidden">
          <div className="overflow-x-auto">
            {signedIn && txns.length > 0 ? (
              <table className="w-full text-left text-sm">
                <thead className="bg-brand-2 text-foreground">
                  <tr>
                    <th className="px-5 py-3 font-bold">Method</th>
                    <th className="px-5 py-3 font-bold">Type</th>
                    <th className="px-5 py-3 font-bold">Amount</th>
                    <th className="px-5 py-3 font-bold">Status</th>
                    <th className="px-5 py-3 font-bold">When</th>
                  </tr>
                </thead>
                <tbody className="text-primary">
                  {txns.slice(0, 8).map((t) => (
                    <tr key={t.id} className="border-t border-border/20">
                      <td className="px-5 py-3">{t.method}</td>
                      <td className="px-5 py-3 capitalize">{t.type}</td>
                      <td className="px-5 py-3 font-semibold">₹{t.amount_inr.toLocaleString("en-IN")}</td>
                      <td className="px-5 py-3">
                        <span className={statusBadge(t.status)}>{t.status}</span>
                      </td>
                      <td className="px-5 py-3 text-xs text-muted-foreground">
                        {new Date(t.created_at).toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="bg-brand-2 text-foreground">
                  <tr>
                    <th className="px-5 py-3 font-bold">Payment Method</th>
                    <th className="px-5 py-3 font-bold">Deposit Speed</th>
                    <th className="px-5 py-3 font-bold">Withdrawal Speed</th>
                    <th className="px-5 py-3 font-bold">Minimum</th>
                  </tr>
                </thead>
                <tbody className="text-primary">
                  {staticRows.map((r) => (
                    <tr key={r[0]} className="border-t border-border/20">
                      {r.map((c, i) => (
                        <td key={i} className="px-5 py-3">{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {signedIn && (
          <div className="mt-4 text-center">
            <Link to="/wallet" className="text-sm font-semibold text-secondary hover:underline">
              Open wallet →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function FooterCTA() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[1.1fr_1fr]">
        <div className="card-surface p-8 md:p-10">
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
            Free Registration
          </span>
          <h3 className="mt-3 text-2xl font-extrabold text-primary md:text-3xl">
            Ready to get your <span className="logo-text">Cricbet99 ID</span>?
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Trusted by thousands across India &amp; Dubai. Fill the form — one of our agents will
            activate your ID on WhatsApp in minutes.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-primary">
            <li>✅ Instant activation, no waiting</li>
            <li>✅ Encrypted &amp; verified WhatsApp desk</li>
            <li>✅ Same-day withdrawals via UPI / IMPS</li>
          </ul>
          <div className="mt-6">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm"
            >
              <MessageCircle className="h-5 w-5" />
              Chat directly on WhatsApp
            </a>
          </div>
        </div>
        <div className="card-surface p-6 md:p-8">
          <h4 className="text-lg font-extrabold text-primary">Send your details</h4>
          <p className="mt-1 text-xs text-muted-foreground">Name, email &amp; number are sent securely to WhatsApp.</p>
          <div className="mt-4">
            <GetIdForm compact />
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section id="why" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-gold md:text-4xl">Why Choose Cricbet99</h2>
          <p className="mx-auto mt-3 max-w-2xl text-foreground/80">
            India&rsquo;s trusted online cricket betting platform — instant IDs, live IPL markets,
            competitive odds and lightning-fast UPI payments.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-gold/15 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1.5 hover:border-gold/50 hover:bg-white/[0.07]"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.92_0.18_92)] to-[oklch(0.76_0.19_70)] text-[oklch(0.25_0.04_60)] shadow-[var(--shadow-gold)] transition-transform group-hover:scale-110">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-foreground/75">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportSection() {
  return (
    <section id="support" className="px-4 py-16 md:py-20">
      <div className="mx-auto max-w-5xl rounded-3xl border border-gold/20 bg-white/[0.05] p-8 text-center backdrop-blur-sm md:p-12">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[oklch(0.68_0.17_155)] text-white animate-glow">
          <MessageCircle className="h-7 w-7" />
        </div>
        <h2 className="mt-5 text-3xl font-extrabold text-gold md:text-4xl">24×7 Support Desk</h2>
        <p className="mx-auto mt-3 max-w-2xl text-foreground/80">
          Stuck on a deposit, withdrawal or login? Our agents reply on WhatsApp within minutes —
          every day, all day, in English and Hindi.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm"
          >
            <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
          </a>
          <a href="#login" className="btn-gold inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm">
            Get Cricket ID <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function CitiesSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <h2 className="text-center text-xl font-extrabold md:text-3xl">
        Online Cricket ID <span className="text-primary">Near You</span>
      </h2>
      <p className="mx-auto mt-2 max-w-2xl text-center text-xs text-muted-foreground md:text-sm">
        Cricbet99 city wise cricket betting ID — India ke top sheher aur Dubai / UAE me instant
        WhatsApp ID, local language support aur UPI deposit.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {LOCATIONS.map((l) => (
          <Link
            key={l.slug}
            to="/online-cricket-id/$city"
            params={{ city: l.slug }}
            className="rounded-full border border-border/60 px-3 py-1.5 text-[11px] font-semibold transition hover:border-primary/70 hover:text-primary md:text-xs"
          >
            Cricket ID in {l.city}
          </Link>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link to="/online-cricket-id" className="btn-gold inline-flex rounded-xl px-5 py-2.5 text-sm font-bold">
          View all cities
        </Link>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-extrabold text-gold md:text-4xl">
          Cricbet99 Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-foreground/80">
          Everything about IDs, payments, markets and support.
        </p>
        <div className="mt-8 space-y-3">
          {FAQS.map((f, i) => (
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
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-brand-2 px-4 pt-14 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo className="h-10 md:h-12" />
            <p className="mt-4 max-w-sm text-sm text-foreground/75">
              Cricbet99 (also known as crickbet 99 or cricbet99) is India&rsquo;s trusted online
              cricket betting platform offering instant betting IDs, live IPL betting, competitive
              odds, and fast UPI deposits &amp; withdrawals for seamless gameplay.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
              {["Facebook", "Instagram", "Twitter", "YouTube"].map((s) => (
                <a
                  key={s}
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-gold/25 px-3 py-1.5 text-foreground/80 transition-colors hover:border-gold hover:text-gold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-gold">{col.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-foreground/75">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#login" className="transition-colors hover:text-gold">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-4 border-t border-gold/15 pt-6 text-xs text-foreground/70 md:grid-cols-2">
          <div>
            <p className="font-bold text-gold">18+ Only</p>
            <p className="mt-1">
              Licensed &amp; Authorized: Curacao e-Gaming License #OGL/2026/0456/1234
            </p>
            <p className="mt-1">
              502, Prestige Meridian, 2nd Floor, MG Road, Bengaluru, Karnataka 560001, India.
            </p>
          </div>
          <p className="md:text-right">
            Disclaimer: Cricbet99 is strictly for users aged 18+. Online betting laws vary by state
            in India. Please check your local regulations before participating. Bet responsibly.
            CricBet99 promotes responsible gaming practices and advises users to participate only
            where such activities are legally permitted.
          </p>
        </div>
        <p className="mt-6 text-center text-xs text-foreground/60">
          © 2026 CricBet99 iGaming Pvt. Ltd. | All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
