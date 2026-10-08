import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Cricbet99" },
      { name: "description", content: "Sign in or create a Cricbet99 account to manage deposits, withdrawals and your cricket ID." },
      { property: "og:title", content: "Sign in — Cricbet99" },
      { property: "og:description", content: "Sign in to your Cricbet99 account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const WHATSAPP_URL = "https://wa.me/917906047337?text=Hi%2C%20I%20want%20a%20new%20Cricbet99%20ID";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/wallet" });
    });
  }, [navigate]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + "/wallet",
            data: { full_name: displayName },
          },
        });
        if (error) throw error;
        setInfo("Account created. Check your email if confirmation is required, then sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/wallet" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError(result.error instanceof Error ? result.error.message : String(result.error));
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/wallet" });
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="logo-text text-4xl">CRICBET99</Link>
        </div>
        <div className="card-surface p-6 md:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold">
              {mode === "signin" ? "Sign in" : "Create account"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "signin"
                ? "Access your wallet and transaction history"
                : "Register in seconds to start depositing"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-input bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5"><path fill="#4285F4" d="M23 12.3c0-.8-.1-1.4-.2-2H12v3.8h6.2c-.3 1.4-1.1 2.6-2.4 3.4v2.8h3.9c2.3-2.1 3.6-5.2 3.6-8z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-2.8c-1.1.7-2.5 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3C3.3 21.4 7.3 24 12 24z"/><path fill="#FBBC05" d="M5.4 14.6c-.2-.7-.4-1.4-.4-2.1s.1-1.4.4-2.1V7.4H1.4C.5 9 0 10.9 0 12.5s.5 3.5 1.4 5.1l4-3z"/><path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.7l3.4-3.4C17.9 1.2 15.2 0 12 0 7.3 0 3.3 2.6 1.4 6.4l4 3C6.3 6.9 8.9 4.8 12 4.8z"/></svg>
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border/40" />
            or
            <div className="h-px flex-1 bg-border/40" />
          </div>

          <form onSubmit={handleEmail} className="space-y-4">
            {mode === "signup" && (
              <input
                type="text"
                required
                placeholder="Full name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-lg border border-input bg-input px-4 py-3 text-sm text-primary outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            )}
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-input bg-input px-4 py-3 text-sm text-primary outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-input bg-input px-4 py-3 text-sm text-primary outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
            />

            {error && <p className="text-xs text-destructive">{error}</p>}
            {info && <p className="text-xs text-secondary">{info}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-between rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              <span>{loading ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            {mode === "signin" ? (
              <>
                No account?{" "}
                <button className="font-semibold text-secondary hover:underline" onClick={() => setMode("signup")}>
                  Sign up
                </button>
              </>
            ) : (
              <>
                Have an account?{" "}
                <button className="font-semibold text-secondary hover:underline" onClick={() => setMode("signin")}>
                  Sign in
                </button>
              </>
            )}
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-whatsapp mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm"
          >
            <MessageCircle className="h-5 w-5" />
            Or get an ID directly on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
