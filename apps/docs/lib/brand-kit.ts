import { readFileSync } from "node:fs";
import path from "node:path";
import { brandBook, brandIntro } from "./brand";
import { buildDesignTokens } from "./design-tokens";
import { palettes } from "./tokens";

/** Brand colours people pick by name: the identity hues first, then neutrals and the info blue. */
export const brandColours = [
  { name: "Idli pink", token: "blush-500", hex: palettes.blush.shades[500], use: "The logo pink. Large type, icons, highlights, focus rings." },
  { name: "Deep pink", token: "blush-600", hex: palettes.blush.shades[600], use: "Buttons and fills behind white text (4.6:1)." },
  { name: "Berry", token: "blush-700", hex: palettes.blush.shades[700], use: "Pink text and links on white." },
  { name: "Blush", token: "blush-100", hex: palettes.blush.shades[100], use: "Soft pink tints and highlights." },
  { name: "Ink", token: "ink-900", hex: palettes.ink.shades[900], use: "Headings, body text, dark backgrounds." },
  { name: "Slate", token: "ink-500", hex: palettes.ink.shades[500], use: "Secondary text." },
  { name: "Sand", token: "sand-100", hex: palettes.sand.shades[100], use: "Warm section backgrounds." },
  { name: "Sand edge", token: "sand-200", hex: palettes.sand.shades[200], use: "Borders and dividers." },
  { name: "Ocean", token: "ocean-500", hex: palettes.ocean.shades[500], use: "Informational accents, used sparingly." },
] as const;

export const brandFonts = [
  { family: "Manrope", role: "Headings", weights: "600, 700, 800", url: "https://fonts.google.com/specimen/Manrope" },
  { family: "Inter", role: "Body and interface", weights: "400, 500, 600", url: "https://fonts.google.com/specimen/Inter" },
];

export const taglines = ["Open-source made effortless.", "Every rupee matters.", "Skip the tech.", "Just the right tools, ready to work."];

export const logoFiles = [
  { file: "idlistack-logo.png", title: "Wordmark, black", note: "For white and light backgrounds", ground: "light", wide: true },
  { file: "idlistack-logo-white.png", title: "Wordmark, white", note: "For ink and dark backgrounds", ground: "dark", wide: true },
  { file: "idlistack-icon.svg", title: "Heart mark", note: "Favicons, avatars, app tiles; any background", ground: "light", wide: false },
] as const;

const hexToRgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(", ");
export const rgb = hexToRgb;

const publicDir = path.join(process.cwd(), "public/brand");

/** Every file in idlistack-brand-kit.zip. */
export function brandKitFiles() {
  const tokens = buildDesignTokens();
  const colorsCss = `/* Idlistack brand colours — from the Idli UI design system */\n:root {\n${brandColours.map((c) => `  --${c.token}: ${c.hex}; /* ${c.name} */`).join("\n")}\n}\n`;
  const readme = `IDLISTACK BRAND KIT
===================

${brandIntro}

Contents
--------
logos/idlistack-logo.png        Wordmark, black — for white and light backgrounds
logos/idlistack-logo-white.png  Wordmark, white — for ink and dark backgrounds
logos/idlistack-icon.svg        Heart mark — favicons, avatars, app tiles
colours/colours.css             Brand colours as CSS custom properties
colours/colours.txt             Brand colours with HEX and RGB
design-tokens.json              Every Idli UI design token, light and dark

Fonts (free, Google Fonts)
--------------------------
${brandFonts.map((f) => `${f.family.padEnd(10)} ${f.role} · weights ${f.weights} · ${f.url}`).join("\n")}

${brandBook
  .filter((b) => ["writing", "logo"].includes(b.id))
  .map((b) => `${b.title}\n${"-".repeat(b.title.length)}\n${b.rules.map((r) => `- ${r.replace(/`/g, "")}`).join("\n")}`)
  .join("\n\n")}

Taglines
--------
${taglines.join("\n")}
`;
  return [
    { name: "README.txt", data: readme },
    ...logoFiles.map((l) => ({ name: `logos/${l.file}`, data: readFileSync(path.join(publicDir, l.file)) })),
    { name: "colours/colours.css", data: colorsCss },
    { name: "colours/colours.txt", data: brandColours.map((c) => `${c.name.padEnd(10)} ${c.hex.toUpperCase()}  rgb(${hexToRgb(c.hex)})  ${c.use}`).join("\n") + "\n" },
    { name: "design-tokens.json", data: JSON.stringify(tokens, null, 2) + "\n" },
  ];
}
