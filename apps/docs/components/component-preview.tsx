import { readFile } from "node:fs/promises";
import path from "node:path";
import { examples } from "@/examples";
import { CodeBlock } from "./code-block";

/** Renders an example live, with its exact source underneath. */
export async function ComponentPreview({ id, title, description }: { id: string; title: string; description?: string }) {
  const Example = examples[id];
  const source = await readFile(path.join(process.cwd(), "examples", `${id}.tsx`), "utf8");
  const code = source.replace(/^"use client";\n\n?/, "");
  const anchor = id.replace("/", "-");

  return (
    <section aria-labelledby={anchor} className="mt-12 first:mt-0">
      <h3 id={anchor} className="scroll-mt-24 text-lg font-bold">
        <a href={`#${anchor}`} className="hover:text-primary-strong">
          {title}
        </a>
      </h3>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      <div className="mt-4 overflow-hidden rounded-2xl border border-border">
        <div className="relative flex min-h-48 items-center justify-center overflow-x-auto bg-surface bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px] p-6 sm:p-10">
          <Example />
        </div>
        <details className="group border-t border-border">
          <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-2.5 text-sm font-medium text-muted-foreground select-none hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
            <span className="transition-transform group-open:rotate-90" aria-hidden>
              ›
            </span>
            <span className="group-open:hidden">Show code</span>
            <span className="hidden group-open:inline">Hide code</span>
          </summary>
          <CodeBlock code={code} className="rounded-none border-0 border-t" />
        </details>
      </div>
    </section>
  );
}
