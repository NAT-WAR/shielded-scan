import { useState } from "react";
import { Globe, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InlineError } from "@/components/common/ErrorState";
import { DEMO_SAFE_URL, DEMO_SCAM_URL } from "@/services/mockApi";
import { ScamShieldError, normalizeUrl } from "@/services/api";

export function UrlInput({ onAnalyze }: { onAnalyze: (url: string) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const normalized = normalizeUrl(value);
      setError(null);
      onAnalyze(normalized);
    } catch (err) {
      setError(err instanceof ScamShieldError ? err.message : "Please enter a valid website address.");
    }
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8">
      <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
        <Globe className="h-5 w-5 text-primary" aria-hidden />
        Analyze a suspicious website
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Paste the URL below. ScamShield inspects the structure of the address — it does not open the site
        for you.
      </p>

      <label htmlFor="url-input" className="mt-6 block text-sm font-medium">
        Website URL
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Link2
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            id="url-input"
            inputMode="url"
            autoComplete="off"
            placeholder="https://example.com"
            value={value}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "url-error" : undefined}
            onChange={(e) => setValue(e.target.value)}
            className="h-12 pl-9 font-mono text-sm"
          />
        </div>
        <Button type="submit" variant="hero" size="lg" className="sm:w-44">
          Analyze URL
        </Button>
      </div>
      {error && (
        <span id="url-error">
          <InlineError message={error} />
        </span>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        <Button type="button" variant="glass" size="sm" onClick={() => setValue(DEMO_SCAM_URL)}>
          Try demo scam URL
        </Button>
        <Button type="button" variant="glass" size="sm" onClick={() => setValue(DEMO_SAFE_URL)}>
          Try safe example URL
        </Button>
      </div>
    </form>
  );
}
