import { useEffect, useState } from "react";
import type { RiskLevel } from "@/types/scan";
import { riskMeta } from "@/lib/risk";
import { cn } from "@/lib/utils";
import { RiskBadge } from "./RiskBadge";

interface RiskScoreProps {
  score: number;
  riskLevel: RiskLevel;
  confidence?: number;
  size?: number;
  animate?: boolean;
  className?: string;
}

export function RiskScore({
  score,
  riskLevel,
  confidence,
  size = 220,
  animate = true,
  className,
}: RiskScoreProps) {
  const [display, setDisplay] = useState(animate ? 0 : score);
  const meta = riskMeta[riskLevel];

  useEffect(() => {
    if (!animate) {
      setDisplay(score);
      return;
    }
    let frame = 0;
    const total = 45;
    const id = window.setInterval(() => {
      frame += 1;
      const t = frame / total;
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(score * eased));
      if (frame >= total) window.clearInterval(id);
    }, 18);
    return () => window.clearInterval(id);
  }, [score, animate]);

  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - display / 100);

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div
        className="relative"
        style={{ width: size, height: size }}
        role="img"
        aria-label={`Scam risk score ${score} out of 100, ${meta.label}`}
      >
        <div
          className="absolute inset-4 rounded-full blur-2xl animate-pulse-glow"
          style={{ background: `color-mix(in oklab, ${meta.color} 35%, transparent)` }}
          aria-hidden
        />
        <svg width={size} height={size} className="relative -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={meta.color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 120ms linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-5xl font-bold tabular-nums" style={{ color: meta.color }}>
            {display}
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            / 100 risk
          </span>
        </div>
      </div>

      <RiskBadge level={riskLevel} />

      {typeof confidence === "number" && (
        <div className="w-full max-w-[220px] text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Analysis confidence</p>
          <p className="mt-1 font-display text-xl font-semibold">{Math.round(confidence * 100)}%</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Confidence describes how consistent the detected signals were — not proof that the verdict is
            correct.
          </p>
        </div>
      )}
    </div>
  );
}
