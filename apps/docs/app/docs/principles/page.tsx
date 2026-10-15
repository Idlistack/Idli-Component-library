import type { Metadata } from "next";
import { Accessibility, Feather, HandHeart, Layers, MessageSquareText, Smartphone } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Design principles" };

const principles = [
  {
    icon: MessageSquareText,
    title: "Skip the tech",
    body: "Write for a programme manager, not an engineer. Say “your website is live”, not “deployment succeeded”. If a screen needs a glossary, we haven't finished designing it.",
    practice: ["Use verbs people already use: publish, send, invite.", "Explain consequences before asking for a decision.", "Hide infrastructure details behind “Advanced”."],
  },
  {
    icon: Feather,
    title: "Calm, confident, one step at a time",
    body: "Teams come to us to stop worrying about servers. Every screen has one clear primary action, generous space and a quiet palette, so the next step is always obvious.",
    practice: ["One primary button per view.", "Break long flows into a Stepper.", "Prefer soft surfaces and borders over heavy shadows."],
  },
  {
    icon: Accessibility,
    title: "Accessible by default",
    body: "We meet WCAG 2.2 AA in every component. Contrast, keyboard access, focus visibility and reduced motion are built in, not left to each product team.",
    practice: [
      "Solid pink fills use blush-600 (4.6:1 with white); the brighter logo pink is for large type, icons and focus rings.",
      "Never communicate status with colour alone — always add a word or icon.",
      "Every interactive element is reachable and operable with a keyboard.",
    ],
  },
  {
    icon: Smartphone,
    title: "Every rupee, every kilobyte",
    body: "Our users work on budget Android phones, shared laptops and patchy connections. Interfaces should be light, fast and usable on a 360px screen.",
    practice: ["Design mobile-first; test at 360px.", "No decorative images or video where an icon will do.", "Tree-shakable components; no runtime CSS-in-JS."],
  },
  {
    icon: HandHeart,
    title: "Warm, not loud",
    body: "Pink is our warmth and our signature, so we use it with intent: for the main action, the active state, a highlight. Roughly 60% neutral surface, 30% ink, 10% brand.",
    practice: ["Reach for `soft` and `brand` badges before solid pink blocks.", "Use the warm sand neutrals, not cold greys, for surfaces."],
  },
  {
    icon: Layers,
    title: "Tokens, not values",
    body: "Components only use semantic tokens like `bg-primary` and `text-muted-foreground`. That is what makes dark mode free and lets us re-tune the brand in one place.",
    practice: ["Never hard-code hex values in product code.", "Add a token before adding a one-off colour."],
  },
];

export default function Principles() {
  return (
    <>
      <PageHeader eyebrow="Getting started" title="Design principles">
        Six ideas that guide every decision in Idli UI. When two good options compete, these are the tiebreakers.
      </PageHeader>
      <ol className="grid gap-6">
        {principles.map((p, i) => (
          <li key={p.title} className="rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-7">
            <div className="flex items-start gap-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-strong">
                <p.icon className="size-5" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-xs text-subtle-foreground">0{i + 1}</p>
                <h2 className="mt-0.5 text-xl font-bold">{p.title}</h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">{p.body.replace(/`/g, "")}</p>
                <ul className="mt-4 grid gap-2 text-sm">
                  {p.practice.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                      <span>{item.replace(/`/g, "")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
