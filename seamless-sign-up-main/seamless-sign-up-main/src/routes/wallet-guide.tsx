import { createFileRoute } from "@tanstack/react-router";
import { Wallet, Activity, History, Hourglass, XCircle, Search, Wrench, LifeBuoy } from "lucide-react";
import {
  InfoPage,
  InfoSection,
  Bullets,
  RelatedPages,
  HomeLink,
  RouteLink,
} from "@/components/info-ui";
import { pageHead, breadcrumbJsonLd } from "@/lib/seo";

const TITLE = "Wallet & Transaction Guide | Cricbet99";
const DESC =
  "Understand wallet terminology, transaction statuses, transaction history and common technical issues related to account transactions.";

export const Route = createFileRoute("/wallet-guide")({
  head: () => {
    const base = pageHead({ path: "/wallet-guide", title: TITLE, description: DESC });
    return {
      ...base,
      scripts: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Wallet Guide", path: "/wallet-guide" },
        ]),
      ],
    };
  },
  component: WalletGuidePage,
});

function WalletGuidePage() {
  return (
    <InfoPage
      crumbLabel="Wallet Guide"
      badge="Account Help"
      title="Wallet & Transaction Guide"
      lead="A plain-language explanation of the wallet area — the terminology, what each transaction status means, how to read your history, and the technical issues people most often run into."
    >
      <InfoSection title="Understanding Wallet Information" icon={Wallet}>
        <p>
          The wallet is the signed-in area where your account's transaction information is displayed.
          It typically shows a list of recent entries with a method, a type (such as deposit or
          withdrawal), an amount and a status. You can reach it after logging in from the{" "}
          <HomeLink>Cricbet99 homepage</HomeLink>.
        </p>
        <p>
          This guide explains what the terms mean so the figures on screen are easy to interpret. It
          does not promise any particular processing speed or result — those depend on the method and
          external systems.
        </p>
      </InfoSection>

      <InfoSection title="Transaction Statuses" icon={Activity}>
        <p>Each transaction carries a status that describes where it is in its lifecycle:</p>
        <Bullets
          items={[
            "Pending — the transaction has been created and is waiting to be processed.",
            "Processing — it is actively being handled and the outcome is not final yet.",
            "Completed — it has finished successfully and is reflected in your balance.",
            "Failed — it did not go through; the amount is not applied.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Transaction History" icon={History}>
        <p>
          Your history is the running record of past entries, usually newest first. Reading it top to
          bottom helps you see the sequence of events and match each entry to what you expected.
        </p>
        <Bullets
          items={[
            "Check the date and time to line entries up with your own records.",
            "Match the method and amount to confirm an entry is the one you are looking for.",
            "Use the status column to see which entries are settled and which are still in progress.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Pending Transactions" icon={Hourglass}>
        <p>
          A pending entry simply means processing has not finished. The sensible first step is to
          wait and refresh, since statuses update as the transaction progresses. Avoid repeating the
          same action multiple times, which can create duplicate entries that are confusing to read
          later.
        </p>
      </InfoSection>

      <InfoSection title="Failed Transactions" icon={XCircle}>
        <p>A failed status means the transaction did not complete. Common, everyday reasons include:</p>
        <Bullets
          items={[
            "A network interruption during the attempt.",
            "Details entered that did not match what was expected.",
            "The attempt being cancelled or timing out before it finished.",
          ]}
        />
        <p>If an amount looks unclear after a failure, note the entry details and contact support rather than retrying blindly.</p>
      </InfoSection>

      <InfoSection title="Checking Transaction Details" icon={Search}>
        <Bullets
          items={[
            "Open the specific entry and note its date, time, method, amount and status.",
            "Compare those details against your own payment records.",
            "Keep any reference shown on screen — it makes a support query faster to resolve.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Common Technical Issues" icon={Wrench}>
        <Bullets
          items={[
            "The list not refreshing — reload the page or sign in again.",
            "A delay in a status updating — allow time and check back rather than repeating the action.",
            "Display problems on mobile — update your browser and check your connection, as covered in the login guide.",
          ]}
        />
      </InfoSection>

      <InfoSection title="When to Contact Support" icon={LifeBuoy}>
        <p>
          If an entry still looks wrong after you have checked its details and waited for it to
          settle, contact the support desk. Bring the transaction's date, time, method, amount,
          status and any reference. The{" "}
          <RouteLink to="/contact-us">Contact &amp; Support guide</RouteLink> lists exactly what to
          include.
        </p>
      </InfoSection>

      <RelatedPages
        links={[
          { to: "/login-help", label: "Login Help", desc: "Resolve sign-in issues to reach your wallet." },
          { to: "/contact-us", label: "Contact & Support", desc: "What to prepare before contacting the desk." },
          { to: "/how-it-works", label: "How It Works", desc: "Where the wallet fits in the website." },
          { to: "/faq", label: "FAQ", desc: "Common questions about transactions and more." },
        ]}
      />
    </InfoPage>
  );
}
