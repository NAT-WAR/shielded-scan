import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Search, Trash2 } from "lucide-react";
import type { RiskLevel, ScanHistoryEntry, ScanInputType } from "@/types/scan";
import { clearScanHistory, deleteScanHistory, getScanHistory } from "@/services/api";
import { RiskBadge } from "@/components/risk/RiskBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { inputTypeLabel, formatDate } from "@/lib/risk";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Scan History — ScamShield" },
      {
        name: "description",
        content: "Review every scan you have run on this device, filter by risk level and input type.",
      },
      { property: "og:title", content: "Scan History — ScamShield" },
      {
        property: "og:description",
        content: "Your local ScamShield scan log with risk levels, targets and timestamps.",
      },
    ],
  }),
  component: HistoryPage,
});

const LEVELS: (RiskLevel | "ALL")[] = ["ALL", "SAFE", "LOW", "MEDIUM", "HIGH", "CRITICAL"];
const TYPES: (ScanInputType | "ALL")[] = ["ALL", "url", "screenshot", "qr", "message"];

function HistoryPage() {
  const [entries, setEntries] = useState<ScanHistoryEntry[]>([]);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<RiskLevel | "ALL">("ALL");
  const [type, setType] = useState<ScanInputType | "ALL">("ALL");

  useEffect(() => {
    getScanHistory().then(setEntries).catch(() => setEntries([]));
  }, []);

  const filtered = useMemo(
    () =>
      entries.filter(
        (e) =>
          (level === "ALL" || e.risk_level === level) &&
          (type === "ALL" || e.input_type === type) &&
          e.target.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [entries, level, type, query],
  );

  async function remove(id: string) {
    await deleteScanHistory(id);
    setEntries((prev) => prev.filter((e) => e.scan_id !== id));
    toast.success("Scan removed");
  }

  async function clearAll() {
    await clearScanHistory();
    setEntries([]);
    toast.success("History cleared");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Scan History</h1>
          <p className="mt-2 text-muted-foreground">
            Stored locally in this browser. Nothing is uploaded to a ScamShield account.
          </p>
        </div>
        {entries.length > 0 && (
          <Button variant="glass" onClick={clearAll}>
            <Trash2 className="h-4 w-4" aria-hidden />
            Clear history
          </Button>
        )}
      </header>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by URL, message or file name"
            aria-label="Search scan history"
            className="h-11 pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                level === l
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40",
              )}
            >
              {l === "ALL" ? "All risks" : l}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                type === t
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40",
              )}
            >
              {t === "ALL" ? "All types" : inputTypeLabel[t]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {filtered.length === 0 ? (
          <EmptyState
            title={entries.length === 0 ? "No scans yet" : "No scans match your filters"}
            description={
              entries.length === 0
                ? "Run your first scan and it will show up here with its risk level and timestamp."
                : "Try a different search term, risk level or input type."
            }
            action={
              <Button asChild variant="hero">
                <Link to="/scan">Start a scan</Link>
              </Button>
            }
          />
        ) : (
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card/50">
            {filtered.map((e) => (
              <li key={e.scan_id} className="flex flex-wrap items-center gap-4 p-4 sm:p-5">
                <div className="min-w-0 flex-1">
                  <Link
                    to="/results/$id"
                    params={{ id: e.scan_id }}
                    className="block truncate font-mono text-sm text-foreground transition-colors hover:text-primary"
                  >
                    {e.target}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {inputTypeLabel[e.input_type]} · {formatDate(e.created_at)} · score {e.risk_score}
                    /100
                  </p>
                </div>
                <RiskBadge level={e.risk_level} size="sm" />
                <div className="flex items-center gap-2">
                  <Button asChild variant="glass" size="sm">
                    <Link to="/results/$id" params={{ id: e.scan_id }}>
                      View
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label={`Delete scan for ${e.target}`}
                    onClick={() => remove(e.scan_id)}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
