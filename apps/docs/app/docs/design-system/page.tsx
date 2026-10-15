import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { Badge, Button } from "@idlistack/ui";
import { PageHeader } from "@/components/page-header";
import { buildDesignTokens, type ColorToken } from "@/lib/design-tokens";
import { registry } from "@/lib/registry";
import { brandBook, brandIntro } from "@/lib/brand";

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

/** The system's cover: its palette as blocks and the round "idli" discs, bound to tokens so it follows the theme. */
function Cover() {
  return (
    <figure className="relative overflow-hidden rounded-2xl border border-border bg-background">
      <svg viewBox="0 0 960 288" className="block h-auto w-full" role="img" aria-labelledby="ds-cover-title">
        <title id="ds-cover-title">Idli UI: the palette as blocks and round discs</title>
        <rect className="fill-blush-600" x="640" y="-16" width="192" height="224" rx="16" />
        <rect className="fill-ink-900 dark:fill-sand-100" x="512" y="208" width="224" height="96" rx="16" />
        <rect className="fill-sand-200 dark:fill-ink-700" x="848" y="64" width="128" height="240" rx="16" />
        <circle className="fill-blush-500" cx="576" cy="96" r="48" />
        <circle className="fill-blush-200" cx="736" cy="104" r="32" />
        <circle className="fill-blush-600" cx="736" cy="104" r="16" />
        <circle className="fill-sand-200 dark:fill-ink-700" cx="576" cy="176" r="16" />
        <circle className="fill-ocean-500" cx="912" cy="32" r="16" />
        <circle className="fill-blush-500" cx="784" cy="256" r="16" />
        <circle className="fill-blush-200" cx="912" cy="208" r="24" />
        <text x="48" y="212" className="fill-foreground font-heading" fontSize="96" fontWeight="800" letterSpacing="-2.9">
          Idli UI
        </text>
        <text x="50" y="250" className="fill-muted-foreground font-sans" fontSize="15">
          Open-source made effortless.
        </text>
      </svg>
    </figure>
  );
}

export default function DesignSystemPage() {
  const tokens = buildDesignTokens();
  const colors = tokens.color.tokens;
  const semantic = colors.filter((t) => t.name.startsWith("idli-"));
  const palettes = ["blush", "ink", "sand", "ocean"].map((p) => ({ name: p, shades: colors.filter((t) => t.name.startsWith(`color-${p}-`)) }));

  return (
    <>
      <PageHeader eyebrow="Getting started" title="Design system">
        {brandIntro} This page is the whole system on one sheet: how to write and compose, every token in both
        themes, the logos and the components.
      </PageHeader>

      <Cover />

      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="outline" asChild>
          <a href="/design-tokens.json" download>
            <Download /> design-tokens.json
          </a>
        </Button>
        <Button variant="ghost" asChild>
          <a href="#brand-book">Brand book</a>
        </Button>
        <Button variant="ghost" asChild>
          <a href="#ds-colour">Tokens</a>
        </Button>
        <Button variant="ghost" asChild>
          <a href="#ds-logos">Logos</a>
        </Button>
      </div>

      <section aria-labelledby="brand-book" className="mt-14">
        <h2 id="brand-book" className="scroll-mt-24 text-2xl font-bold">
          Brand book
        </h2>
        <div className="mt-6 grid gap-4">
          {brandBook.map((section) => (
            <article key={section.id} id={section.id} className="scroll-mt-24 rounded-2xl border border-border bg-surface p-6 shadow-soft">
              <h3 className="text-lg font-bold">{section.title}</h3>
              {section.intro && <p className="mt-1 text-[15px] leading-7 text-muted-foreground">{section.intro}</p>}
              <ul className="mt-3 grid gap-2.5 text-[15px] leading-7">
                {section.rules.map((rule) => (
                  <li key={rule} className="flex gap-3">
                    <span className="mt-3 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span className="min-w-0">{md(rule)}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="ds-colour" className="mt-14">
        <h2 id="ds-colour" className="scroll-mt-24 text-2xl font-bold">
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

      <section aria-labelledby="ds-logos" className="mt-14">
        <h2 id="ds-logos" className="scroll-mt-24 text-2xl font-bold">
          Logos
        </h2>
        <p className="mt-2 text-muted-foreground">Copied from idlistack.com. Download the originals; never redraw them.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { title: "Wordmark", file: "/brand/idlistack-logo.png", label: "PNG · 882 × 186", wide: true },
            { title: "Heart mark", file: "/brand/idlistack-icon.svg", label: "SVG", wide: false },
          ].map((logo) => (
            <figure key={logo.file} className="overflow-hidden rounded-2xl border border-border">
              <div className="grid grid-cols-2">
                <div className="grid h-36 place-items-center bg-white p-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={logo.file} alt={`Idlistack ${logo.title.toLowerCase()} on light`} className={logo.wide ? "h-8 w-auto" : "h-16 w-auto"} />
                </div>
                <div className="grid h-36 place-items-center bg-ink-950 p-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.file}
                    alt={`Idlistack ${logo.title.toLowerCase()} on dark`}
                    className={`${logo.wide ? "h-8 w-auto [filter:invert(1)_hue-rotate(180deg)]" : "h-16 w-auto"}`}
                  />
                </div>
              </div>
              <figcaption className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 text-sm">
                <span>
                  <span className="font-medium">{logo.title}</span>{" "}
                  <span className="text-muted-foreground">{logo.label}</span>
                </span>
                <a href={logo.file} download className="inline-flex items-center gap-1.5 font-medium text-primary-strong hover:underline">
                  <Download className="size-4" aria-hidden /> Download
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
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
