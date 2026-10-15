import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { Check, Minus } from "lucide-react";
import { cn, focusRing } from "../lib/cn";
import { useFieldControl } from "./field";

export function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  const controlProps = useFieldControl(props, "button");
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer grid size-[18px] shrink-0 place-items-center rounded-[5px] border border-border-strong bg-surface",
        "transition-colors duration-150 hover:border-sand-400",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        focusRing,
        className,
      )}
      {...controlProps}
    >
      <CheckboxPrimitive.Indicator className="group grid place-items-center">
        <Check className="size-3.5 group-data-[state=indeterminate]:hidden" strokeWidth={3} />
        <Minus className="hidden size-3.5 group-data-[state=indeterminate]:block" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
