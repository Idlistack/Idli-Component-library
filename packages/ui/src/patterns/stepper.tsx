import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../lib/cn";

export interface StepperStep {
  title: string;
  description?: string;
}

export interface StepperProps extends React.ComponentProps<"ol"> {
  steps: StepperStep[];
  /** Zero-based index of the current step. Steps before it are complete. */
  current: number;
  orientation?: "horizontal" | "vertical";
}

/** Shows progress through a multi-step flow, like deploying an app. */
export function Stepper({ steps, current, orientation = "horizontal", className, ...props }: StepperProps) {
  const vertical = orientation === "vertical";
  return (
    <ol
      data-slot="stepper"
      className={cn(vertical ? "grid gap-0" : "flex w-full items-start", className)}
      {...props}
    >
      {steps.map((step, i) => {
        const state = i < current ? "complete" : i === current ? "current" : "upcoming";
        const isLast = i === steps.length - 1;
        return (
          <li
            key={step.title}
            aria-current={state === "current" ? "step" : undefined}
            className={cn("relative flex", vertical ? "gap-4 pb-8 last:pb-0" : "flex-1 flex-col items-center text-center")}
          >
            {!isLast && (
              <span
                aria-hidden
                className={cn(
                  "absolute transition-colors duration-300",
                  vertical ? "top-9 bottom-1 left-[15px] w-0.5" : "top-[15px] left-[calc(50%+22px)] h-0.5 w-[calc(100%-44px)]",
                  i < current ? "bg-primary" : "bg-border",
                )}
              />
            )}
            <span
              className={cn(
                "relative z-10 grid size-8 shrink-0 place-items-center rounded-full text-sm font-semibold transition-all duration-300",
                state === "complete" && "bg-primary text-primary-foreground",
                state === "current" && "bg-primary text-primary-foreground ring-4 ring-brand/20",
                state === "upcoming" && "border border-border-strong bg-surface text-muted-foreground",
              )}
            >
              {state === "complete" ? <Check className="size-4" strokeWidth={3} aria-hidden /> : i + 1}
            </span>
            <span className={cn("grid gap-0.5", vertical ? "pt-1" : "mt-3 px-2")}>
              <span
                className={cn(
                  "text-sm font-semibold",
                  state === "upcoming" ? "text-muted-foreground" : "text-foreground",
                )}
              >
                {step.title}
                <span className="sr-only">
                  {state === "complete" ? " (completed)" : state === "current" ? " (current step)" : ""}
                </span>
              </span>
              {step.description && <span className="text-xs leading-relaxed text-muted-foreground">{step.description}</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
