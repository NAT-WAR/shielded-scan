import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { ScanVisual } from "./ScanVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-gradient">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.35]" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
            Scan Before You Trust.
          </span>

          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
            Don&apos;t Get Scammed.{" "}
            <span className="text-gradient">Scan It First.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Analyze suspicious websites, QR codes, screenshots and messages before they put your money,
            identity or account at risk.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <Link to="/scan">
                Scan Now
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            {[
              ["4", "Detection layers"],
              ["5", "Risk levels"],
              ["0", "Credentials required"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl border border-border bg-card/50 p-4">
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold text-primary">{value}</span>
                  <span className="block text-xs text-muted-foreground">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ScanVisual />
      </div>
    </section>
  );
}
