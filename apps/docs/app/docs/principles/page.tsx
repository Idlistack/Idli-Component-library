import type { Metadata } from "next";
import { Accessibility, Feather, HandHeart, Layers, MessageSquareText, Smartphone } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { principles } from "@/lib/principles";

export const metadata: Metadata = {
  title: "Design principles",
  description: "The six principles behind every Idli UI decision, from plain language to accessibility by default.",
};

const icons = [MessageSquareText, Feather, Accessibility, Smartphone, HandHeart, Layers];

export default function Principles() {
  return (
    <>
      <PageHeader eyebrow="Getting started" title="Design principles">
        Six ideas that guide every decision in Idli UI. When two good options compete, these are the tiebreakers.
      </PageHeader>
      <ol className="grid gap-6">
        {principles.map((p, i) => {
          const Icon = icons[i];
          return (
          <li key={p.title} className="rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-7">
            <div className="flex items-start gap-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-strong">
                <Icon className="size-5" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-xs text-subtle-foreground">0{i + 1}</p>
                <h2 className="mt-0.5 text-xl font-bold">{p.title}</h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">{p.body}</p>
                <ul className="mt-4 grid gap-2 text-sm">
                  {p.practice.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
          );
        })}
      </ol>
    </>
  );
}
