import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeIndianRupee,
  Building2,
  Gift,
  Link2,
  Phone,
  QrCode,
  ShieldAlert,
  Siren,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn to Spot Scams — ScamShield" },
      {
        name: "description",
        content:
          "Common scam types in India, the red flags to look for, and what to do if you have already been scammed.",
      },
      { property: "og:title", content: "Learn to Spot Scams — ScamShield" },
      {
        property: "og:description",
        content: "A practical guide to UPI, KYC, lottery, job and QR scams — and how to report them.",
      },
    ],
  }),
  component: LearnPage,
});

const SCAM_TYPES = [
  {
    icon: BadgeIndianRupee,
    title: "UPI request scams",
    body: "Scammers send a collect request and call it a refund. Approving it sends money out, never in. You never enter a PIN to receive money.",
  },
  {
    icon: QrCode,
    title: "QR code scams",
    body: "A QR code is a payment instruction. Scanning one to “receive” cashback, a deposit refund or a rental advance always debits you.",
  },
  {
    icon: Building2,
    title: "Fake KYC and bank alerts",
    body: "An SMS says your KYC or PAN update expires today and links to a look-alike bank site that harvests your login and OTP.",
  },
  {
    icon: Gift,
    title: "Lottery and reward scams",
    body: "You won a prize you never entered for — but must first pay a processing fee or GST to release it.",
  },
  {
    icon: Phone,
    title: "Customer-care number scams",
    body: "A fake support number found via search asks you to install a screen-sharing app so they can “verify” your account.",
  },
  {
    icon: Link2,
    title: "Job and task scams",
    body: "Easy work-from-home tasks pay small amounts first, then ask for a deposit to unlock bigger payouts that never arrive.",
  },
];

const RED_FLAGS = [
  "A deadline: today, within 2 hours, immediately",
  "A threat: your account will be blocked or a case will be filed",
  "A link that looks almost like a brand you know",
  "A request for OTP, PIN, CVV or a screen-sharing app",
  "Payment asked over UPI, gift cards or crypto",
  "Grammar and formatting that don't match the real brand",
  "A reward that arrives before any effort from you",
];

const FAQS = [
  {
    q: "Does receiving money ever need a UPI PIN?",
    a: "No. A PIN is only ever required to send money. If an app asks for your PIN to complete a refund, cashback or prize, it is a debit in disguise.",
  },
  {
    q: "Is a short link automatically dangerous?",
    a: "Not automatically, but a short link hides its destination. Prefer expanding it or scanning it here before opening it, especially in an unexpected message.",
  },
  {
    q: "The site had a padlock. Doesn't that mean it's safe?",
    a: "HTTPS only means the connection is encrypted. Scam sites get certificates too. Always check the domain name itself, character by character.",
  },
  {
    q: "How do I report a financial cyber fraud in India?",
    a: "Call the national cyber-crime helpline 1930 as soon as possible and file a report at cybercrime.gov.in. Also inform your bank immediately to freeze the transaction.",
  },
];

function LearnPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Learn to Spot a Scam</h1>
        <p className="mt-3 text-muted-foreground">
          Scams work on urgency and familiarity. Once you recognise the pattern, they are much easier to
          refuse.
        </p>
      </header>

      <section aria-labelledby="types" className="mt-12">
        <h2 id="types" className="font-display text-2xl font-semibold">
          Common scam types in India
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SCAM_TYPES.map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-2xl border border-border bg-card/60 p-6">
              <span className="inline-flex rounded-xl border border-primary/30 bg-primary/10 p-2.5 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="flags" className="rounded-2xl border border-high/35 bg-high/8 p-6">
          <h2 id="flags" className="flex items-center gap-2 font-display text-xl font-semibold text-high">
            <ShieldAlert className="h-5 w-5" aria-hidden />
            Red flags checklist
          </h2>
          <ul className="mt-4 space-y-2.5">
            {RED_FLAGS.map((f) => (
              <li key={f} className="flex gap-3 text-sm text-foreground/90">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-high" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="scammed"
          className="rounded-2xl border border-critical/35 bg-critical/8 p-6"
        >
          <h2
            id="scammed"
            className="flex items-center gap-2 font-display text-xl font-semibold text-critical"
          >
            <Siren className="h-5 w-5" aria-hidden />
            If you were already scammed
          </h2>
          <ol className="mt-4 space-y-3 text-sm">
            {[
              "Call the cyber-crime helpline 1930 immediately — the first hours matter most.",
              "File a complaint at cybercrime.gov.in with screenshots and transaction IDs.",
              "Call your bank to freeze the account or reverse the transfer.",
              "Change passwords and revoke access for any app you installed on their instruction.",
              "Keep every message — do not delete the evidence.",
            ].map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-critical/50 font-mono text-xs text-critical">
                  {i + 1}
                </span>
                <span className="text-foreground/90">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section aria-labelledby="faq" className="mt-12">
        <h2 id="faq" className="font-display text-2xl font-semibold">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="mt-4">
          {FAQS.map(({ q, a }) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mt-12 rounded-3xl border border-primary/25 bg-card/60 p-8 text-center glow-border">
        <h2 className="font-display text-2xl font-bold">Got something suspicious right now?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Paste the link or message into ScamShield and get a risk breakdown in seconds.
        </p>
        <Button asChild variant="hero" size="xl" className="mt-6">
          <Link to="/scan">Scan it now</Link>
        </Button>
      </section>
    </div>
  );
}
