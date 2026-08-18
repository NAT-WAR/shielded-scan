import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/landing/Hero";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Button } from "@/components/ui/button";
import { PrivacyNote } from "@/components/common/PrivacyNote";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ScamShield — Don't Get Scammed. Scan It First." },
      {
        name: "description",
        content:
          "Scan suspicious websites, screenshots, QR codes and SMS for scam signals and get a clear risk score with reasons and safety advice.",
      },
      { property: "og:title", content: "ScamShield — Don't Get Scammed. Scan It First." },
      {
        property: "og:description",
        content:
          "Multi-modal scam detection built for Indian users: URL, screenshot, QR and message analysis.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorks />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-3xl border border-primary/25 bg-card/60 p-8 sm:p-12 glow-border">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Check it before you tap, pay or reply.
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Run your first scan in seconds. No sign-up, no credentials, no payments — ever.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="xl">
                <Link to="/scan">Scan Now</Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link to="/learn">Learn to spot a scam</Link>
              </Button>
            </div>
          </div>
          <PrivacyNote />
        </div>
      </section>
    </>
  );
}
