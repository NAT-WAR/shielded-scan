import { useState } from "react";
import { ChevronDown, AlertTriangle } from "lucide-react";
import type { Indicator } from "@/types/scan";
import { SeverityBadge } from "@/components/risk/RiskBadge";
import { severityMeta, riskMeta } from "@/lib/risk";
import { cn } from "@/lib/utils";

export function IndicatorCard({ indicator }: { indicator: Indicator }) {
  const [open, setOpen] = useState(false);
  const meta = riskMeta[severityMeta[indicator.severity].level];

  return (
    <div className={cn("rounded-xl border bg-card/60 p-4 transition-colors", meta.ring)}>
      <div className="flex items-start gap-3">
        <span className={cn("mt-0.5 rounded-lg p-2", meta.bg, meta.text)} aria-hidden>
          <AlertTriangle className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-semibold">{indicator.title}</h3>
            <SeverityBadge severity={indicator.severity} />
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{indicator.description}</p>

          {indicator.details && (
            <>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                Technical details
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
              </button>
              {open && (
                <p className="mt-2 rounded-lg border border-border bg-background/60 p-3 font-mono text-xs leading-relaxed text-muted-foreground">
                  {indicator.details}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
