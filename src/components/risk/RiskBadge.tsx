import { cn } from "@/lib/utils";
import { riskMeta } from "@/lib/risk";
import type { RiskLevel, Severity } from "@/types/scan";
import { severityMeta } from "@/lib/risk";

export function RiskBadge({
  level,
  className,
  size = "md",
}: {
  level: RiskLevel;
  className?: string;
  size?: "sm" | "md";
}) {
  const meta = riskMeta[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold uppercase tracking-wide",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs",
        meta.bg,
        meta.ring,
        meta.text,
        className,
      )}
    >
      <span aria-hidden>{meta.symbol}</span>
      {level}
    </span>
  );
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  const { label, level } = severityMeta[severity];
  const meta = riskMeta[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        meta.bg,
        meta.ring,
        meta.text,
      )}
    >
      <span aria-hidden>{meta.symbol}</span>
      {label} severity
    </span>
  );
}
