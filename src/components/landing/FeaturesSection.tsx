import { Link } from "@tanstack/react-router";
import { Globe, Image as ImageIcon, MessageSquare, QrCode } from "lucide-react";
import type { ScanInputType } from "@/types/scan";

export const DETECTORS: {
  type: ScanInputType;
  title: string;
  icon: typeof Globe;
  copy: string;
}[] = [
  {
    type: "url",
    title: "Website Scanner",
    icon: Globe,
    copy: "Analyze suspicious URLs, domains, redirects, HTTPS and typosquatting.",
  },
  {
    type: "screenshot",
    title: "Screenshot Scanner",
    icon: ImageIcon,
    copy: "Extract text using OCR and detect suspicious login/payment patterns.",
  },
  {
    type: "qr",
    title: "QR Scanner",
    icon: QrCode,
    copy: "Decode QR codes and inspect their destination or UPI payment information.",
  },
  {
    type: "message",
    title: "Message Scanner",
    icon: MessageSquare,
    copy: "Analyze SMS, WhatsApp-style messages and emails for scam patterns.",
  },
];

export function FeaturesSection() {
  return (
    <section className="border-y border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            One Shield. Multiple Detection Layers.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Each input type gets its own engine, and every engine feeds the same risk model.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DETECTORS.map(({ type, title, icon: Icon, copy }) => (
            <Link
              key={type}
              to="/scan"
              search={{ type }}
              className="group rounded-2xl border border-border bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_20px_50px_-25px_color-mix(in_oklab,var(--primary)_80%,transparent)]"
            >
              <span className="inline-flex rounded-xl border border-primary/30 bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/20">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              <span className="mt-4 inline-block text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Open scanner →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
