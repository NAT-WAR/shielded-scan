import { ShieldCheck, ShieldAlert, Check } from "lucide-react";
import type { RiskLevel } from "@/types/scan";
import { riskMeta } from "@/lib/risk";
import { cn } from "@/lib/utils";

export function RecommendationCard({
  riskLevel,
  recommendations,
}: {
  riskLevel: RiskLevel;
  recommendations: string[];
}) {
  const meta = riskMeta[riskLevel];
  const dangerous = riskLevel === "HIGH" || riskLevel === "CRITICAL";
  const Icon = dangerous ? ShieldAlert : ShieldCheck;

  return (
    <section
      aria-labelledby="recommendation-heading"
      className={cn("rounded-2xl border p-6 sm:p-8", meta.ring, meta.bg)}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 h-7 w-7 shrink-0", meta.text)} aria-hidden />
        <div>
          <h2 id="recommendation-heading" className="font-display text-2xl font-bold">
            {dangerous
              ? "Do Not Interact With This Request"
              : riskLevel === "MEDIUM"
                ? "Proceed Only After Verifying"
                : "No Immediate Action Needed"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Recommended next steps based on the indicators found.
          </p>
        </div>
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {recommendations.map((r) => (
          <li key={r} className="flex items-start gap-2.5 rounded-lg bg-background/40 p-3 text-sm">
            <Check className={cn("mt-0.5 h-4 w-4 shrink-0", meta.text)} aria-hidden />
            <span>{r}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 rounded-lg border border-border bg-background/60 p-3 text-sm font-medium">
        ScamShield never asks for your OTP, PIN, password or card details.
      </p>
    </section>
  );
}
