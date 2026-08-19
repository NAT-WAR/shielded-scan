import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowLeft, Copy, Download, RefreshCw, ShieldQuestion } from "lucide-react";
import type { ScanResult } from "@/types/scan";
import { getScanResult } from "@/services/api";
import { RiskScore } from "@/components/risk/RiskScore";
import { IndicatorCard } from "@/components/result/IndicatorCard";
import { RecommendationCard } from "@/components/result/RecommendationCard";
import { TechnicalAnalysisPanel } from "@/components/result/TechnicalAnalysisPanel";
import { DemoBadge } from "@/components/common/DemoBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { inputTypeLabel, formatDate } from "@/lib/risk";

export const Route = createFileRoute("/results/$id")({
  head: () => ({
    meta: [
      { title: "Scan Result — ScamShield" },
      {
        name: "description",
        content:
          "Detailed scam risk score with the indicators found, technical analysis and recommended safety steps.",
      },
      { property: "og:title", content: "Scan Result — ScamShield" },
      {
        property: "og:description",
        content: "See why a link, message, QR code or screenshot was flagged, and what to do next.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResultPage,
});

function ResultPage() {
  const { id } = Route.useParams();
  const [result, setResult] = useState<ScanResult | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "missing">("loading");

  useEffect(() => {
    let alive = true;
    setState("loading");
    getScanResult(id)
      .then((r) => {
        if (!alive) return;
        setResult(r);
        setState("ready");
      })
      .catch(() => alive && setState("missing"));
    return () => {
      alive = false;
    };
  }, [id]);

  const sorted = useMemo(() => {
    if (!result) return [];
    const order = { critical: 0, high: 1, medium: 2, low: 3, info: 4 } as const;
    return [...result.indicators].sort((a, b) => order[a.severity] - order[b.severity]);
  }, [result]);

  if (state === "loading") {
    return (
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-14 sm:px-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
    );
  }

  if (state === "missing" || !result) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <EmptyState
          icon={<ShieldQuestion className="h-7 w-7" aria-hidden />}
          title="We couldn't find that scan"
          description={"This result may have expired or been cleared from this device.\nRun the scan again to get a fresh analysis."}
          action={
            <Button asChild variant="hero">
              <Link to="/scan">Start a new scan</Link>
            </Button>
          }
        />
      </div>
    );
  }

  function copyReport() {
    if (!result) return;
    const text = [
      `ScamShield report — ${inputTypeLabel[result.input_type]}`,
      `Target: ${result.target}`,
      `Risk: ${result.risk_level} (${result.risk_score}/100)`,
      `Summary: ${result.summary}`,
      "",
      "Indicators:",
      ...result.indicators.map((i) => `- [${i.severity}] ${i.title}: ${i.description}`),
      "",
      "Recommended actions:",
      ...result.recommendations.map((r) => `- ${r}`),
    ].join("\n");
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Report copied to clipboard"))
      .catch(() => toast.error("Couldn't copy the report"));
  }

  function downloadReport() {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scamshield-${result.scan_id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link
        to="/scan"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        New scan
      </Link>

      <section className="mt-6 rounded-3xl border border-border bg-card/60 p-6 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
          <RiskScore score={result.risk_score} riskLevel={result.risk_level} confidence={result.confidence} />

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                {inputTypeLabel[result.input_type]}
              </span>
              <span className="text-xs text-muted-foreground">{formatDate(result.created_at)}</span>
              {result.demo && <DemoBadge />}
            </div>

            <h1 className="mt-4 break-words font-display text-2xl font-bold sm:text-3xl">
              {result.summary}
            </h1>

            <p className="mt-3 break-all rounded-xl border border-border bg-background/50 px-4 py-3 font-mono text-sm text-muted-foreground">
              {result.target}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="glass" onClick={copyReport}>
                <Copy className="h-4 w-4" aria-hidden />
                Copy report
              </Button>
              <Button variant="glass" onClick={downloadReport}>
                <Download className="h-4 w-4" aria-hidden />
                Download JSON
              </Button>
              <Button asChild variant="neon">
                <Link to="/scan" search={{ type: result.input_type }}>
                  <RefreshCw className="h-4 w-4" aria-hidden />
                  Scan something else
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section aria-labelledby="why-heading">
          <h2 id="why-heading" className="font-display text-xl font-semibold">
            Why this score?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {sorted.length} indicator{sorted.length === 1 ? "" : "s"} contributed to this result.
          </p>
          <div className="mt-5 space-y-4">
            {sorted.map((indicator, i) => (
              <IndicatorCard key={`${indicator.title}-${i}`} indicator={indicator} />
            ))}
          </div>
        </section>

        <div className="space-y-8">
          <RecommendationCard riskLevel={result.risk_level} recommendations={result.recommendations} />
          <TechnicalAnalysisPanel analysis={result.technical_analysis} />
        </div>
      </div>
    </div>
  );
}
