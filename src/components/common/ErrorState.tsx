import type { ReactNode } from "react";
import { AlertOctagon } from "lucide-react";

export function ErrorState({
  title = "Something didn't work",
  message,
  action,
}: {
  title?: string;
  message: string;
  action?: ReactNode;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center rounded-2xl border border-critical/35 bg-critical/8 px-6 py-12 text-center"
    >
      <AlertOctagon className="h-8 w-8 text-critical" aria-hidden />
      <h2 className="mt-4 font-display text-xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function InlineError({ message }: { message: string }) {
  return (
    <p role="alert" className="mt-2 flex items-center gap-2 text-sm text-critical">
      <AlertOctagon className="h-4 w-4 shrink-0" aria-hidden />
      {message}
    </p>
  );
}
