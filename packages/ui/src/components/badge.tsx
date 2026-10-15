import * as React from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { badgeVariants } from "./badge-variants";

export interface BadgeProps extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  /** Prefix a small status dot in the current colour. */
  dot?: boolean;
}

export function Badge({ className, tone, size, dot, children, ...props }: BadgeProps) {
  return (
    <span data-slot="badge" className={cn(badgeVariants({ tone, size }), className)} {...props}>
      {dot && <span className="size-1.5 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  );
}
