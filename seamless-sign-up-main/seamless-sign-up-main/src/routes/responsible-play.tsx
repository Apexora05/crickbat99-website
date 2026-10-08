import { createFileRoute } from "@tanstack/react-router";
import { Scale, SlidersHorizontal, Coffee, TrendingDown, AlertTriangle, Hand, HeartHandshake, ShieldCheck, LifeBuoy } from "lucide-react";
import {
  InfoPage,
  InfoSection,
  Bullets,
  RelatedPages,
  HomeLink,
  RouteLink,
} from "@/components/info-ui";
import { pageHead, breadcrumbJsonLd } from "@/lib/seo";

const TITLE = "Responsible Play | Information & Support";
const DESC =
  "Information about responsible use, setting personal limits, taking breaks and recognizing when additional support may be appropriate.";

export const Route = createFileRoute("/responsible-play")({
  head: () => {
    const base = pageHead({ path: "/responsible-play", title: TITLE, description: DESC });
    return {
      ...base,
      scripts: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Responsible Play", path: "/responsible-play" },
        ]),
      ],
    };
  },
  component: ResponsiblePlayPage,
});

function ResponsiblePlayPage() {
  return (
    <InfoPage
      crumbLabel="Responsible Play"
      badge="Information & Support"
      title="Responsible Play"
      lead="Calm, factual guidance on keeping play balanced — setting personal limits, taking breaks, recognising warning signs, and knowing where to turn if you need support."
    >
      <InfoSection title="What Responsible Play Means" icon={Scale}>
        <p>
          Responsible play means treating any gaming activity as entertainment rather than a way to
          make money, and keeping it within limits you set in advance. It is about staying in control
          of the time and attention you give it, and being honest with yourself about how it fits
          into the rest of your life.
        </p>
        <p>
          You can return to the <HomeLink>Cricbet99 homepage</HomeLink> at any time, but it is worth
          reading this page first if you want to keep your approach measured and healthy.
        </p>
      </InfoSection>

      <InfoSection title="Set Personal Limits" icon={SlidersHorizontal}>
        <p>Deciding your limits before you start makes them far easier to keep:</p>
        <Bullets
          items={[
            "Set a time limit for a session and stick to it.",
            "Decide in advance how much time per week feels reasonable for you.",
            "Only spend time and attention you can comfortably afford to.",
            "Write your limits down so they are concrete, not vague intentions.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Take Regular Breaks" icon={Coffee}>
        <p>
          Stepping away at regular intervals keeps your judgement clear. Short, frequent breaks help
          you stay aware of how long you have been playing and prevent one session from stretching
          far longer than you intended. Doing something unrelated between sessions resets your focus.
        </p>
      </InfoSection>

      <InfoSection title="Avoid Chasing Losses" icon={TrendingDown}>
        <p>
          Trying to recover a loss by continuing is one of the clearest signs that play has stopped
          being fun. Outcomes are not owed to anyone, and continuing in frustration rarely improves
          the situation. If you feel the urge to chase, that is a strong cue to stop for the day.
        </p>
      </InfoSection>

      <InfoSection title="Recognizing Warning Signs" icon={AlertTriangle}>
        <p>It can help to check in with yourself. Signs worth noticing include:</p>
        <Bullets
          items={[
            "Spending more time or attention than you planned.",
            "Feeling anxious, irritable or preoccupied when not playing.",
            "Letting activity interfere with work, study, sleep or relationships.",
            "Hiding how much you play from people close to you.",
          ]}
        />
      </InfoSection>

      <InfoSection title="When to Stop" icon={Hand}>
        <p>
          Stop when you reach a limit you set, when you stop enjoying yourself, or when you notice any
          of the signs above. Ending a session is always a valid choice, and there is no benefit to
          pushing on when the experience no longer feels good.
        </p>
      </InfoSection>

      <InfoSection title="Getting Help" icon={HeartHandshake}>
        <p>
          If you are concerned about your own habits or someone else's, support is available.
          Speaking to someone you trust is a good first step, and confidential help services exist in
          many regions. Reaching out early, before difficulties grow, tends to make things easier to
          manage.
        </p>
      </InfoSection>

      <InfoSection title="Important Age Awareness" icon={ShieldCheck}>
        <p>
          Gaming activities are intended for adults only. If you are not of legal age in your
          location, these activities are not for you. Keeping accounts and devices secure also helps
          ensure that minors cannot access content meant for adults.
        </p>
      </InfoSection>

      <InfoSection title="Support Information" icon={LifeBuoy}>
        <p>
          For questions about your account or the website, the support desk is reachable from every
          page. The <RouteLink to="/contact-us">Contact &amp; Support guide</RouteLink> explains how
          to get in touch and what to prepare. Keeping play balanced is always the priority.
        </p>
      </InfoSection>

      <RelatedPages
        links={[
          { to: "/about-us", label: "About Us", desc: "Background on the platform and its sections." },
          { to: "/faq", label: "FAQ", desc: "Common questions about the site." },
          { to: "/contact-us", label: "Contact & Support", desc: "Reach the support desk for help." },
          { to: "/how-it-works", label: "How It Works", desc: "Understand how the website is organised." },
        ]}
      />
    </InfoPage>
  );
}
