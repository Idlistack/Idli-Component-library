import { cva } from "class-variance-authority";
import { focusRing } from "../lib/cn";

export const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium select-none",
    "transition-[background-color,color,border-color,box-shadow,transform] duration-150",
    "active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    focusRing,
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-hover",
        outline: "border border-border-strong bg-surface text-foreground hover:bg-surface-muted",
        soft: "bg-primary-soft text-primary-strong hover:bg-blush-100 dark:hover:bg-blush-500/20",
        ghost: "text-foreground hover:bg-surface-muted",
        link: "h-auto px-0 text-primary-strong underline-offset-4 hover:underline active:translate-y-0",
        danger: "bg-danger text-white shadow-sm hover:opacity-90 dark:text-ink-950",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-sm",
        md: "h-10 rounded-lg px-4 text-sm",
        lg: "h-12 rounded-lg px-6 text-base",
        icon: "size-10 rounded-lg",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto px-0" }],
    defaultVariants: { variant: "primary", size: "md" },
  },
);
