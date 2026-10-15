import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border font-medium whitespace-nowrap [&_svg]:size-3.5",
  {
    variants: {
      tone: {
        brand: "border-brand/20 bg-primary-soft text-primary-strong",
        neutral: "border-border bg-surface-muted text-muted-foreground",
        info: "border-info/20 bg-info-soft text-info",
        success: "border-success/20 bg-success-soft text-success",
        warning: "border-warning/20 bg-warning-soft text-warning",
        danger: "border-danger/20 bg-danger-soft text-danger",
        solid: "border-transparent bg-secondary text-secondary-foreground",
      },
      size: {
        sm: "px-2 py-0.5 text-[11px]",
        md: "px-2.5 py-1 text-xs",
      },
    },
    defaultVariants: { tone: "neutral", size: "md" },
  },
);
