import type { Metadata } from "next";
import { Bot, FileText, Package } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "@idlistack/ui";
import { PageHeader } from "@/components/page-header";
import { PromptBlock } from "@/components/prompt-block";
import { SiteUrl } from "@/components/site-url";
import { REPO_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Use with AI agents",
  description: "Point an AI coding agent at llms.txt, the Markdown docs or the AGENTS.md in the package.",
};

export default function AgentsPage() {
  const sources = [
    {
      icon: FileText,
      title: "This site",
      body: "llms.txt is an index; llms-full.txt is the whole reference in one file. Append .md to any docs URL for that page as Markdown.",
      links: [
        { path: "/llms.txt", href: "/llms.txt" },
        { path: "/llms-full.txt", href: "/llms-full.txt" },
        { path: "/docs/components/button.md", href: "/docs/components/button.md" },
      ],
    },
    {
      icon: Package,
      title: "The npm package",
      body: "The same full reference ships inside the package, so an agent working in your codebase finds it without network access.",
      links: [{ label: "node_modules/@idlistack/ui/AGENTS.md", href: `${REPO_URL}/blob/main/packages/ui/AGENTS.md` }],
    },
    {
      icon: Bot,
      title: "The repository",
      body: "A root AGENTS.md (and CLAUDE.md) explains the repo layout, conventions and checks for agents contributing to Idli UI itself.",
      links: [{ label: "AGENTS.md on GitHub", href: `${REPO_URL}/blob/main/AGENTS.md` }],
    },
  ];

  return (
    <>
      <PageHeader eyebrow="Getting started" title="Use with AI agents">
        Idli UI ships its documentation in formats an AI coding agent can read in one go. Point an agent at any of
        these and it has the tokens, every component's props and rules, and runnable examples.
      </PageHeader>

      <div className="grid gap-4">
        {sources.map((s) => (
          <Card key={s.title}>
            <CardContent className="flex gap-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-strong">
                <s.icon className="size-5" aria-hidden />
              </div>
              <div className="min-w-0">
                <CardTitle>{s.title}</CardTitle>
                <CardDescription className="mt-1">{s.body}</CardDescription>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.links.map((l) => (
                    <li key={l.href} className="min-w-0">
                      <a
                        href={l.href}
                        className="inline-block max-w-full rounded-md border border-border bg-surface-muted px-2 py-1 font-mono text-xs break-all text-foreground hover:border-brand/40 hover:text-primary-strong"
                      >
                        {"path" in l ? <SiteUrl path={l.path} /> : l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="prose-idli">
        <h2>Example prompts</h2>
        <p>For an agent working in a project that already has the package installed:</p>
      </div>
      <PromptBlock text="Use Idli UI (@idlistack/ui) for all UI. Read node_modules/@idlistack/ui/AGENTS.md first, then build the organisation signup form with Field, Input, Select and Button." />
      <div className="prose-idli">
        <p>For an agent that can fetch URLs:</p>
      </div>
      <PromptBlock text="Read {site}/llms-full.txt, then build a pricing page with PricingCard following its rules." />
      <div className="prose-idli">
        <h2>What the reference contains</h2>
        <ul>
          <li>Setup: install, theme import, fonts, dark mode and the import rules (components vs. server-safe helpers).</li>
          <li>The six design principles as actionable rules, plus writing conventions.</li>
          <li>Every design token as a Tailwind utility, with what it is for.</li>
          <li>Every component: import line, props table, do and don’t, accessibility notes, and the full source of each live example.</li>
        </ul>
        <p>
          It is generated from the same registry and example files as these pages, so it is always in sync. Regenerate
          with <code>npm run gen:agent-docs -w docs</code>; the docs build does this automatically.
        </p>
      </div>
    </>
  );
}
