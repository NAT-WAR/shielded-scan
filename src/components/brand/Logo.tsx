import { cn } from "@/lib/utils";

/** ScamShield mark: a shield containing a radar sweep and QR corner markers. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="ScamShield logo"
      className={cn("h-9 w-9", className)}
    >
      <defs>
        <linearGradient id="ss-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <path
        d="M24 3 6 10v13c0 10.5 7.3 19.4 18 22 10.7-2.6 18-11.5 18-22V10L24 3Z"
        fill="color-mix(in oklab, var(--primary) 12%, transparent)"
        stroke="url(#ss-grad)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="23" r="9" fill="none" stroke="url(#ss-grad)" strokeWidth="1.4" opacity="0.55" />
      <circle cx="24" cy="23" r="4" fill="none" stroke="url(#ss-grad)" strokeWidth="1.4" opacity="0.85" />
      <path d="M24 23 33 19" stroke="url(#ss-grad)" strokeWidth="2" strokeLinecap="round" />
      <g fill="url(#ss-grad)">
        <rect x="13" y="12" width="4" height="4" rx="1" />
        <rect x="31" y="12" width="4" height="4" rx="1" />
        <rect x="13" y="30" width="4" height="4" rx="1" />
      </g>
    </svg>
  );
}
