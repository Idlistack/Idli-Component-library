import type { Metadata } from "next";
import { Badge } from "@idlistack/ui";
import { PageHeader } from "@/components/page-header";
import { CopyColour } from "@/components/copy-colour";
import { contrast } from "@/lib/contrast";
import { palettes, semanticTokens } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Colour",
  description: "Idli UI semantic colour tokens and the blush, ink, sand and ocean palettes, with contrast ratios.",
};

function Ratio({ fg, bg }: { fg: string; bg: string }) {
  const r = contrast(fg, bg);
  const level = r >= 7 ? "AAA" : r >= 4.5 ? "AA" : r >= 3 ? "AA large" : "Fail";
  return (
    <span className="tabular-nums">
      {r.toFixed(1)} <span>{level}</span>
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
          {semanticTokens.map((s) => (
            <div key={s.token} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3">
              <CopyColour
                cssVar={`--idli-${s.token}`}
                name={s.token}
                className="size-11 shrink-0 rounded-lg border border-foreground/10"
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
                  <CopyColour value={hex} name={`${name} ${shade}`} className="block h-16 w-full" />
                  <div className="bg-surface px-2 py-1.5">
                    <p className="text-xs font-semibold">{shade}</p>
                    <p className="font-mono text-[10px] text-muted-foreground uppercase">{hex}</p>
                    {/* Contrast of the better of white or ink text on this shade, shown on the surface so the label itself stays legible. */}
                    <p className="mt-0.5 text-[10px] text-muted-foreground" title={`Best text colour: ${onWhite ? "white" : "ink"}`}>
                      <Ratio fg={onWhite ? "#ffffff" : "#0f172a"} bg={hex} />
                    </p>
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
            <CopyColour value="#ed4690" name="blush-500" className="mb-4 grid h-20 w-full place-items-center rounded-xl font-heading text-2xl font-bold text-white">
              White on blush-500
            </CopyColour>
            <div className="flex items-center justify-between text-sm">
              <span>Contrast <Ratio fg="#ffffff" bg="#ed4690" /></span>
              <Badge tone="warning" size="sm">Large text only</Badge>
            </div>
          </div>
          <div className="rounded-2xl border border-border p-5">
            <CopyColour value="#d63079" name="blush-600" className="mb-4 grid h-20 w-full place-items-center rounded-xl font-heading text-2xl font-bold text-white">
              White on blush-600
            </CopyColour>
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
