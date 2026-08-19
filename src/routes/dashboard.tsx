import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, AlertOctagon, ScanSearch, ShieldCheck } from "lucide-react";
import type { ScanResult, RiskLevel } from "@/types/scan";
import { getAllScans } from "@/services/api";
import { RiskBadge } from "@/components/risk/RiskBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { riskMeta, inputTypeLabel, formatDate } from "@/lib/risk";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Security Dashboard — ScamShield" },
      {
        name: "description",
        content:
          "An overview of your scans: total checks, threats blocked, risk distribution and recent activity.",
      },
      { property: "og:title", content: "Security Dashboard — ScamShield" },
      {
        property: "og:description",
        content: "Track scam checks, risk distribution and recent detections in one view.",
      },
    ],
  }),
  component: DashboardPage,
});

const LEVELS: RiskLevel[] = ["SAFE", "LOW", "MEDIUM", "HIGH", "CRITICAL"];

function DashboardPage() {
  const [scans, setScans] = useState<ScanResult[]>([]);

  useEffect(() => {
    setScans(getAllScans());
  }, []);

  const stats = useMemo(() => {
    const dangerous = scans.filter((s) => s.risk_level === "HIGH" || s.risk_level === "CRITICAL");
    const safe = scans.filter((s) => s.risk_level === "SAFE" || s.risk_level === "LOW");
    const avg = scans.length
      ? Math.round(scans.reduce((sum, s) => sum + s.risk_score, 0) / scans.length)
      : 0;
    return { total: scans.length, dangerous: dangerous.length, safe: safe.length, avg };
  }, [scans]);

  const byLevel = useMemo(
    () =>
      LEVELS.map((level) => ({
        name: riskMeta[level].label,
        level,
        value: scans.filter((s) => s.risk_level === level).length,
      })).filter((d) => d.value > 0),
    [scans],
  );

  const byType = useMemo(
    () =>
      (["url", "screenshot", "qr", "message"] as const).map((t) => ({
        name: inputTypeLabel[t],
        scans: scans.filter((s) => s.input_type === t).length,
      })),
    [scans],
  );

  const recent = useMemo(
    () =>
      [...scans]
        .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
        .slice(0, 6),
    [scans],
  );

  const cards = [
    { label: "Total scans", value: stats.total, icon: ScanSearch, tone: "text-primary" },
    { label: "Threats flagged", value: stats.dangerous, icon: AlertOctagon, tone: "text-critical" },
    { label: "Looked safe", value: stats.safe, icon: ShieldCheck, tone: "text-safe" },
    { label: "Average risk score", value: stats.avg, icon: Activity, tone: "text-medium" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Security Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            A summary of everything you have scanned on this device.
          </p>
        </div>
        <Button asChild variant="hero">
          <Link to="/scan">New scan</Link>
        </Button>
      </header>

      {scans.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="Nothing to report yet"
            description="Once you run a few scans, your risk trends and recent detections will appear here."
            action={
              <Button asChild variant="hero">
                <Link to="/scan">Run your first scan</Link>
              </Button>
            }
          />
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ label, value, icon: Icon, tone }) => (
              <div key={label} className="rounded-2xl border border-border bg-card/60 p-5">
                <Icon className={`h-5 w-5 ${tone}`} aria-hidden />
                <p className="mt-4 font-display text-3xl font-bold tabular-nums">{value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-border bg-card/60 p-6">
              <h2 className="font-display text-lg font-semibold">Risk distribution</h2>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={byLevel}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={95}
                      paddingAngle={3}
                      stroke="none"
                    >
                      {byLevel.map((d) => (
                        <Cell key={d.level} fill={riskMeta[d.level].color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "0.75rem",
                        color: "var(--foreground)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-2 flex flex-wrap gap-3">
                {byLevel.map((d) => (
                  <li key={d.level} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ background: riskMeta[d.level].color }}
                      aria-hidden
                    />
                    {d.name} ({d.value})
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-border bg-card/60 p-6">
              <h2 className="font-display text-lg font-semibold">Scans by input type</h2>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={byType}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "color-mix(in oklab, var(--primary) 8%, transparent)" }}
                      contentStyle={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: "0.75rem",
                        color: "var(--foreground)",
                      }}
                    />
                    <Bar dataKey="scans" fill="var(--primary)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          <section className="mt-8 rounded-2xl border border-border bg-card/60 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Recent activity</h2>
              <Link to="/history" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
            <ul className="mt-4 divide-y divide-border">
              {recent.map((s) => (
                <li key={s.scan_id} className="flex flex-wrap items-center gap-4 py-3">
                  <Link
                    to="/results/$id"
                    params={{ id: s.scan_id }}
                    className="min-w-0 flex-1 truncate font-mono text-sm transition-colors hover:text-primary"
                  >
                    {s.target}
                  </Link>
                  <span className="text-xs text-muted-foreground">{formatDate(s.created_at)}</span>
                  <RiskBadge level={s.risk_level} size="sm" />
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
