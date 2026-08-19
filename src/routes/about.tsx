import { createFileRoute, Link } from "@tanstack/react-router";
import { Cpu, Layers, Lock, Server, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrivacyNote } from "@/components/common/PrivacyNote";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ScamShield — How the Detection Works" },
      {
        name: "description",
        content:
          "How ScamShield analyzes URLs, screenshots, QR codes and messages, its architecture, limitations and privacy approach.",
      },
      { property: "og:title", content: "About ScamShield — How the Detection Works" },
      {
        property: "og:description",
        content: "The detection engines, risk model, roadmap and limitations behind ScamShield.",
      },
    ],
  }),
  component: AboutPage,
});

const STACK = [
  { icon: Layers, title: "React Frontend", body: "React, TypeScript, Vite, Tailwind and shadcn/ui." },
  { icon: Server, title: "API Service Layer", body: "A single typed boundary the UI talks to." },
  { icon: Cpu, title: "Detection Engines", body: "URL analysis, OCR, QR decoding and message NLP." },
  { icon: Sparkles, title: "Risk Engine", body: "Weighted scoring into a 0–100 score and five levels." },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">About ScamShield</h1>
        <p className="mt-3 text-muted-foreground">
          ScamShield gives people a second opinion before they click, pay or reply — in plain language,
          with the reasoning shown.
        </p>
      </header>

      <section aria-labelledby="mission" className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card/60 p-6">
          <h2 id="mission" className="font-display text-xl font-semibold">
            Why it exists
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Digital payments in India moved faster than digital safety habits. A single tap can move money
            instantly, and scammers design messages that feel routine. ScamShield turns those signals into
            an explicit, explainable score so the decision doesn&apos;t rely on gut feeling.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card/60 p-6">
          <h2 className="font-display text-xl font-semibold">How scoring works</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Each engine emits indicators with a severity. The risk engine weights them, accounts for
            overlap, and maps the total onto a 0–100 score: Safe (0–19), Low (20–39), Medium (40–59),
            High (60–79) and Critical (80–100). Every indicator is shown with the result, so nothing is a
            black box.
          </p>
        </div>
      </section>

      <section aria-labelledby="arch" className="mt-12">
        <h2 id="arch" className="font-display text-2xl font-semibold">
          Architecture
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STACK.map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-2xl border border-border bg-card/60 p-5">
              <Icon className="h-5 w-5 text-primary" aria-hidden />
              <h3 className="mt-3 font-display text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-border bg-background/50 p-4 font-mono text-xs text-muted-foreground">
          React Frontend → API Service Layer → FastAPI Backend → Detection Engines → Risk Engine →
          Analysis Result
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          The frontend already speaks the final contract. Until a FastAPI backend is connected, the service
          layer answers from a local heuristic engine and every result is marked as a demo analysis.
          Pointing <code className="font-mono text-primary">VITE_API_BASE_URL</code> at the real backend
          switches the same calls over without UI changes.
        </p>
      </section>

      <section aria-labelledby="limits" className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-medium/35 bg-medium/8 p-6">
          <h2 id="limits" className="flex items-center gap-2 font-display text-xl font-semibold text-medium">
            <Lock className="h-5 w-5" aria-hidden />
            Limitations
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-foreground/90">
            {[
              "ScamShield is an assistant, not a guarantee. A low score is not proof something is safe.",
              "Demo analysis uses heuristics, not live threat intelligence feeds.",
              "It never opens links, logs in, or makes any payment on your behalf.",
              "Brand names appear only for detection purposes; there is no affiliation with them.",
            ].map((l) => (
              <li key={l} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-medium" aria-hidden />
                {l}
              </li>
            ))}
          </ul>
        </div>
        <PrivacyNote />
      </section>

      <section className="mt-12 rounded-3xl border border-primary/25 bg-card/60 p-8 text-center glow-border">
        <h2 className="font-display text-2xl font-bold">Scan Before You Trust.</h2>
        <Button asChild variant="hero" size="xl" className="mt-6">
          <Link to="/scan">Open the scanner</Link>
        </Button>
      </section>
    </div>
  );
}
