import { createFileRoute } from "@tanstack/react-router";
import { Spade, Layers, Trophy, Hand, BookOpen, Gamepad2 } from "lucide-react";
import {
  InfoPage,
  InfoSection,
  Bullets,
  FaqAccordion,
  RelatedPages,
  HomeLink,
  RouteLink,
} from "@/components/info-ui";
import { pageHead, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

const TITLE = "Teen Patti Guide | Rules, Hands & Game Basics";
const DESC =
  "Learn the basic rules, hand rankings, terminology and general gameplay concepts of Teen Patti in this informational guide.";

const FAQS = [
  {
    q: "How many cards does each player receive?",
    a: "Each player is dealt three cards face down from a standard 52-card deck. The three-card hand is what every player compares at showdown.",
  },
  {
    q: "What does playing 'blind' mean?",
    a: "A blind player continues in the round without looking at their cards, while a 'seen' player has looked. Blind play and seen play follow slightly different staking rules in most variations.",
  },
  {
    q: "Which hand is the strongest?",
    a: "A trail (three of a kind) is the highest-ranked hand, followed by a pure sequence, a sequence, a colour, a pair and finally a high card.",
  },
  {
    q: "Is Teen Patti the same as three-card poker?",
    a: "They are related three-card games and share some ideas, but the hand rankings and betting conventions differ. This guide describes Teen Patti specifically.",
  },
];

export const Route = createFileRoute("/teen-patti-guide")({
  head: () => {
    const base = pageHead({ path: "/teen-patti-guide", title: TITLE, description: DESC });
    return {
      ...base,
      scripts: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Teen Patti Guide", path: "/teen-patti-guide" },
        ]),
        faqJsonLd(FAQS),
      ],
    };
  },
  component: TeenPattiGuidePage,
});

function TeenPattiGuidePage() {
  return (
    <InfoPage
      crumbLabel="Teen Patti Guide"
      badge="Card Game Basics"
      title="Teen Patti Guide"
      lead="An informational introduction to Teen Patti — the game's structure, how cards are ranked, the terms players use and the general flow of a round."
    >
      <InfoSection title="What Is Teen Patti" icon={Spade}>
        <p>
          Teen Patti, which translates as “three cards”, is a popular South Asian card game played
          with a standard 52-card deck. Several players sit around a table and each receives three
          cards. The game is social and fast, built around comparing three-card hands.
        </p>
        <p>
          This page is purely informational. It explains the rules and vocabulary so the Teen Patti
          section on the <HomeLink>Cricbet99 homepage</HomeLink> is easy to follow. It does not
          describe strategies for winning money, and it makes no guarantees about outcomes.
        </p>
      </InfoSection>

      <InfoSection title="Basic Game Structure" icon={Layers}>
        <Bullets
          items={[
            "The deck is shuffled and each player is dealt three face-down cards.",
            "Play proceeds around the table in turns.",
            "On their turn, a player can continue in the round or step out of it.",
            "Players may play 'blind' (without looking) or 'seen' (after looking at their cards).",
            "When players decide to compare, the hands are revealed and ranked.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Card Rankings" icon={Trophy}>
        <p>From strongest to weakest, the standard Teen Patti hands are:</p>
        <Bullets
          items={[
            "Trail / Set — three cards of the same rank (e.g. three kings).",
            "Pure sequence — three consecutive cards of the same suit.",
            "Sequence (run) — three consecutive cards of mixed suits.",
            "Colour (flush) — three cards of the same suit, not in sequence.",
            "Pair — two cards of the same rank.",
            "High card — none of the above; the highest single card counts.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Understanding Hands" icon={Hand}>
        <p>
          When two hands are the same type, the higher-ranked cards break the tie — for example, a
          trail of aces beats a trail of kings. Among high-card hands, the single highest card
          decides, then the next, and so on. Knowing this order is enough to read who holds the
          stronger hand at a showdown.
        </p>
      </InfoSection>

      <InfoSection title="Common Terms" icon={BookOpen}>
        <Bullets
          items={[
            "Blind — staying in the round without viewing your cards.",
            "Seen (chaal) — continuing after looking at your cards.",
            "Boot — the agreed starting amount placed before cards are dealt.",
            "Pot — the combined amount being played for in the round.",
            "Show — the moment remaining players compare hands to decide the round.",
            "Fold (pack) — stepping out of the current round.",
          ]}
        />
      </InfoSection>

      <InfoSection title="General Gameplay Concepts" icon={Gamepad2}>
        <p>
          Teen Patti blends chance with reading the table. Because cards are hidden, part of the game
          is judging how others are playing. The round ends when players show their hands or when
          only one player remains in the round. Treat it as light entertainment, set your own limits,
          and see the <RouteLink to="/responsible-play">responsible play</RouteLink> guide for
          balanced-use tips.
        </p>
      </InfoSection>

      <FaqAccordion title="Common Questions" items={FAQS} />

      <RelatedPages
        links={[
          { to: "/cricket-guide", label: "Cricket Guide", desc: "Formats, rules and terminology for cricket." },
          { to: "/football-guide", label: "Football Guide", desc: "The fundamentals of football." },
          { to: "/responsible-play", label: "Responsible Play", desc: "Set limits and keep play balanced." },
          { to: "/faq", label: "FAQ", desc: "Questions about games and the platform." },
        ]}
      />
    </InfoPage>
  );
}
