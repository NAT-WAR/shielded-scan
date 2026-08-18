import { useState } from "react";
import { ChevronDown, Cpu } from "lucide-react";
import type { EngineStatus, TechnicalAnalysis } from "@/types/scan";
import { cn } from "@/lib/utils";

const ENGINES: { key: keyof TechnicalAnalysis; label: string; note: string }[] = [
  { key: "url_engine", label: "URL Analyzer", note: "Domain, protocol, redirects, typosquatting" },
  { key: "ocr_engine", label: "OCR Analyzer", note: "Text extraction from images (Tesseract/OpenCV)" },
  { key: "qr_engine", label: "QR Analyzer", note: "QR decode, UPI intent parsing" },
  { key: "nlp_engine", label: "NLP Analyzer", note: "Scam-pattern language classification" },
  { key: "threat_intel", label: "Threat Intel", note: "External reputation feeds" },
  { key: "risk_engine", label: "Risk Engine", note: "Weighted score aggregation" },
];

const STATUS_TEXT: Record<EngineStatus, { label: string; symbol: string; cls: string }> = {
  complete: { label: "Complete", symbol: "✓", cls: "text-safe" },
  not_applicable: { label: "Not applicable", symbol: "—", cls: "text-muted-foreground" },
  failed: { label: "Failed", symbol: "✕", cls: "text-critical" },
  unavailable: { label: "Unavailable", symbol: "○", cls: "text-medium" },
};

const PIPELINE = [
  "Input",
  "Preprocessing",
  "URL Engine",
  "OCR Engine",
  "NLP Engine",
  "QR Engine",
  "Threat Intelligence",
  "Risk Engine",
  "Final Score",
];

export function TechnicalAnalysisPanel({ analysis }: { analysis: TechnicalAnalysis }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-2xl border border-border bg-card/60">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 p-5 text-left"
      >
        <span className="flex items-center gap-3">
          <Cpu className="h-5 w-5 text-primary" aria-hidden />
          <span>
            <span className="block font-display text-lg font-semibold">Technical Analysis</span>
            <span className="block text-sm text-muted-foreground">
              Detection pipeline and per-engine status
            </span>
          </span>
        </span>
        <ChevronDown className={cn("h-5 w-5 shrink-0 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="grid gap-6 border-t border-border p-5 lg:grid-cols-2">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Engine status
            </h3>
            <ul className="mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border">
              {ENGINES.map((e) => {
                const status = STATUS_TEXT[analysis[e.key]];
                return (
                  <li key={e.key} className="flex items-center justify-between gap-3 bg-background/40 p-3">
                    <span>
                      <span className="block font-mono text-sm">{e.label}</span>
                      <span className="block text-xs text-muted-foreground">{e.note}</span>
                    </span>
                    <span className={cn("shrink-0 font-mono text-xs font-semibold", status.cls)}>
                      <span aria-hidden>{status.symbol} </span>
                      {status.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Pipeline
            </h3>
            <ol className="mt-3 space-y-1.5">
              {PIPELINE.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-primary/40 bg-primary/10 font-mono text-[10px] text-primary">
                    {i + 1}
                  </span>
                  <span className="font-mono text-sm text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 rounded-lg border border-border bg-background/50 p-3 text-xs text-muted-foreground">
              In this build the pipeline runs as a browser-side demo engine. The same contract is designed
              for a Python/FastAPI service running OpenCV, Tesseract OCR and scikit-learn models.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
