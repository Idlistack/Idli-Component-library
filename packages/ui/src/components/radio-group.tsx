import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { cn, focusRing } from "../lib/cn";
import { useFieldControl } from "./field";

export function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  const controlProps = useFieldControl(props);
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn("grid gap-3", className)} {...controlProps} />;
}

export function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "peer grid size-[18px] shrink-0 place-items-center rounded-full border border-border-strong bg-surface",
        "transition-colors duration-150 hover:border-sand-400 data-[state=checked]:border-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        focusRing,
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="size-2.5 rounded-full bg-primary" />
    </RadioGroupPrimitive.Item>
  );
}
