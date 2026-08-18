import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { InlineError } from "@/components/common/ErrorState";
import { DEMO_SCAM_MESSAGE } from "@/services/mockApi";

const MAX = 5000;

export function MessageInput({ onAnalyze }: { onAnalyze: (message: string) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim().length < 8) {
      setError("Paste a bit more of the message so it can be analyzed.");
      return;
    }
    setError(null);
    onAnalyze(value.trim());
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8">
      <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
        <MessageSquare className="h-5 w-5 text-primary" aria-hidden />
        Analyze a suspicious message
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Works with SMS, WhatsApp-style messages, emails and app notifications.
      </p>

      <label htmlFor="message-input" className="mt-6 block text-sm font-medium">
        Message text
      </label>
      <Textarea
        id="message-input"
        value={value}
        maxLength={MAX}
        rows={8}
        aria-invalid={Boolean(error)}
        onChange={(e) => setValue(e.target.value)}
        placeholder={"Paste a suspicious SMS, WhatsApp message,\nemail or notification here..."}
        className="mt-2 min-h-40 resize-y text-sm"
      />
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>Do not paste OTPs, passwords or card numbers.</span>
        <span className="font-mono tabular-nums">
          {value.length} / {MAX}
        </span>
      </div>
      {error && <InlineError message={error} />}

      <div className="mt-6 flex flex-wrap gap-2">
        <Button type="submit" variant="hero" size="lg">
          Analyze Message
        </Button>
        <Button type="button" variant="glass" size="lg" onClick={() => setValue(DEMO_SCAM_MESSAGE)}>
          Try demo KYC scam
        </Button>
      </div>
    </form>
  );
}
