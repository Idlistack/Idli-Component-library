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
  type,
  onClick,
  children,
  ...props
}: ButtonProps) {
  const inactive = disabled || loading;
  if (asChild) {
    // A link or other child can't take `disabled`, so mark it and swallow clicks instead.
    return (
      <Slot.Root
        data-slot="button"
        className={cn(buttonVariants({ variant, size }), className)}
        aria-disabled={inactive || undefined}
        aria-busy={loading || undefined}
        tabIndex={inactive ? -1 : undefined}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          if (inactive) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
        {...props}
      >
        {children}
      </Slot.Root>
    );
  }
  return (
    <button
      data-slot="button"
      // Default to "button" so a Button inside a form doesn't submit it by accident.
      type={type ?? "button"}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={inactive}
      aria-busy={loading || undefined}
      onClick={onClick}
      {...props}
    >
      {loading && <Spinner className="size-4" label={null} />}
      {children}
    </button>
  );
}
