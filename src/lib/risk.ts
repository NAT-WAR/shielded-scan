import type { RiskLevel, ScanInputType, Severity } from "@/types/scan";

export const riskMeta: Record<
  RiskLevel,
  { label: string; symbol: string; color: string; text: string; bg: string; ring: string }
> = {
  SAFE: {
    label: "Safe",
    symbol: "●",
    color: "var(--safe)",
    text: "text-safe",
    bg: "bg-safe/12",
    ring: "border-safe/40",
  },
  LOW: {
    label: "Low risk",
    symbol: "●",
    color: "var(--low)",
    text: "text-low",
    bg: "bg-low/12",
    ring: "border-low/40",
  },
  MEDIUM: {
    label: "Medium risk",
    symbol: "▲",
    color: "var(--medium)",
    text: "text-medium",
    bg: "bg-medium/12",
    ring: "border-medium/40",
  },
  HIGH: {
    label: "High risk",
    symbol: "▲",
    color: "var(--high)",
    text: "text-high",
    bg: "bg-high/12",
    ring: "border-high/40",
  },
  CRITICAL: {
    label: "Critical risk",
    symbol: "■",
    color: "var(--critical)",
    text: "text-critical",
    bg: "bg-critical/12",
    ring: "border-critical/40",
  },
};

export const severityMeta: Record<Severity, { label: string; level: RiskLevel }> = {
  info: { label: "Info", level: "SAFE" },
  low: { label: "Low", level: "LOW" },
  medium: { label: "Medium", level: "MEDIUM" },
  high: { label: "High", level: "HIGH" },
  critical: { label: "Critical", level: "CRITICAL" },
};

export const inputTypeLabel: Record<ScanInputType, string> = {
  url: "Website URL",
  screenshot: "Screenshot",
  qr: "QR Code",
  message: "Message",
};

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
