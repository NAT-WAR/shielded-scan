import { useRef, useState } from "react";
import { ImageIcon, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InlineError } from "@/components/common/ErrorState";
import { ACCEPTED_IMAGE_TYPES, ScamShieldError, validateImageFile } from "@/services/api";
import { cn } from "@/lib/utils";

interface UploadBoxProps {
  title: string;
  description: string;
  ctaLabel: string;
  onAnalyze: (file: File) => void;
  extra?: React.ReactNode;
}

function formatSize(bytes: number) {
  return bytes > 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(2)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function UploadBox({ title, description, ctaLabel, onAnalyze, extra }: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  function accept(next: File | undefined) {
    if (!next) return;
    try {
      validateImageFile(next);
      setError(null);
      setFile(next);
      setPreview(URL.createObjectURL(next));
    } catch (err) {
      setFile(null);
      setPreview(null);
      setError(err instanceof ScamShieldError ? err.message : "That file could not be used.");
    }
  }

  function reset() {
    setFile(null);
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8">
      <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
        <ImageIcon className="h-5 w-5 text-primary" aria-hidden />
        {title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>

      {!file && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            accept(e.dataTransfer.files[0]);
          }}
          className={cn(
            "mt-6 rounded-xl border-2 border-dashed p-8 text-center transition-colors",
            dragging ? "border-primary bg-primary/10" : "border-border bg-background/40",
          )}
        >
          <UploadCloud className="mx-auto h-9 w-9 text-primary" aria-hidden />
          <p className="mt-3 text-sm font-medium">Drag and drop an image here</p>
          <p className="mt-1 text-xs text-muted-foreground">Supported: PNG, JPG, JPEG, WEBP · max 8 MB</p>
          <Button
            type="button"
            variant="glass"
            className="mt-4"
            onClick={() => inputRef.current?.click()}
          >
            Choose a file
          </Button>
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            accept={ACCEPTED_IMAGE_TYPES.join(",")}
            aria-label="Upload image for analysis"
            onChange={(e) => accept(e.target.files?.[0])}
          />
        </div>
      )}

      {file && (
        <div className="mt-6 flex flex-col gap-4 rounded-xl border border-border bg-background/40 p-4 sm:flex-row">
          {preview && (
            <img
              src={preview}
              alt={`Preview of uploaded file ${file.name}`}
              className="h-32 w-full rounded-lg border border-border object-cover sm:w-44"
            />
          )}
          <div className="flex flex-1 flex-col justify-between gap-3">
            <div>
              <p className="break-all font-mono text-sm">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatSize(file.size)} · {file.type.replace("image/", "").toUpperCase()}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="hero" onClick={() => onAnalyze(file)}>
                {ctaLabel}
              </Button>
              <Button type="button" variant="glass" onClick={reset}>
                <X className="h-4 w-4" aria-hidden />
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}

      {error && <InlineError message={error} />}
      {extra && <div className="mt-6">{extra}</div>}
    </div>
  );
}
