import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const DEFAULT_STEPS = [
  "Input received",
  "Extracting indicators",
  "Checking suspicious patterns",
  "Analyzing content",
  "Calculating risk",
];

export function ScanProgress({ steps = DEFAULT_STEPS }: { steps?: string[] }) {
  const [done, setDone] = useState(0);
  const [progress, setProgress] = useState(4);

  useEffect(() => {
    const stepTimer = window.setInterval(
      () => setDone((d) => Math.min(steps.length, d + 1)),
      420,
    );
    const barTimer = window.setInterval(
      () => setProgress((p) => Math.min(96, p + Math.random() * 9)),
      120,
    );
    return () => {
      window.clearInterval(stepTimer);
      window.clearInterval(barTimer);
    };
  }, [steps.length]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative mx-auto max-w-xl overflow-hidden rounded-2xl border border-primary/30 bg-card/70 p-8 text-center glow-border"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 animate-scan-line bg-[linear-gradient(to_bottom,transparent,color-mix(in_oklab,var(--primary)_22%,transparent),transparent)]"
        aria-hidden
      />
      <Logo className="mx-auto h-14 w-14 animate-float" />
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.35em] text-primary">ScamShield AI</p>
      <h2 className="mt-2 font-display text-2xl font-bold">Analyzing…</h2>

      <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-[image:var(--gradient-cyan)] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 font-mono text-xs text-muted-foreground">{Math.round(progress)}%</p>

      <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left">
        {steps.map((s, i) => {
          const complete = i < done;
          const active = i === done;
          return (
            <li
              key={s}
              className={cn(
                "flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-sm transition-colors",
                complete && "text-foreground",
                active && "border-primary/30 bg-primary/5 text-foreground",
                !complete && !active && "text-muted-foreground/60",
              )}
            >
              {complete ? (
                <Check className="h-4 w-4 text-safe" aria-hidden />
              ) : active ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" aria-hidden />
              ) : (
                <span className="h-4 w-4 rounded-full border border-border" aria-hidden />
              )}
              {s}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
