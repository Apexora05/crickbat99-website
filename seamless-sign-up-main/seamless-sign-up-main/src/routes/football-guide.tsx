import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Timer, ScrollText, Users, Goal, Flag, ListChecks, LineChart } from "lucide-react";
import {
  InfoPage,
  InfoSection,
  InfoSub,
  Bullets,
  RelatedPages,
  HomeLink,
  RouteLink,
} from "@/components/info-ui";
import { pageHead, breadcrumbJsonLd } from "@/lib/seo";

const TITLE = "Football Guide | Rules, Positions & Match Basics";
const DESC =
  "Learn the fundamentals of football, including match structure, basic rules, player positions, terminology and common football concepts.";

export const Route = createFileRoute("/football-guide")({
  head: () => {
    const base = pageHead({ path: "/football-guide", title: TITLE, description: DESC });
    return {
      ...base,
      scripts: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Football Guide", path: "/football-guide" },
        ]),
      ],
    };
  },
  component: FootballGuidePage,
});

function FootballGuidePage() {
  return (
    <InfoPage
      crumbLabel="Football Guide"
      badge="Sport Basics"
      title="Football Guide"
      lead="The fundamentals of association football — how a match is structured, the core rules, where players line up, how scoring works, and the terms you will hear during a game."
    >
      <InfoSection title="Introduction to Football" icon={BookOpen}>
        <p>
          Football (also called soccer) is played between two teams of eleven, including a
          goalkeeper. The aim is simple: move the ball into the opposing goal more times than your
          opponent. Outfield players use their feet, head and body — but not their hands or arms —
          while only the goalkeeper may handle the ball, and only inside their own penalty area.
        </p>
        <p>
          This guide focuses on the sport itself. For the football sections available through the{" "}
          <HomeLink>main Cricbet99 website</HomeLink>, the terms below will help you follow any
          match with confidence.
        </p>
      </InfoSection>

      <InfoSection title="Match Structure" icon={Timer}>
        <p>A standard match is built around two halves:</p>
        <Bullets
          items={[
            "Two halves of 45 minutes each, separated by a half-time interval.",
            "Added time (stoppage time) is played at the end of each half to make up for pauses.",
            "In knockout ties, extra time and a penalty shoot-out can decide a drawn match.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Basic Rules" icon={ScrollText}>
        <Bullets
          items={[
            "Play restarts with a kick-off, throw-in, goal kick, corner or free kick depending on how the ball went out or a foul occurred.",
            "A throw-in is awarded when the ball crosses the touchline; a corner or goal kick when it crosses the goal line.",
            "Offside applies when an attacker is ahead of the second-last defender at the moment the ball is played to them.",
            "The referee enforces the rules, with assistant referees and, in many competitions, video review support.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Player Positions" icon={Users}>
        <p>Teams are generally organised into four groups:</p>
        <Bullets
          items={[
            "Goalkeeper — the last line of defence and the only player allowed to use their hands in the penalty area.",
            "Defenders — centre-backs and full-backs who protect the goal and start attacks.",
            "Midfielders — link defence and attack, control tempo and create chances.",
            "Forwards — wingers and strikers whose main job is to score.",
          ]}
        />
        <InfoSub>Formations</InfoSub>
        <p>
          Coaches arrange these groups into formations such as 4-4-2 or 4-3-3, written from defence
          to attack, to balance solidity and creativity.
        </p>
      </InfoSection>

      <InfoSection title="Scoring" icon={Goal}>
        <p>
          A goal counts when the whole ball crosses the goal line between the posts and under the
          bar. Each goal is worth one point towards the result. In league competitions, a win is
          usually worth three points, a draw one, and a loss none, which decides league standings.
        </p>
      </InfoSection>

      <InfoSection title="Fouls and Cards" icon={Flag}>
        <p>Referees use free kicks, penalties and cards to manage the game:</p>
        <Bullets
          items={[
            "A foul leads to a free kick; a foul inside the penalty area leads to a penalty kick.",
            "A yellow card is a caution for a serious offence or repeated fouling.",
            "A red card means dismissal — the player leaves and the team continues with ten.",
            "Two yellow cards in one match add up to a red.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Common Football Terms" icon={ListChecks}>
        <Bullets
          items={[
            "Clean sheet — a match in which a team concedes no goals.",
            "Assist — the final pass or touch that sets up a goal.",
            "Hat-trick — three goals scored by one player in a single match.",
            "Possession — the share of time a team controls the ball.",
            "Counter-attack — a fast attack launched straight after winning the ball back.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Understanding Match Information" icon={LineChart}>
        <p>
          A match summary typically shows the score, scorers and timings, plus statistics such as
          possession, shots, shots on target, corners and cards. Reading these together gives a
          fuller picture than the scoreline alone — a team can dominate possession yet lose on a
          single counter-attack.
        </p>
      </InfoSection>

      <RelatedPages
        links={[
          { to: "/cricket-guide", label: "Cricket Guide", desc: "Formats, rules and match basics for cricket." },
          { to: "/teen-patti-guide", label: "Teen Patti Guide", desc: "Card rankings and gameplay concepts." },
          { to: "/how-it-works", label: "How It Works", desc: "Navigate the website and its sections." },
          { to: "/faq", label: "FAQ", desc: "Answers about games and the platform." },
        ]}
      />
    </InfoPage>
  );
}
