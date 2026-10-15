// After `next build` (static export), move the Markdown pages from out/md/<key>
// to the URLs agents use: out/docs/<key>.md, and out/docs.md for the index.
// Static exports can't use the rewrites the dev server uses for this.
import { cpSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const out = fileURLToPath(new URL("../out/", import.meta.url));
const mdRoot = join(out, "md");

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

let count = 0;
for (const file of walk(mdRoot)) {
  const key = relative(mdRoot, file).replace(/\.(txt|md)$/, "");
  const target = key === "index" ? join(out, "docs.md") : join(out, "docs", `${key}.md`);
  mkdirSync(dirname(target), { recursive: true });
  cpSync(file, target);
  count++;
}
rmSync(mdRoot, { recursive: true });
console.log(`Copied ${count} Markdown pages into out/docs`);
