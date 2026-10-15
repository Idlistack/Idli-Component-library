import type { Metadata } from "next";
import { Badge } from "@idlistack/ui";
import { PageHeader } from "@/components/page-header";
import { contrast } from "@/lib/contrast";

export const metadata: Metadata = { title: "Colour" };

const palettes = {
  blush: {
    note: "Idlistack pink. 500 is the logo pink; 600 is the accessible fill for buttons.",
    shades: { 50: "#fdf2f7", 100: "#fce4ef", 200: "#f9c9de", 300: "#f5a1c5", 400: "#f06fa8", 500: "#ed4690", 600: "#d63079", 700: "#b32363", 800: "#8e1d50", 900: "#6b1a3e", 950: "#420b24" },
  },
  ink: {
    note: "Navy for headings, body text and secondary actions.",
    shades: { 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cad5e2", 400: "#90a1b9", 500: "#64748b", 600: "#45556c", 700: "#314158", 800: "#1d293d", 900: "#0f172a", 950: "#0a0f1c" },
  },
  sand: {
    note: "Warm, rose-tinted neutrals for surfaces and borders.",
    shades: { 50: "#faf7f8", 100: "#f5f0f1", 200: "#e8e0e2", 300: "#d6cbce", 400: "#a8999d", 500: "#867277", 600: "#6b5a5f", 700: "#52444a", 800: "#3a3035", 900: "#241d21" },
  },
  ocean: {
    note: "Informational blue, used sparingly.",
    shades: { 50: "#eff6ff", 100: "#dbeafe", 400: "#4d9bff", 500: "#0070f3", 600: "#005cc8", 700: "#0049a0" },
  },
} as const;

const semantic = [
  { token: "background", use: "Page background" },
  { token: "surface", use: "Cards, popovers, inputs" },
  { token: "surface-muted", use: "Sections, hovers, tracks" },
  { token: "foreground", use: "Primary text" },
  { token: "muted-foreground", use: "Secondary text" },
  { token: "border", use: "Dividers and card edges" },
  { token: "brand", use: "Logo pink: icons, rings, large type" },
  { token: "primary", use: "Primary button fill" },
  { token: "primary-soft", use: "Tinted backgrounds" },
  { token: "primary-strong", use: "Pink text and links" },
  { token: "secondary", use: "Secondary button fill" },
  { token: "info", use: "Informational status" },
  { token: "success", use: "Positive status" },
  { token: "warning", use: "Needs attention" },
  { token: "danger", use: "Errors, destructive actions" },
];

function Ratio({ fg, bg }: { fg: string; bg: string }) {
  const r = contrast(fg, bg);
  const level = r >= 7 ? "AAA" : r >= 4.5 ? "AA" : r >= 3 ? "AA large" : "Fail";
  return (
    <span className="tabular-nums">
      {r.toFixed(1)} <span className="opacity-70">{level}</span>
    </span>
  );
}

export default function Colors() {
  return (
    <>
      <PageHeader eyebrow="Foundations" title="Colour">
        A warm, mostly neutral palette with a confident pink accent. Product code uses the semantic tokens; the raw
        scales exist so the tokens have something to point at.
      </PageHeader>

      <section>
        <h2 className="mb-2 text-2xl font-bold">Semantic tokens</h2>
        <p className="mb-6 text-muted-foreground">
          Use these as Tailwind utilities — <code className="font-mono text-sm">bg-primary</code>,{" "}
          <code className="font-mono text-sm">text-muted-foreground</code>,{" "}
          <code className="font-mono text-sm">border-border</code>. They switch automatically in dark mode; toggle the
          theme to compare.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {semantic.map((s) => (
            <div key={s.token} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3">
              <span
                className="size-11 shrink-0 rounded-lg border border-foreground/10"
                style={{ backgroundColor: `var(--idli-${s.token})` }}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="truncate font-mono text-[13px] font-medium">{s.token}</p>
                <p className="truncate text-xs text-muted-foreground">{s.use}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {Object.entries(palettes).map(([name, palette]) => (
        <section key={name} className="mt-14">
          <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="text-2xl font-bold capitalize">{name}</h2>
            <p className="text-sm text-muted-foreground">{palette.note}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-11">
            {Object.entries(palette.shades).map(([shade, hex]) => {
              const onWhite = contrast(hex, "#ffffff") >= contrast(hex, "#0f172a");
              return (
                <div key={shade} className="overflow-hidden rounded-xl border border-border">
                  <div
                    className="flex h-16 items-end p-2 text-[10px] font-medium"
                    style={{ backgroundColor: hex, color: onWhite ? "#ffffff" : "#0f172a" }}
                  >
                    <Ratio fg={onWhite ? "#ffffff" : "#0f172a"} bg={hex} />
                  </div>
                  <div className="bg-surface px-2 py-1.5">
                    <p className="text-xs font-semibold">{shade}</p>
                    <p className="font-mono text-[10px] text-muted-foreground uppercase">{hex}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <section className="mt-14">
        <h2 className="mb-4 text-2xl font-bold">Why two pinks?</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border p-5">
            <div className="mb-4 grid h-20 place-items-center rounded-xl bg-blush-500 text-sm font-medium text-white">
              White on blush-500
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Contrast <Ratio fg="#ffffff" bg="#ed4690" /></span>
              <Badge tone="warning" size="sm">Large text only</Badge>
            </div>
          </div>
          <div className="rounded-2xl border border-border p-5">
            <div className="mb-4 grid h-20 place-items-center rounded-xl bg-blush-600 text-sm font-medium text-white">
              White on blush-600
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Contrast <Ratio fg="#ffffff" bg="#d63079" /></span>
              <Badge tone="success" size="sm">All text</Badge>
            </div>
          </div>
        </div>
        <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
          The logo pink fails WCAG AA for normal-size white text. Buttons and other text-bearing fills use one step
          darker, which reads as the same brand colour while staying legible for everyone.
        </p>
      </section>
    </>
  );
}
