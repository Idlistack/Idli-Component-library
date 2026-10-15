import Link from "next/link";
import { GithubIcon } from "./github-icon";
import { Button } from "@idlistack/ui";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { REPO_URL } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/docs"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Docs
          </Link>
          <Link
            href="/docs/brand-kit"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Brand kit
          </Link>
          <Link
            href="/docs/components/button"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Components
          </Link>
          <Button variant="ghost" size="icon" asChild>
            <a href={REPO_URL} aria-label="GitHub repository">
              <GithubIcon />
            </a>
          </Button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
