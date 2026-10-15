"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@idlistack/ui/utils";

/** Normalises to six-digit uppercase hex where the colour is opaque; translucent rgba() is returned as written. */
function toHex(value: string) {
  const v = value.trim();
  // Expand the short forms a CSS minifier produces (#fff → #FFFFFF).
  if (/^#[0-9a-f]{3,4}$/i.test(v)) return ("#" + [...v.slice(1)].map((c) => c + c).join("")).toUpperCase();
  if (/^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(v)) return v.toUpperCase();
  const m = /^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)\s*(?:[,/]\s*([\d.]+%?)\s*)?\)$/i.exec(v);
  if (!m || (m[4] !== undefined && parseFloat(m[4]) < (m[4].endsWith("%") ? 100 : 1))) return v;
  return "#" + [m[1], m[2], m[3]].map((n) => Number(n).toString(16).padStart(2, "0")).join("").toUpperCase();
}

export interface CopyColourProps {
  /** The colour to copy. Omit it and pass `cssVar` for theme-dependent colours. */
  value?: string;
  /** A custom property (e.g. `--idli-primary`) read from the page at click time, so it copies the current theme's value. */
  cssVar?: string;
  /** What the colour is, for the accessible label ("Copy Idli pink"). */
  name: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * A coloured area that copies its colour code when clicked. Only this area is
 * the button; labels and values around it stay ordinary selectable text.
 */
export function CopyColour({ value, cssVar, name, className, style, children }: CopyColourProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState<string | null>(null);

  async function copy() {
    let code = value ?? "";
    if (cssVar) code = getComputedStyle(document.documentElement).getPropertyValue(cssVar) || code;
    if (!code && ref.current) code = getComputedStyle(ref.current).backgroundColor;
    code = toHex(code);
    try {
      await navigator.clipboard.writeText(code);
      setCopied(code);
      setTimeout(() => setCopied(null), 1400);
    } catch {
      // Clipboard refused (insecure context or permissions): leave the value visible to copy by hand.
    }
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={copy}
      aria-label={`Copy ${name} colour${value ? ` ${toHex(value)}` : ""}`}
      title={copied ? `Copied ${copied}` : "Click to copy"}
      className={cn(
        "group/copy relative cursor-copy overflow-hidden text-left outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      style={{ background: cssVar ? `var(${cssVar})` : value, ...style }}
    >
      {children}
      <span
        className={cn(
          "pointer-events-none absolute top-1.5 right-1.5 flex items-center gap-1 rounded-md bg-ink-950/75 px-1.5 py-1 text-[10px] font-medium text-white transition-opacity",
          copied ? "opacity-100" : "opacity-0 group-hover/copy:opacity-100 group-focus-visible/copy:opacity-100",
        )}
        aria-hidden
      >
        {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
        {copied ? "Copied" : null}
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? `Copied ${copied}` : ""}
      </span>
    </button>
  );
}
