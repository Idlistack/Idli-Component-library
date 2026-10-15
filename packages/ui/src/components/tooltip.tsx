import * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { cn } from "../lib/cn";

export const TooltipProvider = TooltipPrimitive.Provider;

export interface TooltipProps
  extends Omit<React.ComponentProps<typeof TooltipPrimitive.Content>, "content"> {
  /** What the tooltip says. Keep it short — it is supplementary, never essential. */
  content: React.ReactNode;
  /** The element that triggers the tooltip. It must be focusable. */
  children: React.ReactElement;
  delayDuration?: number;
  /** Controlled open state. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** A short label shown on hover and keyboard focus. Wraps its own provider so it works standalone. */
export function Tooltip({
  content,
  children,
  delayDuration = 250,
  open,
  defaultOpen,
  onOpenChange,
  className,
  sideOffset = 6,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            data-slot="tooltip"
            sideOffset={sideOffset}
            className={cn(
              "z-50 max-w-64 rounded-lg bg-secondary px-2.5 py-1.5 text-xs leading-snug font-medium text-secondary-foreground shadow-lifted",
              "data-[state=delayed-open]:animate-pop-in data-[state=closed]:animate-pop-out",
              className,
            )}
            {...props}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-secondary" width={10} height={5} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
