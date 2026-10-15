import * as React from "react";
import { cn } from "../lib/cn";
import { Label } from "./label";

type FieldContextValue = {
  id: string;
  labelId: string;
  describedBy?: string;
  invalid: boolean;
  required?: boolean;
};
const FieldContext = React.createContext<FieldContextValue | null>(null);

type ControlAria = {
  id?: string;
  required?: boolean;
  "aria-describedby"?: string;
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
  "aria-labelledby"?: string;
  "aria-required"?: React.AriaAttributes["aria-required"];
};

/**
 * How a control is labelled and marked required:
 * - `input` (default): a native form element — linked by `id`, uses `required`.
 * - `button`: a button-based control (Select trigger, Checkbox, Switch) — linked by `id`, uses `aria-required`.
 * - `group`: a container such as a radio group — named with `aria-labelledby`, uses `aria-required`.
 */
export type FieldControlKind = "input" | "button" | "group";

/**
 * Merges the enclosing Field's id and ARIA attributes into a control's props.
 * Explicit props win. Outside a Field the props are returned unchanged, so
 * every Idli control calls this and custom controls can too.
 */
export function useFieldControl<P extends ControlAria>(props: P, kind: FieldControlKind = "input"): P {
  const field = React.useContext(FieldContext);
  if (!field) return props;
  const { required: requiredProp, ...rest } = props;
  const required = requiredProp ?? field.required;
  const merged: ControlAria = {
    ...rest,
    "aria-describedby": props["aria-describedby"] ?? field.describedBy,
    "aria-invalid": props["aria-invalid"] ?? (field.invalid || undefined),
  };
  if (kind === "group") {
    merged.id = props.id;
    merged["aria-labelledby"] = props["aria-labelledby"] ?? field.labelId;
  } else {
    merged.id = props.id ?? field.id;
    // A control with its own id would lose the <label for>; name it explicitly instead.
    if (props.id && props.id !== field.id) merged["aria-labelledby"] = props["aria-labelledby"] ?? field.labelId;
  }
  if (kind === "input") merged.required = required;
  else if (required) merged["aria-required"] = props["aria-required"] ?? true;
  return merged as P;
}

export interface FieldProps extends Omit<React.ComponentProps<"div">, "children"> {
  label: React.ReactNode;
  /** Helper text shown under the control. */
  hint?: React.ReactNode;
  /** Error message. When set, the control is marked `aria-invalid`, the hint is replaced and the message is announced. */
  error?: React.ReactNode;
  required?: boolean;
  /** Override the generated id that links label, control and messages. */
  id?: string;
  /**
   * The control. Idli controls (Input, Textarea, Select, Checkbox, Switch,
   * RadioGroup) pick up the Field's id and ARIA attributes through context;
   * custom controls can call `useFieldControl`.
   */
  children: React.ReactNode;
}

/**
 * Lays out a label, a control and its helper or error text, and wires up the
 * accessibility attributes between them so you don't have to.
 *
 * The wiring goes through context rather than `React.cloneElement`: children
 * rendered by a Server Component can arrive as a deferred placeholder, which
 * cannot be cloned.
 */
export function Field({ label, hint, error, required, id, className, children, ...props }: FieldProps) {
  const autoId = React.useId();
  const controlId = id ?? `field-${autoId}`;
  const labelId = `${controlId}-label`;
  const messageId = `${controlId}-message`;
  const message = error ?? hint;
  const invalid = Boolean(error);

  const context = React.useMemo<FieldContextValue>(
    () => ({ id: controlId, labelId, describedBy: message ? messageId : undefined, invalid, required }),
    [controlId, labelId, message, messageId, invalid, required],
  );

  return (
    <FieldContext.Provider value={context}>
      <div data-slot="field" className={cn("grid gap-2", className)} {...props}>
        <Label id={labelId} htmlFor={controlId}>
          {label}
          {required && (
            <span className="ml-0.5 text-danger" aria-hidden>
              *
            </span>
          )}
        </Label>
        {children}
        {/* Always rendered (empty when unused) so an error that appears later is announced. */}
        <p
          id={messageId}
          aria-live="polite"
          className={cn("text-[13px] leading-snug empty:hidden", error ? "text-danger" : "text-muted-foreground")}
        >
          {message}
        </p>
      </div>
    </FieldContext.Provider>
  );
}
