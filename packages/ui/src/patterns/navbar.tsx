import * as React from "react";
import { Menu, X } from "lucide-react";
import { cn, focusRing } from "../lib/cn";

export interface NavbarLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavbarProps extends React.ComponentProps<"header"> {
  /** Brand mark, usually the Idlistack logo wrapped in a home link. */
  logo: React.ReactNode;
  links?: NavbarLink[];
  /** Right-hand actions such as "Log in" and "Get started" buttons. */
  actions?: React.ReactNode;
  linkAs?: React.ElementType;
  /** Stick to the top of the viewport with a translucent backdrop. */
  sticky?: boolean;
}

/** Responsive site header with a disclosure menu on small screens. */
export function Navbar({
  logo,
  links = [],
  actions,
  linkAs: LinkComp = "a",
  sticky = true,
  className,
  ...props
}: NavbarProps) {
  const [open, setOpen] = React.useState(false);
  const menuId = React.useId();
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Escape closes the open menu and returns focus to the menu button.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      data-slot="navbar"
      className={cn(
        "z-40 w-full border-b border-border bg-background/90 backdrop-blur-sm",
        sticky && "sticky top-0",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center">{logo}</div>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <LinkComp
                  href={link.href}
                  aria-current={link.active ? "page" : undefined}
                  className={cn(
                    "rounded-sm text-sm font-medium transition-colors",
                    link.active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    focusRing,
                  )}
                >
                  {link.label}
                </LinkComp>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-3 md:flex">{actions}</div>
        <button
          ref={buttonRef}
          type="button"
          className={cn(
            "grid size-10 place-items-center rounded-lg text-foreground transition-colors hover:bg-surface-muted md:hidden",
            focusRing,
          )}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      <div id={menuId} hidden={!open} className="border-t border-border px-4 pt-2 pb-5 md:hidden">
        <nav aria-label="Main mobile">
          <ul className="grid">
            {links.map((link) => (
              <li key={link.href}>
                <LinkComp
                  href={link.href}
                  aria-current={link.active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-base font-medium",
                    link.active ? "bg-primary-soft text-primary-strong" : "text-foreground hover:bg-surface-muted",
                    focusRing,
                  )}
                >
                  {link.label}
                </LinkComp>
              </li>
            ))}
          </ul>
        </nav>
        {actions && <div className="mt-4 grid gap-2 [&>*]:w-full">{actions}</div>}
      </div>
    </header>
  );
}
