import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Globe, Image as ImageIcon, MessageSquare, QrCode, Camera } from "lucide-react";
import { UrlInput } from "@/components/scan/UrlInput";
import { MessageInput } from "@/components/scan/MessageInput";
import { UploadBox } from "@/components/scan/UploadBox";
import { ScanProgress } from "@/components/scan/ScanProgress";
import { PrivacyNote } from "@/components/common/PrivacyNote";
import { ErrorState } from "@/components/common/ErrorState";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ScanInputType } from "@/types/scan";
import {
  ScamShieldError,
  analyzeMessage,
  analyzeQr,
  analyzeScreenshot,
  analyzeUrl,
} from "@/services/api";

const searchSchema = z.object({
  type: z.enum(["url", "screenshot", "qr", "message"]).optional(),
});

export const Route = createFileRoute("/scan")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Scan a URL, Screenshot, QR or Message — ScamShield" },
      {
        name: "description",
        content:
          "Choose an input type and let ScamShield analyze a suspicious website, screenshot, QR code or SMS for scam indicators.",
      },
      { property: "og:title", content: "Scan a URL, Screenshot, QR or Message — ScamShield" },
      {
        property: "og:description",
        content: "Multi-modal scanner: URL analysis, OCR, QR decoding and message NLP in one place.",
      },
    ],
  }),
  component: ScanPage,
});

const OPTIONS: { type: ScanInputType; label: string; icon: typeof Globe; hint: string }[] = [
  { type: "url", label: "Website URL", icon: Globe, hint: "Links from SMS, email or ads" },
  { type: "screenshot", label: "Screenshot", icon: ImageIcon, hint: "Chats, payment pages, notices" },
  { type: "qr", label: "QR Code", icon: QrCode, hint: "Payment and merchant QR images" },
  { type: "message", label: "Message", icon: MessageSquare, hint: "SMS, WhatsApp, email text" },
];

const STEP_SETS: Record<ScanInputType, string[]> = {
  url: [
    "Input received",
    "Parsing URL structure",
    "Checking brand impersonation",
    "Inspecting parameters",
    "Calculating risk",
  ],
  screenshot: [
    "Image processed",
    "OCR completed",
    "Suspicious phrases detected",
    "Pattern classification",
    "Risk analysis completed",
  ],
  qr: [
    "Image processed",
    "QR decoded",
    "Destination inspected",
    "Payment intent parsed",
    "Calculating risk",
  ],
  message: [
    "Input received",
    "Tokenizing message",
    "Checking urgency and threats",
    "Detecting credential requests",
    "Calculating risk",
  ],
};

function ScanPage() {
  const { type } = Route.useSearch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<ScanInputType>(type ?? "url");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(task: Promise<{ scan_id: string }>) {
    setBusy(true);
    setError(null);
    try {
      const result = await task;
      navigate({ to: "/results/$id", params: { id: result.scan_id } });
    } catch (err) {
      setError(
        err instanceof ScamShieldError
          ? err.message
          : "The analysis couldn't be completed right now. Please try again.",
      );
      setBusy(false);
    }
  }

  function choose(next: ScanInputType) {
    setSelected(next);
    setError(null);
    navigate({ to: "/scan", search: { type: next }, replace: true });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">What do you want to check?</h1>
        <p className="mt-3 text-muted-foreground">
          Choose an input type and let ScamShield analyze it.
        </p>
      </header>

      <div
        role="radiogroup"
        aria-label="Scan input type"
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {OPTIONS.map(({ type: t, label, icon: Icon, hint }) => {
          const active = selected === t;
          return (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => choose(t)}
              className={cn(
                "min-h-28 rounded-2xl border p-5 text-left transition-all duration-200",
                active
                  ? "border-primary bg-primary/10 shadow-[0_18px_44px_-24px_color-mix(in_oklab,var(--primary)_90%,transparent)]"
                  : "border-border bg-card/50 hover:-translate-y-0.5 hover:border-primary/40",
              )}
            >
              <Icon className={cn("h-6 w-6", active ? "text-primary" : "text-muted-foreground")} aria-hidden />
              <span className="mt-3 block font-display text-base font-semibold">{label}</span>
              <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div>
          {busy ? (
            <ScanProgress steps={STEP_SETS[selected]} />
          ) : (
            <>
              {error && (
                <div className="mb-6">
                  <ErrorState
                    title="Analysis unavailable"
                    message={error}
                    action={
                      <Button variant="glass" onClick={() => setError(null)}>
                        Try again
                      </Button>
                    }
                  />
                </div>
              )}

              {selected === "url" && <UrlInput onAnalyze={(url) => run(analyzeUrl(url))} />}

              {selected === "message" && (
                <MessageInput onAnalyze={(msg) => run(analyzeMessage(msg))} />
              )}

              {selected === "screenshot" && (
                <UploadBox
                  title="Upload a suspicious screenshot"
                  description="ScamShield extracts the on-screen text and looks for login, OTP and payment patterns."
                  ctaLabel="Analyze Screenshot"
                  onAnalyze={(file) => run(analyzeScreenshot(file))}
                />
              )}

              {selected === "qr" && (
                <UploadBox
                  title="Upload a QR code image"
                  description="ScamShield decodes the code and inspects its destination or UPI payment request."
                  ctaLabel="Analyze QR Code"
                  onAnalyze={(file) => run(analyzeQr(file))}
                  extra={
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-background/40 p-4 text-sm text-muted-foreground">
                        <Camera className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                        Live camera scanning is planned for a future release. For now, upload a saved
                        photo or screenshot of the QR code.
                      </div>
                      <p className="rounded-xl border border-medium/35 bg-medium/10 p-4 text-sm font-medium text-medium">
                        ScamShield never makes payments. Always verify the recipient before paying.
                      </p>
                    </div>
                  }
                />
              )}
            </>
          )}
        </div>

        <div className="space-y-6">
          <PrivacyNote fileNote />
          <aside className="rounded-2xl border border-border bg-card/50 p-5">
            <h2 className="font-display text-base font-semibold">Multi-scan</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Got several pieces of evidence — a message plus the link it contains, or a QR photo plus a
              chat screenshot? Scan each one and compare the results side by side in your{" "}
              <a href="/history" className="text-primary hover:underline">
                scan history
              </a>
              .
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
