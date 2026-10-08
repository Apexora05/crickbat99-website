import { createFileRoute } from "@tanstack/react-router";
import { Map, Rocket, Compass, Gamepad2, LogIn, Wallet, LifeBuoy } from "lucide-react";
import {
  InfoPage,
  InfoSection,
  Bullets,
  Steps,
  RelatedPages,
  HomeLink,
  RouteLink,
} from "@/components/info-ui";
import { pageHead, breadcrumbJsonLd } from "@/lib/seo";

const TITLE = "How Cricbet99 Works | Platform Guide";
const DESC =
  "Understand how the Cricbet99 website is structured, how to navigate its sections and where to find account, game and support information.";

export const Route = createFileRoute("/how-it-works")({
  head: () => {
    const base = pageHead({ path: "/how-it-works", title: TITLE, description: DESC });
    return {
      ...base,
      scripts: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "How It Works", path: "/how-it-works" },
        ]),
      ],
    };
  },
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <InfoPage
      crumbLabel="How It Works"
      badge="Platform Guide"
      title="How Cricbet99 Works"
      lead="A practical walkthrough of how the website is organised, how to move between its sections, and where account, game and support information lives."
    >
      <InfoSection title="How the Website Is Structured" icon={Map}>
        <p>
          The website is built as a single connected site with one shared header and footer. The{" "}
          <HomeLink>Cricbet99 homepage</HomeLink> acts as the hub: from there you can reach the login
          form, the games grid, the payment and support sections, and the city directory. Every other
          page keeps the same navigation so you never lose your place.
        </p>
        <p>
          Think of it as four layers — the homepage hub, the game pages, the account area (login and
          wallet), and the information guides. Each layer links to the others where it is useful.
        </p>
      </InfoSection>

      <InfoSection title="Getting Started" icon={Rocket}>
        <p>A typical first visit looks like this:</p>
        <Steps
          items={[
            "Open the homepage and scan the main sections from the header.",
            "Browse the games grid to see what is available and open a game page to read how it works.",
            "Use the login form if you already have an account, or review the Login Help guide if you need it.",
            "Open the information guides below to learn more about any area before you continue.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Navigating the Main Sections" icon={Compass}>
        <p>
          The header links jump to the key areas of the homepage — Games, Why Us, Payments and FAQ —
          while the footer collects every destination in one place, including the Information /
          Guides column. On smaller screens the header collapses into a menu button that opens the
          same links.
        </p>
        <Bullets
          items={[
            "Header links scroll to sections on the homepage.",
            "Footer links open full pages, including these guides and the city directory.",
            "The floating buttons stay on screen so support is always one tap away.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Finding Game Information" icon={Gamepad2}>
        <p>
          Each game has its own page describing what it is, a short how-to-play summary and related
          games. For longer explanations, the dedicated guides go deeper: read the{" "}
          <RouteLink to="/cricket-guide">cricket guide</RouteLink>, the{" "}
          <RouteLink to="/football-guide">football guide</RouteLink> or the{" "}
          <RouteLink to="/teen-patti-guide">Teen Patti guide</RouteLink> to understand the formats,
          rules and terminology before you explore a game page.
        </p>
      </InfoSection>

      <InfoSection title="Account and Login" icon={LogIn}>
        <p>
          The account area starts at the login form on the homepage. If sign-in does not work as
          expected, the <RouteLink to="/login-help">Login Help guide</RouteLink> covers the usual
          causes — wrong details, browser cache, mobile quirks and session time-outs — in order, so
          you can work through them calmly.
        </p>
      </InfoSection>

      <InfoSection title="Wallet and Transaction Information" icon={Wallet}>
        <p>
          Once signed in, the wallet area is where account transaction details appear. The{" "}
          <RouteLink to="/wallet-guide">Wallet &amp; Transaction guide</RouteLink> explains the
          terminology, what each transaction status means and how to read your history, so the
          numbers on screen are easy to interpret.
        </p>
      </InfoSection>

      <InfoSection title="Getting Support" icon={LifeBuoy}>
        <p>
          Support runs through the WhatsApp desk linked on every page. If you need help, the{" "}
          <RouteLink to="/contact-us">Contact &amp; Support guide</RouteLink> explains what
          information to prepare first so your question can be resolved quickly.
        </p>
      </InfoSection>

      <RelatedPages
        links={[
          { to: "/about-us", label: "About Us", desc: "What the platform is and what it provides." },
          { to: "/online-cricket-id", label: "Online Cricket ID", desc: "The city-wise directory across India and the UAE." },
          { to: "/faq", label: "FAQ", desc: "Quick answers across every part of the site." },
          { to: "/login-help", label: "Login Help", desc: "Fix common account-access problems." },
        ]}
      />
    </InfoPage>
  );
}
