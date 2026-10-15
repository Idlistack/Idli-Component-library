import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, CheckCircle2, Info, Sparkles, XCircle, X } from "lucide-react";
import { cn, focusRing } from "../lib/cn";

const alertVariants = cva("relative flex gap-3 rounded-xl border p-4 text-sm", {
  variants: {
    tone: {
      info: "border-info/25 bg-info-soft [&>svg]:text-info",
      success: "border-success/25 bg-success-soft [&>svg]:text-success",
      warning: "border-warning/25 bg-warning-soft [&>svg]:text-warning",
      danger: "border-danger/25 bg-danger-soft [&>svg]:text-danger",
      brand: "border-brand/25 bg-primary-soft [&>svg]:text-primary-strong",
    },
  },
  defaultVariants: { tone: "info" },
});

const icons = { info: Info, success: CheckCircle2, warning: AlertTriangle, danger: XCircle, brand: Sparkles };

export interface AlertProps
  extends Omit<React.ComponentProps<"div">, "title">,
    VariantProps<typeof alertVariants> {
  title?: React.ReactNode;
  /** Replace the default tone icon, or pass `null` to hide it. */
  icon?: React.ReactNode | null;
  /** Show a dismiss button that calls this handler. */
  onDismiss?: () => void;
  /** Optional actions rendered under the message. */
  actions?: React.ReactNode;
  /**
   * Announce the alert to screen readers when it appears (`danger`/`warning` assertively, others politely).
   * Leave off for alerts that are part of the page from the start, so they aren't read out on load.
   */
  live?: boolean;
}

export function Alert({ className, tone = "info", title, icon, onDismiss, actions, live = false, children, ...props }: AlertProps) {
  const Icon = icons[tone ?? "info"];
  return (
    <div
      data-slot="alert"
      role={live ? (tone === "danger" || tone === "warning" ? "alert" : "status") : undefined}
      className={cn(alertVariants({ tone }), className)}
      {...props}
    >
      {icon === undefined ? <Icon className="mt-0.5 size-[18px] shrink-0" aria-hidden /> : icon}
      <div className="grid flex-1 gap-1">
        {title && <p className="font-semibold text-foreground">{title}</p>}
        {children && <div className="leading-relaxed text-muted-foreground">{children}</div>}
        {actions && <div className="mt-2 flex flex-wrap gap-2">{actions}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className={cn(
            "-m-1 grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground",
            focusRing,
          )}
        >
          <X className="size-4" aria-hidden />
        </button>
      )}
    </div>
  );
}
