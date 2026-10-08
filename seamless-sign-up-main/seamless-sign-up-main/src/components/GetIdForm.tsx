import { useState } from "react";
import { z } from "zod";
import { MessageCircle, ShieldCheck, User as UserIcon, Mail, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "917906047337";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name")
    .max(60, "Name too long")
    .regex(/^[a-zA-Z\s.'-]+$/, "Only letters, spaces and . ' - allowed"),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9\s-]{7,20}$/, "Enter a valid phone number"),
  region: z.enum(["India", "Dubai / UAE", "Other"]),
});

export type GetIdFormValues = z.infer<typeof schema>;

export function GetIdForm({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState<GetIdFormValues>({
    name: "",
    email: "",
    phone: "",
    region: "India",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof GetIdFormValues, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof GetIdFormValues>(key: K, value: GetIdFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof GetIdFormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof GetIdFormValues;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      return;
    }
    setSubmitting(true);
    const { name, email, phone, region } = parsed.data;
    const message =
      `Hi Cricbet99, I want a new ID.\n\n` +
      `• Name: ${name}\n` +
      `• Email: ${email}\n` +
      `• Phone: ${phone}\n` +
      `• Region: ${region}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => setSubmitting(false), 800);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      <div className="grid gap-3 md:grid-cols-2">
        <Field
          icon={UserIcon}
          type="text"
          placeholder="Full name"
          value={values.name}
          onChange={(v) => update("name", v)}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          icon={Mail}
          type="email"
          placeholder="Email address"
          value={values.email}
          onChange={(v) => update("email", v)}
          error={errors.email}
          autoComplete="email"
        />
        <Field
          icon={Phone}
          type="tel"
          placeholder="Phone (with country code)"
          value={values.phone}
          onChange={(v) => update("phone", v)}
          error={errors.phone}
          autoComplete="tel"
        />
        <div>
          <div className="relative">
            <select
              value={values.region}
              onChange={(e) => update("region", e.target.value as GetIdFormValues["region"])}
              className="w-full appearance-none rounded-lg border border-input bg-input px-4 py-3 text-sm font-medium text-primary outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
            >
              <option>India</option>
              <option>Dubai / UAE</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-whatsapp flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm disabled:opacity-70"
      >
        <MessageCircle className="h-5 w-5" />
        {submitting ? "Opening WhatsApp…" : "Send to WhatsApp & Get My ID"}
      </button>

      {!compact && (
        <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground whitespace-pre-line">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          Encrypted form • Your details go only to our verified WhatsApp desk
        </p>
      )}
    </form>
  );
}

type FieldProps = {
  icon: React.ComponentType<{ className?: string }>;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
};

function Field({ icon: Icon, type, placeholder, value, onChange, error, autoComplete }: FieldProps) {
  return (
    <div>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full rounded-lg border bg-input px-4 py-3 pl-9 text-sm text-primary outline-none focus:ring-2 focus:ring-ring/30 ${
            error ? "border-destructive focus:border-destructive" : "border-input focus:border-ring"
          }`}
        />
      </div>
      {error && <p className="mt-1 text-[11px] font-medium text-destructive">{error}</p>}
    </div>
  );
}
