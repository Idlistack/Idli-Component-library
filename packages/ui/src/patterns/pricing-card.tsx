import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../lib/cn";
import { Badge } from "../components/badge";

export interface PricingCardProps extends React.ComponentProps<"article"> {
  plan: string;
  /** Formatted price, e.g. "₹1,499". */
  price: string;
  /** Billing period, e.g. "per month". */
  period?: string;
  description?: string;
  features: string[];
  /** Call-to-action, usually a `<Button>`. */
  action?: React.ReactNode;
  /** Emphasise this plan with a brand border and label. */
  highlighted?: boolean;
  highlightLabel?: string;
}

export function PricingCard({
  plan,
  price,
  period,
  description,
  features,
  action,
  highlighted,
  highlightLabel = "Most popular",
  className,
  ...props
}: PricingCardProps) {
  return (
    <article
      data-slot="pricing-card"
      className={cn(
        "relative flex flex-col rounded-2xl border bg-surface p-6 sm:p-7",
        highlighted ? "border-primary shadow-lifted ring-4 ring-brand/10" : "border-border shadow-soft",
        className,
      )}
      {...props}
    >
      {highlighted && (
        <Badge tone="brand" className="absolute -top-3 left-6 bg-surface">
          {highlightLabel}
        </Badge>
      )}
      <h3 className="font-heading text-base font-bold text-foreground">{plan}</h3>
      {description && <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>}
      <p className="mt-5 flex items-baseline gap-1.5">
        <span className="font-heading text-4xl font-extrabold tracking-tight text-foreground">{price}</span>
        {period && <span className="text-sm text-muted-foreground">{period}</span>}
      </p>
      <ul className="mt-6 grid gap-3 text-sm">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={2.5} aria-hidden />
            {feature}
          </li>
        ))}
      </ul>
      {action && <div className="mt-8 grid pt-0 [&>*]:w-full">{action}</div>}
    </article>
  );
}
