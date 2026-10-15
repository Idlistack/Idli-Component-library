import * as React from "react";
import { cn } from "../lib/cn";

export interface SpinnerProps extends React.ComponentProps<"span"> {
  /** Accessible label. Pass `null` when a parent already announces the busy state. */
  label?: string | null;
}

export function Spinner({ className, label = "Loading", ...props }: SpinnerProps) {
  return (
    <span
      role={label ? "status" : undefined}
      aria-label={label ?? undefined}
      aria-hidden={label ? undefined : true}
      className={cn(
        "inline-block size-5 animate-spin rounded-full border-2 border-current border-r-transparent",
        className,
      )}
      {...props}
    />
  );
}
