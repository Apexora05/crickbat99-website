import { createFileRoute } from "@tanstack/react-router";
import {
  InfoPage,
  FaqAccordion,
  RelatedPages,
  HomeLink,
} from "@/components/info-ui";
import { pageHead, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

const TITLE = "Cricbet99 FAQ | Frequently Asked Questions";
const DESC =
  "Find answers to common questions about the Cricbet99 website, account access, navigation, games, transactions and technical support.";

const NAV_FAQS = [
  {
    q: "Where do I start on the website?",
    a: "The homepage is the main hub. From there you can reach the login form, the games grid, the payment and support sections, and the city-wise online cricket ID directory.",
  },
  {
    q: "How do I move between sections?",
    a: "Use the header links to jump to homepage sections, and the footer — including the Information / Guides column — to open full pages such as the guides, FAQ and city directory.",
  },
  {
    q: "Do the information pages require an account?",
    a: "No. The guides, this FAQ and the responsible-play page are open to everyone. Only the wallet area needs you to be signed in.",
  },
];

const ACCOUNT_FAQS = [
  {
    q: "How do I sign in?",
    a: "Enter the username or email registered to your account, along with your password, in the login form on the homepage.",
  },
  {
    q: "The login says my details are incorrect — what now?",
    a: "Re-type your details carefully, check for stray spaces and Caps Lock, and avoid autofill. The Login Help guide walks through this and the other common causes in order.",
  },
  {
    q: "I forgot my password.",
    a: "Use the 'Forgot Password?' option in the login area to start a reset instead of guessing repeatedly. Never share your password with anyone.",
  },
];

const GAME_FAQS = [
  {
    q: "Where can I learn the games?",
    a: "Each game has its own page, and there are dedicated guides for cricket, football and Teen Patti that explain the formats, rules and terminology in plain language.",
  },
  {
    q: "What cricket formats exist?",
    a: "The three main formats are T20 (20 overs a side), One Day Internationals (50 overs) and Test cricket (up to five days). The cricket guide explains how each is structured.",
  },
  {
    q: "What are the basics of football?",
    a: "Two teams of eleven play two 45-minute halves, aiming to put the ball in the opposing goal. The football guide covers positions, scoring, fouls and cards.",
  },
  {
    q: "How does Teen Patti work?",
    a: "Each player receives three cards and hands are compared by ranking, from a trail (three of a kind) down to a high card. The Teen Patti guide lists the full order.",
  },
];

const WALLET_FAQS = [
  {
    q: "What does the wallet show?",
    a: "After signing in, the wallet lists your account transactions with a method, type, amount and status. The wallet guide explains how to read each part.",
  },
  {
    q: "What do the transaction statuses mean?",
    a: "Pending means it is waiting to process, processing means it is being handled, completed means it finished successfully, and failed means it did not go through.",
  },
  {
    q: "A transaction is still pending — what should I do?",
    a: "Pending simply means processing is not finished. Wait and refresh rather than repeating the action, which can create duplicate entries.",
  },
];

const TECH_FAQS = [
  {
    q: "The site is not loading correctly.",
    a: "Refresh the page, clear your browser cache and cookies for the site, disable blocking extensions, and make sure your browser is up to date.",
  },
  {
    q: "Does the website work on mobile?",
    a: "Yes. The layout is mobile-first and adapts to phones, tablets and desktops. If a page misbehaves on mobile, reopen the browser, check your connection and ensure your device clock is set automatically.",
  },
  {
    q: "How do I get support?",
    a: "The support desk is reachable from the floating buttons and footer on every page. The Contact & Support guide explains what details to include so your query is resolved quickly.",
  },
];

const ALL_FAQS = [...NAV_FAQS, ...ACCOUNT_FAQS, ...GAME_FAQS, ...WALLET_FAQS, ...TECH_FAQS];

export const Route = createFileRoute("/faq")({
  head: () => {
    const base = pageHead({ path: "/faq", title: TITLE, description: DESC });
    return {
      ...base,
      scripts: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]),
        faqJsonLd(ALL_FAQS),
      ],
    };
  },
  component: FaqPage,
});

function FaqPage() {
  return (
    <InfoPage
      crumbLabel="FAQ"
      badge="Frequently Asked Questions"
      title="Cricbet99 FAQ"
      lead="Answers to the questions people ask most — grouped by topic so you can jump straight to navigation, accounts, games, wallet or technical help."
    >
      <div className="card-surface p-6 text-sm leading-relaxed text-muted-foreground md:p-8 md:text-[15px]">
        <p>
          This FAQ brings together short answers from across the site. For deeper explanations,
          follow the links in each answer or the related guides at the bottom. You can also head back
          to the <HomeLink>Cricbet99 homepage</HomeLink> at any time.
        </p>
      </div>

      <FaqAccordion title="Website Navigation" items={NAV_FAQS} />
      <FaqAccordion title="Account Access & Login" items={ACCOUNT_FAQS} />
      <FaqAccordion title="Games — Cricket, Football & Teen Patti" items={GAME_FAQS} />
      <FaqAccordion title="Wallet & Transactions" items={WALLET_FAQS} />
      <FaqAccordion title="Technical, Mobile & Support" items={TECH_FAQS} />

      <RelatedPages
        links={[
          { to: "/how-it-works", label: "How It Works", desc: "A full walkthrough of the website." },
          { to: "/login-help", label: "Login Help", desc: "Detailed sign-in troubleshooting." },
          { to: "/wallet-guide", label: "Wallet Guide", desc: "Understand statuses and history." },
          { to: "/contact-us", label: "Contact & Support", desc: "Reach the support desk." },
        ]}
      />
    </InfoPage>
  );
}
