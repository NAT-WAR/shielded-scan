import type { ReactNode } from "react";
import { ScanSearch } from "lucide-react";

export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 text-primary">
        {icon ?? <ScanSearch className="h-7 w-7" aria-hidden />}
      </div>
      <h2 className="mt-5 font-display text-xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-sm whitespace-pre-line text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
