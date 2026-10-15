import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { Badge, Button } from "@idlistack/ui";
import { PageHeader } from "@/components/page-header";
import { buildDesignTokens, type ColorToken } from "@/lib/design-tokens";
import { registry } from "@/lib/registry";
import { DESIGN_SYSTEM_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Design system",
  description: "Every Idli UI token, type style and component on one sheet, in both themes.",
};

/** Follow `{alias}` values to a literal colour for the given theme. */
function resolve(tokens: ColorToken[], value: string | undefined, theme: "light" | "dark", depth = 0): string {
  if (!value) return "";
  const alias = /^\{(.+)\}$/.exec(value);
  if (!alias || depth > 16) return value;
  const target = tokens.find((t) => t.name === alias[1]);
  return resolve(tokens, target ? (theme === "dark" ? target.value.dark ?? target.value.light : target.value.light) : "", theme, depth + 1);
}

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <span className="size-7 shrink-0 rounded-md border border-foreground/10" style={{ background: color }} aria-hidden />
      <span className="truncate font-mono text-[11px] text-muted-foreground" title={label}>
        {label}
      </span>
    </div>
  );
}

const md = (s: string) =>
  s.split(/(`[^`]+`)/).map((part, i) =>
    part.startsWith("`") ? (
      <code key={i} className="rounded border border-border bg-surface-muted px-1 font-mono text-[0.85em] text-foreground">
        {part.slice(1, -1)}
      </code>
    ) : (
      part
    ),
  );

export default function DesignSystemPage() {
  const tokens = buildDesignTokens();
  const colors = tokens.color.tokens;
  const semantic = colors.filter((t) => t.name.startsWith("idli-"));
  const palettes = ["blush", "ink", "sand", "ocean"].map((p) => ({ name: p, shades: colors.filter((t) => t.name.startsWith(`color-${p}-`)) }));

  return (
    <>
      <PageHeader eyebrow="Getting started" title="Design system">
        Every token, type style and component in Idli UI on one sheet, read straight from the theme the components
        use. The same system lives on claude.ai, where Claude uses it to make on-brand decks, designs and prototypes.
      </PageHeader>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <a href={DESIGN_SYSTEM_URL}>
            Open in Claude <ArrowUpRight />
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href="/design-tokens.json">
            <Download /> design-tokens.json
          </a>
        </Button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        The Claude design system opens for people it has been shared with. The JSON uses the same format, so tools and
        agents can read it directly.
      </p>

      <section aria-labelledby="ds-colour" className="mt-14">
        <h2 id="ds-colour" className="text-2xl font-bold">
          Semantic colours
        </h2>
        <p className="mt-2 text-muted-foreground">
          The tokens components use, with their value in each theme and measured contrast for text colours.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-surface-muted text-xs tracking-wide text-muted-foreground uppercase">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Token and use</th>
                <th scope="col" className="px-4 py-3 font-semibold">Light</th>
                <th scope="col" className="px-4 py-3 font-semibold">Dark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {semantic.map((t) => {
                const light = resolve(colors, t.value.light, "light");
                const dark = resolve(colors, t.value.dark ?? t.value.light, "dark");
                return (
                  <tr key={t.name} className="align-top">
                    <td className="px-4 py-3">
                      <p className="font-mono text-[13px] font-medium text-primary-strong">{t.name}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{md(t.usage)}</p>
                    </td>
                    <td className="w-44 px-4 py-3"><Swatch color={light} label={light} /></td>
                    <td className="w-44 px-4 py-3"><Swatch color={dark} label={dark} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="ds-palette" className="mt-14">
        <h2 id="ds-palette" className="text-2xl font-bold">
          Palettes
        </h2>
        <div className="mt-6 grid gap-6">
          {palettes.map((p) => (
            <div key={p.name}>
              <h3 className="mb-2 text-sm font-semibold capitalize">{p.name}</h3>
              <div className="flex overflow-hidden rounded-xl border border-border">
                {p.shades.map((s) => (
                  <div key={s.name} className="h-12 flex-1" style={{ background: s.value.light }} title={`${s.name} ${s.value.light}`}>
                    <span className="sr-only">{`${s.name} ${s.value.light}`}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="ds-type" className="mt-14">
        <h2 id="ds-type" className="text-2xl font-bold">
          Type styles
        </h2>
        <div className="mt-6 divide-y divide-border rounded-2xl border border-border">
          {tokens.type.groups.flatMap((g) =>
            g.styles.map((s) => (
              <div key={s.name} className="grid gap-2 p-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <div>
                  <p className="font-mono text-sm font-medium">{s.name}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {g.family === "heading" ? "Manrope" : "Inter"} {s.fontWeight} · {s.fontSize}/{s.lineHeight}
                  </p>
                </div>
                <p
                  className={`min-w-0 break-words ${g.family === "heading" ? "font-heading" : "font-sans"} ${s.name === "caption" ? "uppercase" : ""}`}
                  style={{ fontSize: s.fontSize, lineHeight: s.lineHeight, fontWeight: s.fontWeight, letterSpacing: s.letterSpacing }}
                >
                  {s.sample}
                </p>
              </div>
            )),
          )}
        </div>
      </section>

      <section aria-labelledby="ds-shape" className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <h2 id="ds-shape" className="text-2xl font-bold">
            Radius
          </h2>
          <ul className="mt-6 grid grid-cols-5 gap-3">
            {tokens.radius.tokens.map((r) => (
              <li key={r.name} className="grid gap-2">
                <span className="aspect-square border-2 border-brand/40 bg-primary-soft" style={{ borderRadius: r.value }} aria-hidden />
                <span className="font-mono text-[11px] text-muted-foreground">{r.name.replace("radius-", "")}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Elevation</h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-surface-muted p-5">
            {tokens.shadow.tokens.map((s) => (
              <li key={s.name} className="rounded-xl border border-border bg-surface p-4" style={{ boxShadow: s.value }}>
                <p className="font-mono text-xs font-medium">{s.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="ds-space" className="mt-14">
        <h2 id="ds-space" className="text-2xl font-bold">
          Spacing
        </h2>
        <ul className="mt-6 grid gap-2">
          {tokens.spacing.tokens.slice(1).map((s) => (
            <li key={s.name} className="flex items-center gap-4 text-sm">
              <span className="w-20 font-mono text-xs text-muted-foreground">{s.name}</span>
              <span className="w-12 font-mono text-xs text-subtle-foreground">{s.value}</span>
              <span className="h-3 rounded-sm bg-brand/70" style={{ width: s.value }} aria-hidden />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="ds-components" className="mt-14">
        <h2 id="ds-components" className="text-2xl font-bold">
          Components
        </h2>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {registry.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/docs/components/${c.slug}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-brand/40 hover:text-primary-strong"
              >
                {c.name}
                {c.group === "Patterns" && <Badge tone="brand" size="sm">Pattern</Badge>}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
