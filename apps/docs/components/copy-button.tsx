"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@idlistack/ui";

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={copy}
      className="size-8 px-0 text-muted-foreground hover:text-foreground"
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? <Check className="text-success" /> : <Copy />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </Button>
  );
}
