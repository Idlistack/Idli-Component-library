"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@idlistack/ui/utils";

/** A brand colour with one-click copy of its HEX and RGB values. */
export function ColourSwatch({ name, hex, rgb, use, dark }: { name: string; hex: string; rgb: string; use: string; dark: boolean }) {
  const [copied, setCopied] = useState<string | null>(null);
  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className={cn("flex h-28 items-end p-4 font-heading text-lg font-bold", dark ? "text-white" : "text-ink-900")} style={{ background: hex }}>
        {name}
      </div>
      <div className="grid gap-2 p-4">
        {[
          { label: "HEX", value: hex.toUpperCase() },
          { label: "RGB", value: `rgb(${rgb})` },
        ].map((v) => (
          <button
            key={v.label}
            type="button"
            onClick={() => copy(v.value)}
            className="group flex items-center justify-between gap-2 rounded-lg px-2 py-1 -mx-2 text-left font-mono text-[13px] transition-colors hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            aria-label={`Copy ${name} ${v.label} ${v.value}`}
          >
            <span>
              <span className="text-subtle-foreground">{v.label}</span> {v.value}
            </span>
            {copied === v.value ? (
              <Check className="size-4 text-success" aria-hidden />
            ) : (
              <Copy className="size-4 text-subtle-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden />
            )}
          </button>
        ))}
        <p className="text-xs leading-relaxed text-muted-foreground">{use}</p>
        <span className="sr-only" aria-live="polite">{copied ? `Copied ${copied}` : ""}</span>
      </div>
    </div>
  );
}
