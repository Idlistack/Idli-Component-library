"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@idlistack/ui/utils";
import { docsNav } from "@/lib/registry";

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Documentation" className="grid gap-7">
      {docsNav.map((section) => (
        <div key={section.title}>
          <h2 className="mb-2 px-3 font-sans text-xs font-semibold tracking-wider text-subtle-foreground uppercase">
            {section.title}
          </h2>
          <ul className="grid gap-0.5">
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-1.5 text-sm transition-colors",
                      active
                        ? "bg-primary-soft font-medium text-primary-strong"
                        : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function DocsSidebar() {
  return (
    <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-60 shrink-0 overflow-y-auto py-10 pr-4 lg:block">
      <NavList />
    </aside>
  );
}

export function DocsMobileNav() {
  const ref = useRef<HTMLDetailsElement>(null);
  return (
    <details ref={ref} className="group mb-8 rounded-xl border border-border lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
        Browse documentation
        <span className="text-muted-foreground transition-transform group-open:rotate-180" aria-hidden>
          ▾
        </span>
      </summary>
      <div className="border-t border-border p-3">
        <NavList onNavigate={() => ref.current?.removeAttribute("open")} />
      </div>
    </details>
  );
}
