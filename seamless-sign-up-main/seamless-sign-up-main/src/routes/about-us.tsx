import { createFileRoute } from "@tanstack/react-router";
import { Info, LayoutGrid, Sparkles, Compass, LifeBuoy } from "lucide-react";
import {
  InfoPage,
  InfoSection,
  Bullets,
  FaqAccordion,
  RelatedPages,
  HomeLink,
} from "@/components/info-ui";
import { pageHead, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

const TITLE = "About Cricbet99 | Platform Information";
const DESC =
  "Learn about Cricbet99, its platform structure, available sections, user experience and general website information.";

const FAQS = [
  {
    q: "What kind of website is Cricbet99?",
    a: "Cricbet99 is an online cricket ID and gaming information platform. The website brings together sports game sections, account access, a wallet area and a support desk under a single, mobile-first interface.",
  },
  {
    q: "Which sections can I find on the website?",
    a: "The main areas include the games section, the city-wise online cricket ID directory, the login and wallet pages, and a set of informational guides covering cricket, football, Teen Patti, login help and responsible play.",
  },
  {
    q: "Do I need an account to read the information pages?",
    a: "No. Guides such as this About page, the cricket and football guides, the FAQ and the responsible-play page are open to everyone. An account is only needed for the wallet area.",
  },
  {
    q: "How do I get help if I am stuck?",
    a: "Every page links to the support desk, which operates over WhatsApp. You can also open the Contact & Support guide to see what details to prepare before reaching out.",
  },
];

export const Route = createFileRoute("/about-us")({
  head: () => {
    const base = pageHead({ path: "/about-us", title: TITLE, description: DESC });
    return {
      ...base,
      scripts: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about-us" },
        ]),
        faqJsonLd(FAQS),
      ],
    };
  },
  component: AboutPage,
});

function AboutPage() {
  return (
    <InfoPage
      crumbLabel="About Us"
      badge="Platform Information"
      title="About Cricbet99"
      lead="An overview of what the Cricbet99 website is, how its sections fit together, and what you can expect as you move around the platform."
    >
      <InfoSection title="About Cricbet99" icon={Info}>
        <p>
          Cricbet99 is an online cricket ID and gaming platform built around live cricket and a
          small, focused set of card and casino game sections. The website is designed to be simple
          to navigate on a phone, with a consistent brown-and-gold interface, clear buttons and a
          single support desk reachable from any page.
        </p>
        <p>
          You can always return to the <HomeLink>Cricbet99 homepage</HomeLink> to reach the login
          form, the games grid and the city directory. This About page explains how the different
          parts of the site relate to one another so you can find what you need quickly.
        </p>
      </InfoSection>

      <InfoSection title="What the Platform Provides" icon={LayoutGrid}>
        <p>At a high level, the website is organised into a few practical areas:</p>
        <Bullets
          items={[
            "A games section listing the available cricket, football, card and casino game pages.",
            "An online cricket ID directory, organised city by city across India and the UAE.",
            "An account area with a login page and a wallet for viewing transaction information.",
            "A set of informational guides — including this page — that explain games, accounts and responsible use.",
            "A support desk that stays reachable from the floating buttons on every page.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Platform Experience" icon={Sparkles}>
        <p>
          The interface is mobile-first. Content is arranged in cards and short sections so it is
          easy to scan, and the same header and footer appear across the site to keep navigation
          predictable. Primary actions use the gold buttons, while the green buttons open the
          WhatsApp support desk.
        </p>
        <p>
          Pages are kept lightweight so they load quickly, and layouts adapt from a single column on
          phones to multi-column grids on tablets and desktops without changing how anything works.
        </p>
      </InfoSection>

      <InfoSection title="Website Sections" icon={Compass}>
        <p>Here is how the main destinations connect:</p>
        <Bullets
          items={[
            "Homepage — the central hub with the login form, featured games and quick links.",
            "Games — individual pages describing each game and how it is played.",
            "Online Cricket ID — a city-wise directory for finding region-specific information.",
            "Wallet — the signed-in area where account transaction details appear.",
            "Guides & FAQ — plain-language help pages for games, login, wallet and support.",
          ]}
        />
      </InfoSection>

      <InfoSection title="User Support" icon={LifeBuoy}>
        <p>
          Support is handled through the WhatsApp desk, which is linked from the floating buttons and
          from the footer on every page. If you are not sure what to send, the Contact &amp; Support
          guide lists the details worth including so your query can be understood on the first
          message. For sign-in trouble specifically, the Login Help guide walks through the most
          common fixes.
        </p>
      </InfoSection>

      <FaqAccordion items={FAQS} />

      <RelatedPages
        links={[
          { to: "/how-it-works", label: "How It Works", desc: "A walkthrough of the website structure and navigation." },
          { to: "/faq", label: "FAQ", desc: "Answers to common questions about the platform." },
          { to: "/responsible-play", label: "Responsible Play", desc: "Guidance on healthy, balanced use of the site." },
          { to: "/contact-us", label: "Contact & Support", desc: "How to reach the support desk and what to include." },
        ]}
      />
    </InfoPage>
  );
}
