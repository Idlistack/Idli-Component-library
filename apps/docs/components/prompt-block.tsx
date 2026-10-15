"use client";

import { CopyButton } from "./copy-button";
import { useSiteOrigin } from "./site-url";

/**
 * A copyable example prompt. `{site}` in the text is replaced with the origin
 * the page is served from, so links in the prompt work when pasted elsewhere.
 */
export function PromptBlock({ text }: { text: string }) {
  const value = text.replaceAll("{site}", useSiteOrigin());
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-sand-50 dark:bg-ink-950">
      <div className="absolute top-1.5 right-1.5 z-10 rounded-lg bg-sand-50 dark:bg-ink-950">
        <CopyButton value={value} />
      </div>
      <p className="p-4 pr-12 font-mono text-[13px] leading-6 break-words whitespace-pre-wrap text-foreground">{value}</p>
    </div>
  );
}
