import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Timer, Layers, Swords, Target, Users, ListChecks, ClipboardList } from "lucide-react";
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

const TITLE = "Cricket Guide | Formats, Rules & Match Basics";
const DESC =
  "A practical cricket guide covering formats, match structure, basic rules, terminology and commonly used cricket concepts.";

export const Route = createFileRoute("/cricket-guide")({
  head: () => {
    const base = pageHead({ path: "/cricket-guide", title: TITLE, description: DESC });
    return {
      ...base,
      scripts: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cricket Guide", path: "/cricket-guide" },
        ]),
      ],
    };
  },
  component: CricketGuidePage,
});

function CricketGuidePage() {
  return (
    <InfoPage
      crumbLabel="Cricket Guide"
      badge="Sport Basics"
      title="Cricket Guide"
      lead="A clear, practical introduction to cricket — its formats, how a match is built, the basics of batting, bowling and fielding, and the terms you will hear most often."
    >
      <InfoSection title="Introduction to Cricket" icon={BookOpen}>
        <p>
          Cricket is a bat-and-ball sport played between two teams of eleven players on a large oval
          field with a rectangular 22-yard pitch in the centre. One team bats, trying to score runs,
          while the other bowls and fields, trying to limit runs and take wickets. The teams then
          swap roles. Whichever side scores more runs within the rules of the format wins.
        </p>
        <p>
          If you follow the Indian Premier League and other tournaments through the{" "}
          <HomeLink>main Cricbet99 website</HomeLink>, this guide gives you the vocabulary and
          structure to understand what is happening on the field.
        </p>
      </InfoSection>

      <InfoSection title="Cricket Formats" icon={Timer}>
        <p>Cricket is played in three main formats, each with a different length and rhythm:</p>
        <Bullets
          items={[
            "T20 — each side bats for 20 overs. The fastest, highest-tempo format, usually finished in about three hours.",
            "One Day International (ODI) — 50 overs per side, balancing aggression with pacing across a full day.",
            "Test cricket — played over up to five days with two innings per side and no over limit, rewarding patience and stamina.",
          ]}
        />
        <p>Franchise leagues such as the IPL use the T20 format, which is why T20 is the most familiar version for many fans.</p>
      </InfoSection>

      <InfoSection title="Match Structure" icon={Layers}>
        <p>
          A match is divided into innings. In limited-overs cricket each team has one innings; in
          Tests, two. An over is a set of six legal deliveries bowled by one bowler from one end.
        </p>
        <Bullets
          items={[
            "The team batting first sets a total; the second team then chases it.",
            "An innings ends when the overs run out or ten wickets fall.",
            "The coin toss decides which captain chooses to bat or bowl first.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Batting Basics" icon={Swords}>
        <p>
          Two batters are at the crease at any time. They score runs by hitting the ball and running
          between the wickets, or by finding the boundary.
        </p>
        <Bullets
          items={[
            "A boundary along the ground scores four runs; clearing the rope on the full scores six.",
            "Batters protect their wicket while looking for scoring chances.",
            "A partnership is the runs added together by two batters before one is dismissed.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Bowling Basics" icon={Target}>
        <p>Bowlers aim to dismiss batters and keep scoring down. They generally fall into two camps:</p>
        <Bullets
          items={[
            "Pace bowlers rely on speed, swing and seam movement.",
            "Spin bowlers use slower deliveries that turn off the pitch to deceive the batter.",
            "Common dismissals include bowled, caught, leg before wicket (LBW), run out and stumped.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Fielding Positions" icon={Users}>
        <p>
          Fielders are placed around the ground to stop runs and take catches. Positions are named
          relative to the batter and the two halves of the field — the off side and the leg (on)
          side.
        </p>
        <Bullets
          items={[
            "Close catchers such as slip and gully sit near the bat for edges.",
            "The infield (point, cover, mid-off, mid-on, square leg) saves singles.",
            "The outfield (third man, deep cover, long-on, fine leg) guards the boundary.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Common Cricket Terms" icon={ListChecks}>
        <Bullets
          items={[
            "Wicket — can mean the stumps, a dismissal, or the pitch, depending on context.",
            "Maiden over — an over in which no runs are scored off the bat.",
            "Strike rate — runs scored per 100 balls faced (for batters).",
            "Economy rate — runs conceded per over (for bowlers).",
            "Duck — a batter dismissed without scoring.",
            "All-rounder — a player skilled at both batting and bowling.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Understanding a Scorecard" icon={ClipboardList}>
        <p>
          A scorecard summarises the match. The team total is usually shown as runs for wickets — for
          example, 165/4 means 165 runs for the loss of four wickets. Alongside it you will see the
          overs bowled and, in a chase, the required run rate.
        </p>
        <InfoSub>Reading it quickly</InfoSub>
        <Bullets
          items={[
            "Batting lines show each batter's runs, balls faced and how they were dismissed.",
            "Bowling lines show overs, maidens, runs conceded and wickets taken.",
            "The run rate compares the scoring pace of both innings at a glance.",
          ]}
        />
      </InfoSection>

      <RelatedPages
        links={[
          { to: "/football-guide", label: "Football Guide", desc: "Rules, positions and match basics for football." },
          { to: "/teen-patti-guide", label: "Teen Patti Guide", desc: "Hand rankings and gameplay for the card game." },
          { to: "/how-it-works", label: "How It Works", desc: "Find your way around the website." },
          { to: "/faq", label: "FAQ", desc: "Common questions about games and the platform." },
        ]}
      />
    </InfoPage>
  );
}
