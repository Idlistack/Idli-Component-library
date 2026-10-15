/**
 * The Idli UI design tokens as data, parsed from packages/ui/theme.css (the
 * one source of truth) so the design-system page, /tokens.json and the Claude
 * Design System artifact always match what the components use.
 *
 * Shape: the Design System artifact's tokens.json format — every family is a
 * list of {name, value, usage}; colours carry a value per theme; type is
 * {families, groups}. Names are the CSS custom properties minus `--`, so a
 * token named `idli-primary` is `var(--idli-primary)` and `color-blush-600` is
 * what Tailwind's `bg-blush-600` reads.
 *
 * Imports use explicit .ts extensions so Node can run this file directly.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { contrast } from "./contrast.ts";
import { otherTokens, palettes, semanticTokens } from "./tokens.ts";

export type ColorToken = { name: string; value: { light: string; dark?: string }; usage: string };
export type Token = { name: string; value: string; usage: string };
export type TypeStyle = {
  name: string;
  fontSize: string;
  lineHeight: string;
  fontWeight: number;
  letterSpacing?: string;
  sample: string;
  usage: string;
};

const THEME_CSS = path.join(process.cwd(), "../../packages/ui/theme.css");

/** `rgb(15 23 42 / 0.04)` → `rgba(15,23,42,0.04)`: the comma form every reader accepts. */
function normalizeColor(v: string) {
  return v.replace(/rgb\(\s*(\d+)\s+(\d+)\s+(\d+)\s*\/\s*([\d.]+)\s*\)/g, "rgba($1,$2,$3,$4)").trim();
}

/** `var(--color-ink-900)` → `{color-ink-900}` (an alias); other values normalised. */
function toTokenValue(v: string) {
  const alias = /^var\(--([A-Za-z0-9_.-]+)\)$/.exec(v.trim());
  return alias ? `{${alias[1]}}` : normalizeColor(v);
}

function declarations(block: string) {
  const out = new Map<string, string>();
  for (const m of block.matchAll(/--([A-Za-z0-9_-]+)\s*:\s*([^;]+);/g)) out.set(m[1], m[2].trim());
  return out;
}

function blockAfter(css: string, selectorPattern: RegExp) {
  const m = selectorPattern.exec(css);
  if (!m) throw new Error(`theme.css: block ${selectorPattern} not found`);
  const start = css.indexOf("{", m.index) + 1;
  let depth = 1;
  let i = start;
  while (depth && i < css.length) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") depth--;
    i++;
  }
  return css.slice(start, i - 1);
}

