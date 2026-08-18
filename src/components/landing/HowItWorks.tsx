import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Cpu, FileInput, Gauge, ListChecks, Sparkles } from "lucide-react";

const STEPS = [
  { icon: FileInput, title: "User Input", copy: "URL, screenshot, QR code or message." },
  { icon: Cpu, title: "Detection Engines", copy: "URL analysis, OCR, QR decoder and NLP." },
  { icon: Gauge, title: "Risk Engine", copy: "Weighted aggregation of every signal found." },
  { icon: Sparkles, title: "Scam Risk Score", copy: "A 0–100 score mapped to five risk levels." },
  { icon: ListChecks, title: "Explanation", copy: "Reasons, technical details and safe next steps." },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">How It Works</h2>
        <p className="mt-3 text-muted-foreground">
          Every scan follows the same pipeline, whatever you feed it.
        </p>
      </div>

      <div ref={ref} className="mt-12 grid gap-6 lg:grid-cols-5">
        {STEPS.map(({ icon: Icon, title, copy }, i) => (
          <div
            key={title}
            className={cn(
              "relative rounded-2xl border border-border bg-card/60 p-5 transition-all duration-700",
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
            style={{ transitionDelay: `${i * 130}ms` }}
          >
            <span className="font-mono text-xs text-primary">0{i + 1}</span>
            <Icon className="mt-3 h-6 w-6 text-primary" aria-hidden />
            <h3 className="mt-3 font-display text-base font-semibold">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{copy}</p>
            {i < STEPS.length - 1 && (
              <span
                className="absolute -right-3 top-1/2 hidden h-px w-6 bg-primary/40 lg:block"
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
