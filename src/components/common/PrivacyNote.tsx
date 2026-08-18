import { Lock } from "lucide-react";

export function PrivacyNote({ fileNote = false }: { fileNote?: boolean }) {
  return (
    <aside className="rounded-2xl border border-border bg-card/50 p-5">
      <h2 className="flex items-center gap-2 font-display text-base font-semibold">
        <Lock className="h-4 w-4 text-primary" aria-hidden />
        Privacy First
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        ScamShield does not need your passwords, OTP, UPI PIN, CVV or banking credentials. Never enter
        sensitive credentials into ScamShield — or into any page a message sends you to.
      </p>
      {fileNote && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Uploaded files are used only for analysis. In this demo build, images are processed in your
          browser and are not uploaded anywhere.
        </p>
      )}
    </aside>
  );
}
