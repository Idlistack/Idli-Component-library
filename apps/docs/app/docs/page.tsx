import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@idlistack/ui";
import { PageHeader } from "@/components/page-header";
import { registry } from "@/lib/registry";

export const metadata: Metadata = { title: "Introduction" };

export default function DocsIntro() {
  return (
    <>
      <PageHeader eyebrow="Getting started" title="Introduction">
        Idli UI is the design system behind Idlistack: tokens, accessible React components and ready-made patterns
        for building calm, trustworthy tools for the social sector.
      </PageHeader>
      <div className="prose-idli">
        <p>
          Idlistack exists so that organisations can <strong>focus on impact, not infrastructure</strong>. Our
          interfaces should do the same — get out of the way, explain things plainly and never make anyone feel they
          need to be technical. Idli UI turns that idea into reusable parts.
        </p>
        <h2>What’s inside</h2>
        <ul>
          <li>
            <strong>Design tokens</strong> — colour, type, radius and elevation as Tailwind v4 theme variables, with a
            dark theme built in.
          </li>
          <li>
            <strong>{registry.filter((c) => c.group === "Components").length} core components</strong> — buttons,
            form controls, overlays and feedback, built on Radix primitives for keyboard and screen reader support.
          </li>
          <li>
            <strong>{registry.filter((c) => c.group === "Patterns").length} Idlistack patterns</strong> — app and
            stack cards, the deploy stepper, pricing and navigation, as used on idlistack.com.
          </li>
        </ul>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { title: "Installation", body: "Add the package and import the theme.", href: "/docs/installation" },
          { title: "Principles", body: "How we make design decisions.", href: "/docs/principles" },
          { title: "Components", body: "Browse every component with live examples.", href: "/docs/components/button" },
        ].map((item) => (
          <Card key={item.href} interactive className="relative p-5">
            <h3 className="font-heading font-bold">
              <Link href={item.href} className="after:absolute after:inset-0">
                {item.title}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
            <ArrowRight className="mt-4 size-4 text-primary-strong" aria-hidden />
          </Card>
        ))}
      </div>
    </>
  );
}
