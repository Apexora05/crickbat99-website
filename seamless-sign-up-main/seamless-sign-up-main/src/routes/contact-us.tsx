import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, ClipboardList, LogIn, Wrench, Receipt, ListChecks } from "lucide-react";
import {
  InfoPage,
  InfoSection,
  Bullets,
  FaqAccordion,
  RelatedPages,
  HomeLink,
  RouteLink,
} from "@/components/info-ui";
import { WHATSAPP_SUPPORT_URL } from "@/components/site-chrome";
import { pageHead, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

const TITLE = "Cricbet99 Contact & Support | Help Center";
const DESC =
  "Find information about Cricbet99 support, common technical issues and what details to provide when requesting assistance.";

const FAQS = [
  {
    q: "How do I contact support?",
    a: "Support is handled through the WhatsApp desk, which is linked from the floating buttons and the footer on every page, and from the button on this page.",
  },
  {
    q: "What are the support hours?",
    a: "The support desk is available around the clock. Response times can vary with demand, so including clear details in your first message helps.",
  },
  {
    q: "Will support ever ask for my password?",
    a: "No. You should never share your password or one-time codes with anyone, including support. A genuine request for help does not need them.",
  },
];

export const Route = createFileRoute("/contact-us")({
  head: () => {
    const base = pageHead({ path: "/contact-us", title: TITLE, description: DESC });
    return {
      ...base,
      scripts: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact & Support", path: "/contact-us" },
        ]),
        faqJsonLd(FAQS),
      ],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  return (
    <InfoPage
      crumbLabel="Contact & Support"
      badge="Help Center"
      title="Cricbet99 Contact & Support"
      lead="How to reach the support desk, what to check before you do, and exactly which details to include so your question can be understood and resolved on the first message."
    >
      <InfoSection title="Contact & Support" icon={MessageCircle}>
        <p>
          Support for Cricbet99 is handled through the WhatsApp desk, which stays reachable from the
          floating buttons and the footer on every page — including the{" "}
          <HomeLink>main Cricbet99 website</HomeLink>. Use the button below to open a support chat
          directly.
        </p>
        <div className="mt-4">
          <a
            href={WHATSAPP_SUPPORT_URL}
            target="_blank"
            rel="noreferrer"
            data-testid="contact-whatsapp-button"
            className="btn-whatsapp inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm"
          >
            <MessageCircle className="h-5 w-5" />
            Open the WhatsApp Support Desk
          </a>
        </div>
        <p className="mt-3 text-xs">
          Please only use the official support desk linked across the site. Never share your password
          or one-time codes with anyone.
        </p>
      </InfoSection>

      <InfoSection title="Before Contacting Support" icon={ClipboardList}>
        <p>A quick self-check often resolves the issue — or makes it much faster to explain:</p>
        <Bullets
          items={[
            "Refresh the page and try the action once more.",
            "Check your internet connection and switch network if needed.",
            "Make sure your browser or app is up to date.",
            "Skim the relevant guide below — many questions are already answered there.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Login Issues" icon={LogIn}>
        <p>
          For sign-in problems, work through the{" "}
          <RouteLink to="/login-help">Login Help guide</RouteLink> first. It covers incorrect
          details, password resets, browser and cache fixes, mobile quirks and sessions. If you still
          cannot get in after trying those steps, contact support and mention which steps you have
          already tried.
        </p>
      </InfoSection>

      <InfoSection title="Technical Issues" icon={Wrench}>
        <p>For pages that will not load or display correctly, note the basics before reaching out:</p>
        <Bullets
          items={[
            "The device and browser you are using, and their versions.",
            "What you were doing when the problem appeared.",
            "Any on-screen message, ideally with a screenshot.",
            "Whether the issue happens every time or only sometimes.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Transaction Issues" icon={Receipt}>
        <p>
          For anything involving the wallet, the{" "}
          <RouteLink to="/wallet-guide">Wallet &amp; Transaction guide</RouteLink> explains statuses
          and history. If an entry still looks wrong after you have checked it and allowed time for it
          to settle, bring its full details to support.
        </p>
      </InfoSection>

      <InfoSection title="Information to Include in a Support Request" icon={ListChecks}>
        <p>Including these details up front usually means a single, clear reply rather than a back-and-forth:</p>
        <Bullets
          items={[
            "The account username or email associated with the issue — but never your password.",
            "A clear description of what happened and what you expected instead.",
            "For transactions: the date, time, method, amount, status and any reference shown.",
            "The device and browser you were using, with a screenshot if you have one.",
            "The steps you have already tried from the relevant guide.",
          ]}
        />
      </InfoSection>

      <FaqAccordion items={FAQS} />

      <RelatedPages
        links={[
          { to: "/login-help", label: "Login Help", desc: "Fix sign-in and account-access problems." },
          { to: "/wallet-guide", label: "Wallet Guide", desc: "Understand transaction statuses and history." },
          { to: "/faq", label: "FAQ", desc: "Quick answers across the whole platform." },
          { to: "/responsible-play", label: "Responsible Play", desc: "Guidance on balanced, healthy use." },
        ]}
      />
    </InfoPage>
  );
}
