import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn, focusRing } from "../lib/cn";
import { Badge } from "../components/badge";

export interface AppCardProps extends Omit<React.ComponentProps<"article">, "title"> {
  name: string;
  /** Who builds or maintains the app, shown as "by …". */
  maker?: string;
  description: string;
  /** App logo — an `<img>` or icon element, rendered in a 48px tile. */
  logo: React.ReactNode;
  category?: string;
  status?: "available" | "coming-soon" | "beta";
  /** Makes the whole card a link to the app's page. */
  href?: string;
  /** Render a custom link element (e.g. Next.js `Link`) for `href`. */
  linkAs?: React.ElementType;
}

const statusBadge = {
  available: null,
  beta: { tone: "info", label: "Beta" },
  "coming-soon": { tone: "neutral", label: "Coming soon" },
} as const;

/** An open-source app in the Idlistack catalogue. */
export function AppCard({
  name,
  maker,
  description,
  logo,
  category,
  status = "available",
  href,
  linkAs: LinkComp = "a",
  className,
  ...props
}: AppCardProps) {
  const badge = statusBadge[status];
  return (
    <article
      data-slot="app-card"
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-soft",
        "transition-[transform,box-shadow,border-color] duration-200",
        href && "hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lifted",
        status === "coming-soon" && "bg-surface-muted/60 shadow-none",
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-white p-2 [&>img]:size-full [&>img]:object-contain [&>svg]:size-6">
          {logo}
        </div>
        <div className="flex items-center gap-2">
          {badge && <Badge tone={badge.tone} size="sm">{badge.label}</Badge>}
          {href && (
            <ArrowUpRight
              className="size-4 text-subtle-foreground transition-[color,transform] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-strong"
              aria-hidden
            />
          )}
        </div>
      </div>
      <div className="grid gap-1">
        <h3 className="font-heading text-base font-bold text-foreground">
          {href ? (
            <LinkComp href={href} className={cn("rounded-sm after:absolute after:inset-0 after:rounded-2xl", focusRing)}>
              {name}
            </LinkComp>
          ) : (
            name
          )}
        </h3>
        {maker && <p className="text-xs text-subtle-foreground">by {maker}</p>}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      {category && (
        <div className="mt-auto pt-1">
          <Badge tone="brand" size="sm">{category}</Badge>
        </div>
      )}
    </article>
  );
}
