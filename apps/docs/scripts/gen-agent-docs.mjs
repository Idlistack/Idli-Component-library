// Writes packages/ui/AGENTS.md — the usage reference agents find in node_modules.
// Runs before the docs build and before the package is packed:
//   node --experimental-strip-types scripts/gen-agent-docs.mjs
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const docsDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(docsDir); // lib/markdown.ts reads examples relative to cwd
const { fullReference } = await import("../lib/markdown.ts");

const target = resolve(docsDir, "../../packages/ui/AGENTS.md");
const content = (await fullReference()).replace(
  "This file is generated from",
  "Generated file — do not edit; run `npm run gen:agent-docs -w docs`. Built from",
);
writeFileSync(target, content);
console.log(`Wrote ${target} (${content.length.toLocaleString()} chars)`);
