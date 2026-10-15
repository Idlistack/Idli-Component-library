import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn, focusRing } from "../lib/cn";

export interface StackCardProps extends Omit<React.ComponentProps<"article">, "title"> {
  title: string;
  description: string;
  /** Icon for the stack's need, e.g. a lucide icon. */
  icon: React.ReactNode;
  /** Names of the apps included in this stack. */
  apps?: string[];
  href?: string;
  linkAs?: React.ElementType;
  /** Call-to-action label. */
  cta?: string;
}

/** A curated stack of apps grouped around one organisational need. */
export function StackCard({
  title,
  description,
  icon,
  apps = [],
  href,
  linkAs: LinkComp = "a",
  cta = "Explore stack",
  className,
  ...props
}: StackCardProps) {
  return (
    <article
      data-slot="stack-card"
      className={cn(
        "group relative isolate flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-soft",
        "transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lifted",
        className,
      )}
      {...props}
    >
      <span
        className="absolute top-0 right-0 -z-10 size-28 rounded-bl-[112px] bg-primary-soft transition-transform duration-300 group-hover:scale-110"
        aria-hidden
      />
      <div
        className={cn(
          "mb-5 grid size-12 place-items-center rounded-xl bg-primary-soft text-primary-strong",
          "transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground [&_svg]:size-6",
        )}
      >
        {icon}
      </div>
      <h3 className="font-heading text-lg font-bold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      {apps.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`Apps in ${title}`}>
          {apps.map((app) => (
            <li key={app} className="rounded-md border border-border bg-surface-muted px-2 py-0.5 text-xs text-muted-foreground">
              {app}
            </li>
          ))}
        </ul>
      )}
      {href && (
        <LinkComp
          href={href}
          className={cn(
            "mt-6 inline-flex w-fit items-center gap-1.5 rounded-sm text-sm font-semibold text-primary-strong",
            "after:absolute after:inset-0",
            focusRing,
          )}
        >
          {cta}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </LinkComp>
      )}
    </article>
  );
}
