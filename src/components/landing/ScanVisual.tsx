import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Globe, Image as ImageIcon, MessageSquare, QrCode } from "lucide-react";

const LINES = [
  "Extracting indicators",
  "Checking domain structure",
  "Detecting urgency language",
  "Scoring risk",
];

/** Decorative, self-running scan visualization for the hero. */
export function ScanVisual() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setPct((p) => (p >= 91 ? 0 : p + 1)), 45);
    return () => window.clearInterval(id);
  }, []);

  const active = Math.min(LINES.length - 1, Math.floor((pct / 91) * LINES.length));

  return (
    <div className="relative" aria-hidden>
      <div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_30%,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_65%)] blur-2xl" />
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-card/70 p-6 glow-border backdrop-blur-xl sm:p-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scan-line bg-[linear-gradient(to_bottom,transparent,color-mix(in_oklab,var(--primary)_18%,transparent),transparent)]" />

        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            ScamShield AI
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            live demo
          </span>
        </div>

        <div className="relative mx-auto mt-6 flex h-44 w-44 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-primary/25" />
          <div className="absolute inset-6 rounded-full border border-primary/20" />
          <div className="absolute inset-12 rounded-full border border-primary/15" />
          <div className="absolute inset-0 animate-radar rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,color-mix(in_oklab,var(--primary)_30%,transparent)_40deg,transparent_80deg)]" />
          <Logo className="relative h-16 w-16" />
        </div>

        <p className="mt-4 text-center font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Analyzing input
        </p>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-[image:var(--gradient-cyan)]"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between font-mono text-xs">
          <span className="text-muted-foreground">{LINES[active]}</span>
          <span className="tabular-nums text-primary">{pct}%</span>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-xl border border-high/40 bg-high/10 px-4 py-3">
          <span className="font-display text-sm font-semibold text-high">▲ HIGH RISK</span>
          <span className="font-mono text-xs text-muted-foreground">sample output</span>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-2">
          {[Globe, ImageIcon, QrCode, MessageSquare].map((Icon, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-lg border border-border bg-background/50 py-3 text-primary"
            >
              <Icon className="h-4 w-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
