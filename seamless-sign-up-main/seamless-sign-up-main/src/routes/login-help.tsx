import { createFileRoute } from "@tanstack/react-router";
import { LogIn, KeyRound, RefreshCw, Globe, Smartphone, Clock, ShieldAlert } from "lucide-react";
import {
  InfoPage,
  InfoSection,
  Bullets,
  Steps,
  FaqAccordion,
  RelatedPages,
  HomeLink,
  RouteLink,
} from "@/components/info-ui";
import { pageHead, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

const TITLE = "Cricbet99 Login Help | Account Access Guide";
const DESC =
  "Troubleshoot common login and account-access issues, including password problems, browser issues, sessions and account support.";

const FAQS = [
  {
    q: "The login page says my details are incorrect. What should I check?",
    a: "Confirm you are using the exact username or email registered to the account, check for accidental spaces, and make sure Caps Lock is off. Re-type the details slowly rather than relying on autofill.",
  },
  {
    q: "I keep getting signed out. Why?",
    a: "Sessions can end after a period of inactivity or when cookies are cleared. Signing in again usually restores access. If it happens repeatedly, try a different browser or device to narrow down the cause.",
  },
  {
    q: "The page will not load properly on my phone.",
    a: "Close and reopen the browser, make sure the app or browser is up to date, and check your internet connection. Switching between mobile data and Wi-Fi can also help.",
  },
  {
    q: "Should I share my password with support to get help faster?",
    a: "No. Never share your password or one-time codes with anyone, including support. A genuine support request never needs your password to help you.",
  },
];

export const Route = createFileRoute("/login-help")({
  head: () => {
    const base = pageHead({ path: "/login-help", title: TITLE, description: DESC });
    return {
      ...base,
      scripts: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Login Help", path: "/login-help" },
        ]),
        faqJsonLd(FAQS),
      ],
    };
  },
  component: LoginHelpPage,
});

function LoginHelpPage() {
  return (
    <InfoPage
      crumbLabel="Login Help"
      badge="Account Access"
      title="Cricbet99 Login Help"
      lead="A calm, step-by-step guide to the most common sign-in problems — wrong details, password trouble, browser and cache issues, mobile quirks and sessions — so you can get back into your account."
    >
      <InfoSection title="Login Basics" icon={LogIn}>
        <p>
          Signing in starts at the login form on the <HomeLink>Cricbet99 homepage</HomeLink>. Enter
          the username or email tied to your account along with your password. If something does not
          work, move through the sections below in order — most access problems are resolved by one
          of these simple checks.
        </p>
      </InfoSection>

      <InfoSection title="Incorrect Login Details" icon={LogIn}>
        <p>“Incorrect details” is the most common message. Work through it like this:</p>
        <Steps
          items={[
            "Re-type your username or email carefully, watching for extra spaces.",
            "Turn off Caps Lock and re-enter the password by hand instead of using autofill.",
            "Confirm you are using the account you actually registered with, not a similar one.",
            "If it still fails, move on to the password section below.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Password Problems" icon={KeyRound}>
        <p>
          If you are sure the username is right but the password is not accepted, use the “Forgot
          Password?” option on the login area to begin a reset rather than guessing repeatedly.
        </p>
        <Bullets
          items={[
            "Follow the reset flow fully before trying to sign in again.",
            "Choose a password you can recall but others cannot easily guess.",
            "Never type your password into any page that is not the official login form.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Browser and Cache Issues" icon={RefreshCw}>
        <p>Outdated stored data is a frequent, easily fixed cause of sign-in trouble:</p>
        <Bullets
          items={[
            "Refresh the page, then try again.",
            "Clear your browser cache and cookies for the site.",
            "Disable extensions that might block scripts or cookies, then retry.",
            "Update your browser to the latest version.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Mobile Login Issues" icon={Smartphone}>
        <Bullets
          items={[
            "Fully close the browser or app and reopen it.",
            "Switch between mobile data and Wi-Fi to rule out a weak connection.",
            "Make sure your device date and time are set automatically — a wrong clock can break secure sign-in.",
            "Try a different mobile browser to see whether the issue follows you.",
          ]}
        />
      </InfoSection>

      <InfoSection title="Session Problems" icon={Clock}>
        <p>
          If you are signed out unexpectedly or an action seems stuck, your session may have expired.
          Sign in again to refresh it. Avoid opening the same account in several tabs at once, as
          this can cause conflicting sessions.
        </p>
      </InfoSection>

      <InfoSection title="When to Contact Support" icon={ShieldAlert}>
        <p>
          If you have worked through every step and still cannot sign in, reach out through the
          support desk. The <RouteLink to="/contact-us">Contact &amp; Support guide</RouteLink>{" "}
          explains what to include so the team can help quickly. Remember: you will never be asked
          for your password or one-time codes, so do not share them with anyone.
        </p>
      </InfoSection>

      <FaqAccordion title="Common Login Questions" items={FAQS} />

      <RelatedPages
        links={[
          { to: "/contact-us", label: "Contact & Support", desc: "Reach the support desk with the right details." },
          { to: "/wallet-guide", label: "Wallet Guide", desc: "Understand the account and transaction area." },
          { to: "/how-it-works", label: "How It Works", desc: "See how the account area fits into the site." },
          { to: "/faq", label: "FAQ", desc: "Answers across the whole platform." },
        ]}
      />
    </InfoPage>
  );
}
