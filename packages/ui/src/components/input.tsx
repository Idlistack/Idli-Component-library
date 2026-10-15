import * as React from "react";
import { cn } from "../lib/cn";
import { useFieldControl } from "./field";

/** Shared look for text-entry controls (Input, Textarea, Select trigger). */
export const fieldControl = cn(
  "w-full rounded-lg border border-border-strong bg-surface px-3 text-sm text-foreground shadow-xs",
  "placeholder:text-subtle-foreground",
  "transition-[border-color,box-shadow] duration-150",
  "hover:border-sand-400 dark:hover:border-ink-600",
  "outline-none focus-visible:border-brand focus-visible:ring-4 focus-visible:ring-brand/15",
  "disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-60",
  "aria-invalid:border-danger aria-invalid:focus-visible:ring-danger/15",
);

export function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  const controlProps = useFieldControl(props);
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        fieldControl,
        "h-10 file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className,
      )}
      {...controlProps}
    />
  );
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  const controlProps = useFieldControl(props);
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldControl, "min-h-24 py-2.5 leading-relaxed", className)}
      {...controlProps}
    />
  );
}
