import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { ComponentPreview } from "@/components/component-preview";
import { PageHeader } from "@/components/page-header";
import { registry } from "@/lib/registry";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return registry.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = registry.find((c) => c.slug === slug);
  return doc ? { title: doc.name, description: doc.description } : {};
}

function Code({ children }: { children: string }) {
  // Render `inline code` spans inside registry strings.
  return (
    <>
      {children.split(/(`[^`]+`)/).map((part, i) =>
        part.startsWith("`") ? (
          <code key={i} className="rounded-md border border-border bg-surface-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default async function ComponentPage({ params }: Props) {
  const { slug } = await params;
  const index = registry.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const doc = registry[index];
  const prev = registry[index - 1];
  const next = registry[index + 1];

  return (
    <article>
      <PageHeader eyebrow={doc.group === "Patterns" ? "Idlistack pattern" : "Component"} title={doc.name}>
        {doc.description}
      </PageHeader>

      <CodeBlock code={`import { ${doc.imports.join(", ")} } from "@idlistack/ui";`} />
      <p className="mt-3 text-xs text-muted-foreground">
        For AI agents:{" "}
        <a href={`/docs/components/${doc.slug}.md`} className="font-medium text-primary-strong hover:underline">
          this page as Markdown
        </a>
        {" · "}
        <a href="/llms-full.txt" className="font-medium text-primary-strong hover:underline">
          full reference
        </a>
      </p>

      <h2 className="mt-14 mb-6 text-2xl font-bold">Examples</h2>
      {doc.examples.map((ex) => (
        <ComponentPreview key={ex.id} {...ex} />
      ))}

      <h2 className="mt-16 mb-6 text-2xl font-bold">Usage</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-success/25 bg-success-soft/50 p-5">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-success">
            <Check className="size-4" aria-hidden /> Do
          </p>
          <ul className="grid gap-2.5 text-sm leading-relaxed text-foreground">
            {doc.usage.do.map((item) => (
              <li key={item}>
                <Code>{item}</Code>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-danger/25 bg-danger-soft/50 p-5">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-danger">
            <X className="size-4" aria-hidden /> Don’t
          </p>
          <ul className="grid gap-2.5 text-sm leading-relaxed text-foreground">
            {doc.usage.dont.map((item) => (
              <li key={item}>
                <Code>{item}</Code>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {doc.props && (
        <>
          <h2 className="mt-16 mb-6 text-2xl font-bold">Props</h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-surface-muted text-xs tracking-wide text-muted-foreground uppercase">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Prop</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Type</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Default</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {doc.props.map((p) => (
                  <tr key={p.name} className="align-top">
                    <td className="px-4 py-3 font-mono text-[13px] font-medium whitespace-nowrap text-primary-strong">{p.name}</td>
                    <td className="max-w-56 px-4 py-3 font-mono text-[12px] text-muted-foreground">{p.type}</td>
                    <td className="px-4 py-3 font-mono text-[12px] text-muted-foreground">{p.default ?? "—"}</td>
                    <td className="px-4 py-3 leading-relaxed text-foreground">
                      <Code>{p.description}</Code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <h2 className="mt-16 mb-6 text-2xl font-bold">Accessibility</h2>
      <ul className="grid gap-3 text-[15px] leading-relaxed text-muted-foreground">
        {doc.accessibility.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
            <span>
              <Code>{item}</Code>
            </span>
          </li>
        ))}
      </ul>

      <nav aria-label="Pagination" className="mt-20 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={`/docs/components/${prev.slug}`} className="group rounded-xl border border-border p-4 transition-colors hover:border-brand/40">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowLeft className="size-3.5" aria-hidden /> Previous
            </span>
            <span className="mt-1 block font-heading font-bold group-hover:text-primary-strong">{prev.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/docs/components/${next.slug}`}
            className="group rounded-xl border border-border p-4 text-right transition-colors hover:border-brand/40"
          >
            <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
              Next <ArrowRight className="size-3.5" aria-hidden />
            </span>
            <span className="mt-1 block font-heading font-bold group-hover:text-primary-strong">{next.name}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
