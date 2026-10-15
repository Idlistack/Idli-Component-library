import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";
import { cn, focusRing } from "../lib/cn";

export function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent",
        "bg-sand-300 transition-colors duration-200 data-[state=checked]:bg-primary dark:bg-ink-700",
        "disabled:cursor-not-allowed disabled:opacity-50",
        focusRing,
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block size-5 rounded-full bg-white shadow-sm ring-0",
          "transition-transform duration-200 data-[state=checked]:translate-x-5",
        )}
      />
    </SwitchPrimitive.Root>
  );
}
