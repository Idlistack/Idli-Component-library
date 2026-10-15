import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Layout & elevation" };

const spacing = [1, 2, 3, 4, 6, 8, 12, 16, 24];
const radii = [
  { name: "md", cls: "rounded-md", px: "6px", use: "Small buttons, inline code" },
  { name: "lg", cls: "rounded-lg", px: "8px", use: "Buttons, inputs" },
  { name: "xl", cls: "rounded-xl", px: "12px", use: "Alerts, menus, tiles" },
  { name: "2xl", cls: "rounded-2xl", px: "16px", use: "Cards, dialogs" },
  { name: "full", cls: "rounded-full", px: "9999px", use: "Badges, avatars, switches" },
];
const shadows = [
  { name: "none + border", cls: "border border-border", use: "Default for flat surfaces" },
  { name: "shadow-soft", cls: "shadow-soft border border-border", use: "Cards at rest" },
  { name: "shadow-lifted", cls: "shadow-lifted border border-border", use: "Hover, popovers, dialogs" },
];

export default function Layout() {
  return (
    <>
      <PageHeader eyebrow="Foundations" title="Layout & elevation">
        A 4px spacing grid, rounded but not bubbly corners, and soft, low shadows. Depth is a hint, not a feature.
      </PageHeader>

      <h2 className="mb-6 text-2xl font-bold">Spacing</h2>
      <p className="mb-6 text-muted-foreground">Tailwind’s 4px scale. Stick to these steps; 4, 6 and 8 cover most component gaps.</p>
      <div className="grid gap-2">
        {spacing.map((s) => (
          <div key={s} className="flex items-center gap-4 text-sm">
            <span className="w-10 font-mono text-muted-foreground">{s}</span>
            <span className="w-14 font-mono text-xs text-subtle-foreground">{s * 4}px</span>
            <span className="h-3 rounded-sm bg-brand/70" style={{ width: s * 4 }} />
          </div>
        ))}
      </div>

      <h2 className="mt-14 mb-6 text-2xl font-bold">Radius</h2>
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {radii.map((r) => (
          <div key={r.name}>
            <div className={`h-20 border-2 border-brand/40 bg-primary-soft ${r.cls}`} />
            <p className="mt-3 font-mono text-sm font-medium">{r.cls}</p>
            <p className="text-xs text-muted-foreground">{r.px} · {r.use}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 mb-6 text-2xl font-bold">Elevation</h2>
      <div className="grid gap-6 rounded-2xl bg-surface-muted p-6 sm:grid-cols-3">
        {shadows.map((s) => (
          <div key={s.name} className={`rounded-2xl bg-surface p-5 ${s.cls}`}>
            <p className="font-mono text-sm font-medium">{s.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.use}</p>
          </div>
        ))}
      </div>

      <div className="prose-idli">
        <h2>Motion</h2>
        <ul>
          <li><strong>150ms</strong> for colour and hover changes; <strong>180–200ms</strong> for things entering the screen.</li>
          <li>Enter with a small rise and fade (<code>animate-pop-in</code>); leave faster than you arrive.</li>
          <li>Everything collapses to near-instant when the person prefers reduced motion.</li>
        </ul>
        <h2>Containers</h2>
        <ul>
          <li>Marketing pages: <code>max-w-7xl</code> with <code>px-4 sm:px-6 lg:px-8</code> gutters.</li>
          <li>Reading content: <code>max-w-3xl</code>.</li>
          <li>Forms in dialogs: <code>max-w-lg</code>.</li>
        </ul>
      </div>
    </>
  );
}
