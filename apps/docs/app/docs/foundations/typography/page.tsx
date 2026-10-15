import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Typography",
  description: "Manrope headings, Inter body text and the Idli UI type scale.",
};

const scale = [
  { name: "Display", cls: "font-heading text-5xl font-extrabold tracking-tight", spec: "Manrope 800 · 48/48 · −0.025em", sample: "Open-source made effortless." },
  { name: "Heading 1", cls: "font-heading text-4xl font-extrabold tracking-tight", spec: "Manrope 800 · 36/40", sample: "Just the right tools" },
  { name: "Heading 2", cls: "font-heading text-2xl font-bold", spec: "Manrope 700 · 24/32", sample: "Every rupee matters" },
  { name: "Heading 3", cls: "font-heading text-lg font-bold", spec: "Manrope 700 · 18/28", sample: "Fundraising stack" },
  { name: "Body large", cls: "text-lg leading-relaxed", spec: "Inter 400 · 18/29", sample: "Deploy and start using powerful open-source tools without worrying about servers." },
  { name: "Body", cls: "text-[15px] leading-7", spec: "Inter 400 · 15/28", sample: "We handle setup, updates and hosting so your team can focus on impact." },
  { name: "Small", cls: "text-sm", spec: "Inter 400/500 · 14/20", sample: "Last backup 2 hours ago" },
  { name: "Caption", cls: "text-xs font-medium tracking-wider uppercase text-muted-foreground", spec: "Inter 500 · 12/16 · uppercase", sample: "Communication" },
];

export default function Typography() {
  return (
    <>
      <PageHeader eyebrow="Foundations" title="Typography">
        Manrope gives headings a friendly, rounded confidence that echoes the Idlistack wordmark. Inter keeps body text
        crisp and legible at small sizes.
      </PageHeader>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border p-6">
          <p className="font-heading text-6xl font-extrabold">Aa</p>
          <p className="mt-4 font-heading text-lg font-bold">Manrope</p>
          <p className="text-sm text-muted-foreground">Headings · 700, 800 · <code className="font-mono">font-heading</code></p>
        </div>
        <div className="rounded-2xl border border-border p-6">
          <p className="text-6xl font-semibold">Aa</p>
          <p className="mt-4 font-heading text-lg font-bold">Inter</p>
          <p className="text-sm text-muted-foreground">Body & UI · 400, 500, 600 · <code className="font-mono">font-sans</code></p>
        </div>
      </div>
      <h2 className="mt-14 mb-6 text-2xl font-bold">Type scale</h2>
      <div className="divide-y divide-border rounded-2xl border border-border">
        {scale.map((t) => (
          <div key={t.name} className="grid gap-2 p-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <div>
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="font-mono text-[11px] text-muted-foreground">{t.spec}</p>
            </div>
            <p className={`${t.cls} min-w-0 break-words`}>{t.sample}</p>
          </div>
        ))}
      </div>
      <div className="prose-idli">
        <h2>Guidelines</h2>
        <ul>
          <li>Keep line length between 50 and 75 characters for reading text (<code>max-w-prose</code> or <code>max-w-2xl</code>).</li>
          <li>Use sentence case everywhere, including buttons and headings.</li>
          <li>Highlight one key word of a hero headline in brand pink, as idlistack.com does with “effortless”.</li>
          <li>Never go below 12px, and keep body text at 15px or larger.</li>
        </ul>
      </div>
    </>
  );
}
