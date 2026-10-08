import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, LogOut, MessageCircle } from "lucide-react";
import {
  createDeposit,
  createWithdrawal,
  listMyTransactions,
} from "@/lib/wallet.functions";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/wallet")({
  head: () => ({
    meta: [
      { title: "Wallet — Cricbet99" },
      { name: "description", content: "Deposit, withdraw and view your Cricbet99 transaction history." },
      { property: "og:title", content: "Wallet — Cricbet99" },
      { property: "og:description", content: "Manage your Cricbet99 wallet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WalletPage,
});

type Method = "UPI" | "Paytm" | "Bank Transfer" | "Crypto";
const METHODS: Method[] = ["UPI", "Paytm", "Bank Transfer", "Crypto"];
const WHATSAPP_URL = "https://wa.me/917906047337?text=Hi%2C%20I%20submitted%20a%20request%20on%20Cricbet99";

function statusBadge(status: string) {
  const map: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800 border-amber-300",
    processing: "bg-blue-100 text-blue-800 border-blue-300",
    completed: "bg-emerald-100 text-emerald-800 border-emerald-300",
    failed: "bg-rose-100 text-rose-800 border-rose-300",
  };
  return `inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold capitalize ${map[status] ?? "bg-neutral-100 text-neutral-800 border-neutral-300"}`;
}

function WalletPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: txns = [], isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => listMyTransactions(),
  });

  const [tab, setTab] = useState<"deposit" | "withdrawal">("deposit");

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/40 bg-brand-2/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-gold text-primary font-black shadow-[var(--shadow-gold)]">
              C
            </div>
            <span className="logo-text text-2xl">CRICBET99</span>
          </Link>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-md border border-border/50 px-3 py-2 text-sm text-foreground/90 hover:text-gold"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      <section className="px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold md:text-4xl">
              Your <span className="logo-text">Wallet</span>
            </h1>
            <p className="mt-1 text-sm text-foreground/70">
              Submit a deposit or withdrawal — status updates live as our team processes it. For instant help, ping WhatsApp.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <div className="card-surface p-6">
              <div className="mb-4 flex gap-2">
                <button
                  onClick={() => setTab("deposit")}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${tab === "deposit" ? "bg-primary text-primary-foreground" : "bg-input text-primary"}`}
                >
                  <ArrowDownToLine className="mr-1 inline h-4 w-4" /> Deposit
                </button>
                <button
                  onClick={() => setTab("withdrawal")}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${tab === "withdrawal" ? "bg-primary text-primary-foreground" : "bg-input text-primary"}`}
                >
                  <ArrowUpFromLine className="mr-1 inline h-4 w-4" /> Withdraw
                </button>
              </div>

              {tab === "deposit" ? (
                <DepositForm onSuccess={() => qc.invalidateQueries({ queryKey: ["transactions"] })} />
              ) : (
                <WithdrawalForm onSuccess={() => qc.invalidateQueries({ queryKey: ["transactions"] })} />
              )}

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                Confirm on WhatsApp
              </a>
            </div>

            <div className="card-surface overflow-hidden">
              <div className="border-b border-border/30 bg-brand-2/60 px-5 py-3">
                <h2 className="text-sm font-bold text-foreground">Transaction history</h2>
              </div>
              {isLoading ? (
                <p className="p-6 text-sm text-muted-foreground">Loading…</p>
              ) : txns.length === 0 ? (
                <p className="p-6 text-sm text-muted-foreground">No transactions yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-brand-2 text-foreground">
                      <tr>
                        <th className="px-4 py-2 font-bold">Type</th>
                        <th className="px-4 py-2 font-bold">Method</th>
                        <th className="px-4 py-2 font-bold">Amount</th>
                        <th className="px-4 py-2 font-bold">Status</th>
                        <th className="px-4 py-2 font-bold">When</th>
                      </tr>
                    </thead>
                    <tbody className="text-primary">
                      {txns.map((t) => (
                        <tr key={t.id} className="border-t border-border/20">
                          <td className="px-4 py-2 capitalize">{t.type}</td>
                          <td className="px-4 py-2">{t.method}</td>
                          <td className="px-4 py-2 font-semibold">₹{t.amount_inr.toLocaleString("en-IN")}</td>
                          <td className="px-4 py-2">
                            <span className={statusBadge(t.status)}>{t.status}</span>
                          </td>
                          <td className="px-4 py-2 text-xs text-muted-foreground">
                            {new Date(t.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DepositForm({ onSuccess }: { onSuccess: () => void }) {
  const [method, setMethod] = useState<Method>("UPI");
  const [amount, setAmount] = useState<number>(500);
  const [reference, setReference] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (input: { method: Method; amount_inr: number; reference?: string }) =>
      createDeposit({ data: input }),
    onSuccess: () => {
      setError(null);
      setReference("");
      onSuccess();
    },
    onError: (e) => setError(e instanceof Error ? e.message : "Failed"),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate({ method, amount_inr: amount, reference: reference || undefined });
      }}
      className="space-y-4"
    >
      <FieldSelect label="Payment method" value={method} onChange={(v) => setMethod(v as Method)} options={METHODS} />
      <FieldAmount label="Amount (₹)" value={amount} onChange={setAmount} min={100} />
      <FieldText
        label="UTR / reference (optional)"
        value={reference}
        onChange={setReference}
        placeholder="e.g. UPI reference number"
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
      {mutation.isSuccess && !error && <p className="text-xs text-emerald-600">Deposit request submitted — status will update as we confirm receipt.</p>}
      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
      >
        {mutation.isPending ? "Submitting…" : "Submit deposit request"}
      </button>
    </form>
  );
}

function WithdrawalForm({ onSuccess }: { onSuccess: () => void }) {
  const [method, setMethod] = useState<Method>("UPI");
  const [amount, setAmount] = useState<number>(1000);
  const [upi, setUpi] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (input: { method: Method; amount_inr: number; upi_or_account: string }) =>
      createWithdrawal({ data: input }),
    onSuccess: () => {
      setError(null);
      setUpi("");
      onSuccess();
    },
    onError: (e) => setError(e instanceof Error ? e.message : "Failed"),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate({ method, amount_inr: amount, upi_or_account: upi });
      }}
      className="space-y-4"
    >
      <FieldSelect label="Payout method" value={method} onChange={(v) => setMethod(v as Method)} options={METHODS} />
      <FieldAmount label="Amount (₹)" value={amount} onChange={setAmount} min={500} />
      <FieldText
        label="UPI ID / account number"
        value={upi}
        onChange={setUpi}
        placeholder="yourname@upi"
        required
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
      {mutation.isSuccess && !error && <p className="text-xs text-emerald-600">Withdrawal requested — we&rsquo;ll process it within the stated window.</p>}
      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
      >
        {mutation.isPending ? "Submitting…" : "Request withdrawal"}
      </button>
    </form>
  );
}

function FieldSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-foreground/80">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-input bg-input px-3 py-2.5 text-sm text-primary outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function FieldAmount({ label, value, onChange, min }: { label: string; value: number; onChange: (v: number) => void; min: number }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-foreground/80">{label}</span>
      <input
        type="number"
        min={min}
        step={100}
        required
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg border border-input bg-input px-3 py-2.5 text-sm text-primary outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
      />
    </label>
  );
}

function FieldText({ label, value, onChange, placeholder, required }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-foreground/80">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-input bg-input px-3 py-2.5 text-sm text-primary outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
      />
    </label>
  );
}
