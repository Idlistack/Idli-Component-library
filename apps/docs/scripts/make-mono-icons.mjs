// Makes single-colour versions of the heart mark from public/brand/idlistack-icon.svg:
// idlistack-icon-white.svg and idlistack-icon-black.svg. Every pink fill becomes the
// one colour, so the overlapping shapes read as one solid heart. Run after the icon changes:
//   node scripts/make-mono-icons.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const dir = fileURLToPath(new URL("../public/brand/", import.meta.url));
const svg = readFileSync(`${dir}idlistack-icon.svg`, "utf8");
const variants = { white: "#ffffff", black: "#000000" };
for (const [name, colour] of Object.entries(variants)) {
  const mono = svg.replace(/fill:rgb\(\d+,\d+,\d+\)/g, `fill:${colour}`);
  if (mono === svg) throw new Error("No fills replaced: has the icon SVG changed?");
  writeFileSync(`${dir}idlistack-icon-${name}.svg`, mono);
  console.log(`Wrote idlistack-icon-${name}.svg`);
}
