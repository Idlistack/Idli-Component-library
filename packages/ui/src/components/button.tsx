import * as React from "react";
import { Slot } from "radix-ui";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { buttonVariants } from "./button-variants";
import { Spinner } from "./spinner";

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  /** Render the child element (e.g. a link) with button styles instead of a `<button>`. */
  asChild?: boolean;
  /** Show a spinner, disable interaction and announce the busy state. */
  loading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading && <Spinner className="size-4" label={null} />}
          {children}
        </>
      )}
    </Comp>
  );
}
