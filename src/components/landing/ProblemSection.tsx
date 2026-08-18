import { AlertTriangle, CheckCircle2 } from "lucide-react";

const EXAMPLES = [
  "“Your KYC will expire.”",
  "“Your electricity bill is pending.”",
  "“Congratulations! You won ₹50,000.”",
  "“Scan this QR code to receive payment.”",
  "“Your account will be blocked.”",
];

const TACTICS = [
  "Urgency",
  "Fear",
  "Fake rewards",
  "Brand impersonation",
  "Fake payment requests",
  "Fake KYC notifications",
  "Suspicious links",
];

export function ProblemSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Scams Don&apos;t Always Look Like Scams.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Most scams in India arrive as an ordinary looking message. They borrow a familiar brand, add a
          deadline, and ask for one small action.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <ul className="space-y-3">
          {EXAMPLES.map((e) => (
            <li
              key={e}
              className="rounded-xl border border-border bg-card/50 px-5 py-4 font-mono text-sm text-muted-foreground"
            >
              {e}
            </li>
          ))}
          <li className="flex flex-wrap gap-2 pt-2">
            {TACTICS.map((t) => (
              <span
                key={t}
                className="rounded-full border border-high/30 bg-high/10 px-3 py-1 text-xs font-medium text-high"
              >
                {t}
              </span>
            ))}
          </li>
        </ul>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <article className="rounded-2xl border border-safe/30 bg-safe/8 p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-safe">
              <CheckCircle2 className="h-4 w-4" aria-hidden />
              Normal message
            </h3>
            <p className="mt-3 rounded-lg bg-background/50 p-4 text-sm leading-relaxed">
              Your order #48213 has been delivered. Track or return it from the Orders section in the app.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
              <li>No deadline or threat</li>
              <li>No link required to act</li>
              <li>Points you back to the official app</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-critical/35 bg-critical/8 p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-critical">
              <AlertTriangle className="h-4 w-4" aria-hidden />
              Scam message
            </h3>
            <p className="mt-3 rounded-lg bg-background/50 p-4 text-sm leading-relaxed">
              URGENT: Your KYC expires today. Update now or your account will be blocked —
              http://kyc-verify-secure.example.net
            </p>
            <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
              <li>Deadline plus a threat</li>
              <li>Look-alike domain in the link</li>
              <li>Pushes you away from official channels</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
