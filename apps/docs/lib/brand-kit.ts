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

type LogoFormat = { label: string; file: string };
const heartFormats = (slug: string): LogoFormat[] => [
  { label: "SVG", file: `idlistack-heart-${slug}.svg` },
  { label: "PDF", file: `idlistack-heart-${slug}.pdf` },
  { label: "PNG 512", file: `idlistack-heart-${slug}-512.png` },
  { label: "PNG 1024", file: `idlistack-heart-${slug}-1024.png` },
  { label: "PNG 2048", file: `idlistack-heart-${slug}-2048.png` },
  { label: "WebP", file: `idlistack-heart-${slug}-1024.webp` },
  { label: "JPG", file: `idlistack-heart-${slug}-1024.jpg` },
];
const wordmarkFormats = (slug: string): LogoFormat[] => [
  { label: "PNG", file: `idlistack-wordmark-${slug}.png` },
  { label: "PNG 441", file: `idlistack-wordmark-${slug}-441.png` },
  { label: "WebP", file: `idlistack-wordmark-${slug}.webp` },
  { label: "JPG", file: `idlistack-wordmark-${slug}.jpg` },
  { label: "PDF", file: `idlistack-wordmark-${slug}.pdf` },
];

/** Each logo, its preview file and every downloadable format (files live in public/brand/files/). */
export const logoFiles = [
  { slug: "wordmark-black", file: "idlistack-logo.png", title: "Wordmark, black", note: "For white and light backgrounds", ground: "light", wide: true, formats: wordmarkFormats("black") },
  { slug: "wordmark-white", file: "idlistack-logo-white.png", title: "Wordmark, white", note: "For ink and dark backgrounds", ground: "dark", wide: true, formats: wordmarkFormats("white") },
  { slug: "heart-colour", file: "idlistack-icon.svg", title: "Heart mark", note: "Full colour. Favicons, avatars, app tiles", ground: "light", wide: false, formats: heartFormats("colour") },
  { slug: "heart-white", file: "idlistack-icon-white.svg", title: "Heart mark, white", note: "One colour, for dark and photo backgrounds", ground: "dark", wide: false, formats: heartFormats("white") },
  { slug: "heart-black", file: "idlistack-icon-black.svg", title: "Heart mark, black", note: "One colour, for print, stamps and light backgrounds", ground: "light", wide: false, formats: heartFormats("black") },
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
logos/wordmark-black/   Wordmark, black — for white and light backgrounds (PNG, WebP, JPG, PDF)
logos/wordmark-white/   Wordmark, white — for ink and dark backgrounds (PNG, WebP, JPG, PDF)
logos/heart-colour/     Heart mark, full colour (SVG, PDF, PNG 512/1024/2048, WebP, JPG)
logos/heart-white/      Heart mark, white — one colour, for dark backgrounds
logos/heart-black/      Heart mark, black — one colour, for print and light backgrounds
logos/favicon.ico       16, 32 and 48px favicon
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
    ...logoFiles.flatMap((l) => l.formats.map((f) => ({ name: `logos/${l.slug}/${f.file}`, data: readFileSync(path.join(publicDir, "files", f.file)) }))),
    { name: "logos/favicon.ico", data: readFileSync(path.join(process.cwd(), "app/favicon.ico")) },
    { name: "colours/colours.css", data: colorsCss },
    { name: "colours/colours.txt", data: brandColours.map((c) => `${c.name.padEnd(10)} ${c.hex.toUpperCase()}  rgb(${hexToRgb(c.hex)})  ${c.use}`).join("\n") + "\n" },
    { name: "design-tokens.json", data: JSON.stringify(tokens, null, 2) + "\n" },
  ];
}