export function buildDesignTokens() {
  const css = readFileSync(THEME_CSS, "utf8");
  const theme = declarations(blockAfter(css, /@theme\s*\{/));
  const light = declarations(blockAfter(css, /^:root\s*\{/m));
  const dark = declarations(blockAfter(css, /^\.dark,\s*\[data-theme="dark"\]\s*\{/m));

  const palette = new Map<string, string>();
  for (const [k, v] of theme) if (k.startsWith("color-")) palette.set(k, v.toLowerCase());
  const resolve = (v: string): string => {
    const alias = /^\{(.+)\}$/.exec(v);
    return alias ? resolve(toTokenValue(palette.get(alias[1]) ?? light.get(alias[1].replace(/^idli-/, "")) ?? "#000000")) : v;
  };
  const hex = (v: string) => (/^#[0-9a-f]{6}$/i.test(v) ? v : null);

  // Which grounds each text colour must read on, for the contrast notes.
  const grounds: Record<string, string[]> = {
    foreground: ["background", "surface", "surface-muted"],
    "muted-foreground": ["background", "surface"],
    "subtle-foreground": ["background", "surface"],
    "primary-strong": ["background", "surface"],
    brand: ["background", "surface"],
    "primary-foreground": ["primary"],
    "secondary-foreground": ["secondary"],
    info: ["background", "surface"],
    success: ["background", "surface"],
    warning: ["background", "surface"],
    danger: ["background", "surface"],
  };
  const tailwindFor = (role: string) =>
    ["info", "success", "warning", "danger"].includes(role) ? `text-${role}\` (text, icons) or \`border-${role}/25` :
    role.endsWith("foreground") || role === "primary-strong" ? `text-${role}` : role === "ring" ? "ring-ring" : role === "border" || role === "border-strong" ? `border-${role}` : `bg-${role}`;

  const semantic: ColorToken[] = [];
  for (const [key, lightValue] of light) {
    if (!key.startsWith("idli-")) continue;
    const role = key.slice("idli-".length);
    const value: ColorToken["value"] = { light: toTokenValue(lightValue) };
    const darkValue = dark.get(key);
    if (darkValue) value.dark = toTokenValue(darkValue);
    const known = semanticTokens.find((t) => t.token === role)?.use ?? role.replace(/-/g, " ");
    let usage = `${known}. Tailwind: \`${tailwindFor(role)}\`.`;
    if (grounds[role]) {
      const ratios: string[] = [];
      let failing = false;
      for (const t of ["light", "dark"] as const) {
        const fg = hex(resolve(t === "light" ? value.light : value.dark ?? value.light));
        for (const g of grounds[role]) {
          const gl = light.get(`idli-${g}`);
          const gd = dark.get(`idli-${g}`) ?? gl;
          const ground = hex(resolve(toTokenValue((t === "light" ? gl : gd) ?? "")));
          if (!fg || !ground) continue;
          const r = contrast(fg, ground);
          if (r < 4.5) failing = true;
          // Two decimals near the AA line, so 4.49 doesn't read as a pass.
          ratios.push(`${r.toFixed(r >= 4.4 && r < 4.6 ? 2 : 1)}:1 on ${g} (${t})`);
        }
      }
      if (ratios.length) usage += ` Contrast: ${ratios.join(", ")}.`;
      if (failing && role === "brand") usage += " Below 4.5:1 for small text: use it for large type, icons and focus rings only.";
      else if (failing) usage += " Just under 4.5:1 on white: keep it to placeholders and decorative captions.";
    }
    semantic.push({ name: key, value, usage });
  }

  const raw: ColorToken[] = [];
  for (const [family, p] of Object.entries(palettes)) {
    for (const shade of Object.keys(p.shades)) {
      const name = `color-${family}-${shade}`;
      const v = palette.get(name);
      if (!v) continue;
      raw.push({ name, value: { light: v }, usage: `${p.note} Raw palette, same in both themes; prefer the semantic tokens. Tailwind: \`bg-${family}-${shade}\`.` });
    }
  }

  const shadow: Token[] = ["shadow-soft", "shadow-lifted"].map((name) => ({
    name,
    value: normalizeColor(theme.get(name) ?? "none"),
    usage: `${otherTokens.shadows.find((s) => s.utility === name)?.use ?? ""}. Tailwind: \`${name}\`. Pair with a \`border-border\` edge.`,
  }));

  const radius: Token[] = [
    { name: "radius-md", value: "0.375rem", usage: "Small buttons, inline code. Tailwind: `rounded-md`." },
    { name: "radius-lg", value: "0.5rem", usage: "Buttons, inputs, select triggers. Tailwind: `rounded-lg`." },
    { name: "radius-xl", value: "0.75rem", usage: "Alerts, menus, icon tiles. Tailwind: `rounded-xl`." },
    { name: "radius-2xl", value: "1rem", usage: "Cards, dialogs, previews. Tailwind: `rounded-2xl`." },
    { name: "radius-full", value: "9999px", usage: "Badges, avatars, switches, the step markers. Tailwind: `rounded-full`." },
  ];

  const spacing: Token[] = [
    { name: "spacing", value: "0.25rem", usage: "Tailwind's spacing base: every `p-*`, `m-*`, `gap-*` step is a multiple of 4px." },
    ...[1, 2, 3, 4, 6, 8, 12, 16, 24].map((s) => ({
      name: `space-${s}`,
      value: `${s * 4}px`,
      usage:
        s <= 2 ? `Tight gaps inside a control (\`gap-${s}\`).` : s <= 4 ? `Component gaps and small padding (\`gap-${s}\`, \`p-${s}\`).` : s <= 8 ? `Card padding and section gaps (\`p-${s}\`).` : `Space between page sections (\`py-${s}\`).`,
    })),
  ];

  const families = {
    sans: '"Inter", ui-sans-serif, system-ui, sans-serif',
    heading: '"Manrope", "Inter", ui-sans-serif, system-ui, sans-serif',
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  };
  const headingStyles: TypeStyle[] = [
    { name: "display", fontSize: "48px", lineHeight: "1.05", fontWeight: 800, letterSpacing: "-0.025em", sample: "Open-source made effortless.", usage: "Hero headlines only. Highlight one key word in `text-brand`." },
    { name: "heading-1", fontSize: "36px", lineHeight: "40px", fontWeight: 800, letterSpacing: "-0.02em", sample: "Just the right tools", usage: "Page titles." },
    { name: "heading-2", fontSize: "24px", lineHeight: "32px", fontWeight: 700, sample: "Every rupee matters", usage: "Section headings." },
    { name: "heading-3", fontSize: "18px", lineHeight: "28px", fontWeight: 700, sample: "Fundraising stack", usage: "Card titles, dialog titles." },
  ];
  const textStyles: TypeStyle[] = [
    { name: "body-large", fontSize: "18px", lineHeight: "29px", fontWeight: 400, sample: "Deploy powerful open-source tools without worrying about servers.", usage: "Lead paragraphs under a page title." },
    { name: "body", fontSize: "15px", lineHeight: "28px", fontWeight: 400, sample: "We handle setup, updates and hosting so your team can focus on impact.", usage: "Running text. Never smaller than 15px for reading." },
    { name: "small", fontSize: "14px", lineHeight: "20px", fontWeight: 500, sample: "Last backup 2 hours ago", usage: "UI labels, buttons, table cells." },
    { name: "caption", fontSize: "12px", lineHeight: "16px", fontWeight: 500, letterSpacing: "0.05em", sample: "COMMUNICATION", usage: "Eyebrows and section labels, uppercase. The smallest size in the system." },
  ];

  return {
    name: "Idli UI",
    version: 1,
    color: {
      themes: [
        { id: "light", name: "Light" },
        { id: "dark", name: "Dark" },
      ],
      tokens: [...semantic, ...raw],
    },
    type: {
      fonts: [] as { family: string; file: string; weight: string }[],
      families,
      groups: [
        { name: "Headings", family: "heading", styles: headingStyles },
        { name: "Text", family: "sans", styles: textStyles },
      ],
    },
    spacing: { tokens: spacing },
    radius: { tokens: radius },
    shadow: { tokens: shadow },
  };
}

export type DesignTokens = ReturnType<typeof buildDesignTokens>;
