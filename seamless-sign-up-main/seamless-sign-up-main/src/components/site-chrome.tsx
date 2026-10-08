import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logoAsset from "@/assets/crickbet99-logo.png";
import supportImg from "@/assets/support.webp";

export const WHATSAPP_URL =
  "https://wa.me/917906047337?text=Hi%2C%20I%20want%20a%20new%20Cricbet99%20ID";
export const WHATSAPP_SUPPORT_URL =
  "https://wa.me/917906047337?text=Hi%2C%20I%20need%20help%20with%20my%20Cricbet99%20account";

export const FOOTER_COLS = [
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

export const INFO_LINKS: Array<{ label: string; to: string }> = [
  { label: "About Us", to: "/about-us" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Cricket Guide", to: "/cricket-guide" },
  { label: "Football Guide", to: "/football-guide" },
  { label: "Teen Patti Guide", to: "/teen-patti-guide" },
  { label: "Login Help", to: "/login-help" },
  { label: "Wallet Guide", to: "/wallet-guide" },
  { label: "Responsible Play", to: "/responsible-play" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact & Support", to: "/contact-us" },
];

export function Logo({ className = "h-9 md:h-11" }: { className?: string }) {
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

export function useSession() {
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

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const signedIn = useSession();
  const links = [
    { label: "Games", href: "/#games" },
    { label: "Wallet", href: signedIn ? "/wallet" : "/auth", route: true },
    { label: "Why Us", href: "/#why" },
    { label: "Payments", href: "/#payments" },
    { label: "FAQ", href: "/#faq" },
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

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/20 bg-brand-2 px-4 pt-14 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
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
                    <a href="/#login" className="transition-colors hover:text-gold">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-gold">Information / Guides</h3>
            <ul className="mt-3 space-y-2 text-sm text-foreground/75">
              {INFO_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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

export function SupportFab() {
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

export function SupportImageFab() {
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
