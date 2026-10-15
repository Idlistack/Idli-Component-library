import * as React from "react";
import { cn } from "../lib/cn";
import { Label } from "./label";

export interface FieldProps extends Omit<React.ComponentProps<"div">, "children"> {
  label: React.ReactNode;
  /** Helper text shown under the control. */
  hint?: React.ReactNode;
  /** Error message. When set, the control is marked `aria-invalid` and the hint is replaced. */
  error?: React.ReactNode;
  required?: boolean;
  /** Override the generated id that links label, control and messages. */
  id?: string;
  /** A single form control. It receives `id`, `aria-describedby` and `aria-invalid`. */
  children: React.ReactElement<Record<string, unknown>>;
}

/**
 * Lays out a label, a control and its helper or error text, and wires up the
 * accessibility attributes between them so you don't have to.
 */
export function Field({ label, hint, error, required, id, className, children, ...props }: FieldProps) {
  const autoId = React.useId();
  const controlId = id ?? `field-${autoId}`;
  const messageId = `${controlId}-message`;
  const message = error ?? hint;

  return (
    <div data-slot="field" className={cn("grid gap-2", className)} {...props}>
      <Label htmlFor={controlId}>
        {label}
        {required && (
          <span className="ml-0.5 text-danger" aria-hidden>
            *
          </span>
        )}
      </Label>
      {React.cloneElement(children, {
        id: controlId,
        required,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": message ? messageId : undefined,
      })}
      {message && (
        <p
          id={messageId}
          className={cn("text-[13px] leading-snug", error ? "text-danger" : "text-muted-foreground")}
        >
          {message}
        </p>
      )}
    </div>
  );
}
