import { REPO_URL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          Idli UI is the design system for{" "}
          <a href="https://idlistack.com" className="font-medium text-foreground hover:text-primary-strong">
            Idlistack
          </a>{" "}
          by T4GC.
        </p>
        <p className="flex gap-4">
          <a href={REPO_URL} className="font-medium text-foreground hover:text-primary-strong">
            Source on GitHub
          </a>
          <a href="/llms.txt" className="font-medium text-foreground hover:text-primary-strong">
            llms.txt
          </a>
        </p>
      </div>
    </footer>
  );
}
