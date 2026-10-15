// Builds the files of the Idli UI Design System artifact (claude.ai) from this
// repository: tokens from packages/ui/theme.css, the brand book and component
// guidelines from the docs registry, the real components as a browser bundle,
// their compiled Tailwind CSS, React 19 for the live previews, and the cover.
//
//   node --experimental-strip-types apps/docs/scripts/design-system/build.mjs <out-dir>
//
// Writes <out-dir>/project/... (everything except design-system.json, which
// is written at publish time with the uploaded asset records). Publish with
// the Artifact tool as described in the design system's SKILL.md.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import { previewHtml, previews } from "./previews.mjs";

const docsDir = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const repoDir = resolve(docsDir, "../..");
const uiDir = join(repoDir, "packages/ui");
process.chdir(docsDir); // the lib modules resolve paths from apps/docs
const { buildDesignTokens } = await import("../../lib/design-tokens.ts");
const { registry } = await import("../../lib/registry.ts");
const { principles } = await import("../../lib/principles.ts");
const { brandBook, brandIntro } = await import("../../lib/brand.ts");

const outDir = resolve(process.argv[2] ?? "design-system-out");
const project = join(outDir, "project");
const write = (path, content) => {
  const file = join(project, path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  return path;
};
const written = [];
const NAMESPACE = "IdliUI";

/* ------------------------------------------------------------------ tokens */
const tokens = buildDesignTokens();
tokens.meta = {
  source: "github",
  repo: "Idlistack/Idli-Component-library",
  package: "packages/ui",
  paths: { tokens: ["packages/ui/theme.css"], docs: ["apps/docs/lib/registry.ts", "apps/docs/lib/principles.ts"] },
  synced: new Date().toISOString().slice(0, 10),
};
written.push(write("tokens.json", JSON.stringify(tokens, null, 2) + "\n"));

/* ------------------------------------------------------- component mapping */
// Registry slug → the component the design system shows for it.
const componentFor = {
  button: "Button", input: "Input", field: "Field", select: "Select", checkbox: "Checkbox",
  "radio-group": "RadioGroup", switch: "Switch", badge: "Badge", card: "Card", alert: "Alert",
  tabs: "Tabs", dialog: "Dialog", tooltip: "Tooltip", avatar: "Avatar", spinner: "Spinner",
  "app-card": "AppCard", "stack-card": "StackCard", stepper: "Stepper", navbar: "Navbar", "pricing-card": "PricingCard",
};
const components = registry.map((doc) => ({ doc, name: componentFor[doc.slug] }));
for (const { doc, name } of components) {
  if (!name || !previews[name]) throw new Error(`No preview for registry entry ${doc.slug}`);
}

/* ----------------------------------------------------- component READMEs */
const md = (s) => s; // registry text is already Markdown with `code` spans
for (const { doc, name } of components) {
  const firstExample = doc.examples[0];
  const exampleSource = readFileSync(join(docsDir, "examples", `${firstExample.id}.tsx`), "utf8").replace(/^"use client";\n\n?/, "").trim();
  const props = doc.props?.length
    ? ["## What you provide", "", "| Prop | Type | Default | Description |", "|---|---|---|---|",
       ...doc.props.map((p) => `| \`${p.name}\` | \`${p.type.replace(/\|/g, "\\|")}\` | ${p.default ? `\`${p.default}\`` : "—"} | ${md(p.description).replace(/\|/g, "\\|")} |`), ""]
    : [];
  written.push(write(`components/${name}/README.md`, [
    `# ${name}`,
    "",
    `${doc.description}${doc.group === "Patterns" ? " An Idlistack pattern built from the core components." : ""}`,
    "",
    "```tsx",
    `import { ${doc.imports.join(", ")} } from "@idlistack/ui";`,
    "```",
    "",
    ...props,
    "## When to use it",
    "",
    ...doc.usage.do.map((x) => `- Do: ${md(x)}`),
    ...doc.usage.dont.map((x) => `- Don't: ${md(x)}`),
    "",
    "## Accessibility",
    "",
    ...doc.accessibility.map((x) => `- ${md(x)}`),
    "",
    `## Example: ${firstExample.title}`,
    "",
    "```tsx",
    exampleSource,
    "```",
    "",
  ].join("\n")));
  written.push(write(`components/${name}/preview.html`, previewHtml(name, previews[name])));
}

/* ------------------------------------------------- React 19 for previews */
// React 19 ships no UMD build, so build the two globals the previews load.
const prod = { "process.env.NODE_ENV": '"production"' };
async function buildLib(contents, globalName, file, external = []) {
  const result = await esbuild.build({
    stdin: { contents, resolveDir: uiDir, loader: "js" },
    bundle: true, format: "iife", globalName, minify: true, define: prod, write: false, external,
    plugins: external.length ? [globalsPlugin({ react: "React" })] : [],
  });
  return write(file, result.outputFiles[0].text);
}
function globalsPlugin(map) {
  return {
    name: "globals",
    setup(b) {
      const filter = new RegExp(`^(${Object.keys(map).map((k) => k.replace(/[/.]/g, "\\$&")).join("|")})$`);
      b.onResolve({ filter }, (a) => ({ path: a.path, namespace: "global" }));
      b.onLoad({ filter: /.*/, namespace: "global" }, (a) => ({ contents: `module.exports = window.${map[a.path]};`, loader: "js" }));
    },
  };
}
const reactVersion = JSON.parse(readFileSync(join(repoDir, "node_modules/react/package.json"), "utf8")).version;
written.push(await buildLib('module.exports = require("react");', "React", "components/lib/react.production.min.js"));
written.push(await buildLib('module.exports = Object.assign({}, require("react-dom"), require("react-dom/client"));', "ReactDOM", "components/lib/react-dom.production.min.js", ["react"]));

/* -------------------------------------------------------------- bundle.js */
const shims = {
  react: "module.exports = window.React;",
  "react-dom": "module.exports = window.ReactDOM;",
  // Radix and lucide import the automatic JSX runtime; map it onto createElement.
  "react/jsx-runtime": `var R = window.React;
    function jsx(type, props, key) { var p = Object.assign({}, props); if (key !== undefined) p.key = key; return R.createElement(type, p); }
    module.exports = { jsx: jsx, jsxs: jsx, jsxDEV: jsx, Fragment: R.Fragment };`,
};
const bundle = await esbuild.build({
  entryPoints: [join(uiDir, "src/index.ts")],
  bundle: true, format: "iife", globalName: `window.${NAMESPACE}`, minify: true, define: prod, write: false,
  jsx: "transform", jsxFactory: "React.createElement", jsxFragment: "React.Fragment",
  plugins: [{
    name: "react-globals",
    setup(b) {
      b.onResolve({ filter: /^react(-dom)?(\/jsx-runtime|\/client)?$/ }, (a) => ({ path: a.path, namespace: "shim" }));
      b.onLoad({ filter: /.*/, namespace: "shim" }, (a) => ({ contents: shims[a.path] ?? shims[a.path.replace("/client", "")], loader: "js" }));
    },
  }],
});
let bundleJs = bundle.outputFiles[0].text;
if (/<\/script|<!--/i.test(bundleJs)) bundleJs = bundleJs.replace(/<\/script/gi, "<\\/script").replace(/<!--/g, "\\x3C!--");
const header = { format: 4, namespace: NAMESPACE, components: components.map((c) => ({ name: c.name })) };
written.push(write("components/bundle.js", `/* @ds-bundle: ${JSON.stringify(header)} */\n${bundleJs}`));
written.push(write("components/index.d.ts", readFileSync(join(uiDir, "dist/index.d.ts"), "utf8")));

/* ------------------------------------------------------------- bundle.css */
// Compile Tailwind over the component source and the previews, then drop every
// custom property tokens.css declares, so a token edited on the page wins.
const input = `@import "tailwindcss";
@import "${join(uiDir, "theme.css")}";
@source "${join(uiDir, "src")}";
@source "${join(project, "components")}";
`;
const compiled = await postcss([tailwind({ base: uiDir })]).process(input, { from: join(uiDir, "design-system.css") });
const tokenNames = new Set([
  ...tokens.color.tokens.map((t) => t.name),
  ...tokens.spacing.tokens.map((t) => t.name),
  ...tokens.radius.tokens.map((t) => t.name),
  ...tokens.shadow.tokens.map((t) => t.name),
  ...Object.keys(tokens.type.families).map((k) => `font-${k}`),
]);
const root = postcss.parse(compiled.css);
let removed = 0;
root.walkDecls((d) => {
  if (d.prop.startsWith("--") && tokenNames.has(d.prop.slice(2))) { d.remove(); removed++; }
});
root.walkRules((r) => { if (r.nodes && r.nodes.length === 0) r.remove(); });
const fonts = "@import url(\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap\");\n";
let css = root.toString();
if (/<\/style/i.test(css)) throw new Error("bundle.css contains </style");
written.push(write("components/bundle.css", fonts + css));

/* --------------------------------------------------------------- README.md */
const tok = (n) => `\`${n}\``;
// The brand book text lives in lib/brand.ts, shared with /docs/design-system.
const section = (b) => `## ${b.title}\n\n${b.intro ? `${b.intro}\n\n` : ""}${b.rules.map((r) => `- ${r}`).join("\n")}\n`;
written.push(write("README.md", [
  `${brandIntro} Build with the React package \`@idlistack/ui\` (Tailwind CSS v4); this system mirrors it exactly. Tailwind utilities below map to tokens: \`bg-primary\` is \`idli-primary\`, \`rounded-lg\` is \`radius-lg\`.`,
  "",
  section(brandBook[0]),
  "## Principles\n",
  principles.map((p, i) => `${i + 1}. **${p.title}.** ${p.body}`).join("\n") + "\n",
  ...brandBook.slice(1).map(section),
  `## Components\n\nEvery component is in the bundle as \`window.${NAMESPACE}.<Name>\` and in the React package as \`import { <Name> } from "@idlistack/ui"\`. Put each form control inside \`Field\`, which links its label, hint and error. Idlistack patterns (AppCard, StackCard, Stepper, Navbar, PricingCard) are built from the core components; reach for them before composing your own.\n`,
].join("\n")));

/* ------------------------------------------------------------ asset READMEs */
written.push(write("assets/Logos/README.md", `The Idlistack marks, copied from idlistack.com.

- \`idlistack-logo.png\` — the full wordmark "IDLISTACK by T4GC" in black with the pink heart-shaped "a" (${tok("color-blush-500")} family). Use on light grounds at 22px tall or more; on dark grounds apply \`filter: invert(1) hue-rotate(180deg)\` so the ink turns white and the pinks stay pink.
- \`idlistack-icon.svg\` — the standalone heart mark in two pinks, for favicons, avatars and app tiles. Works on light and dark grounds.

Never redraw, recolour or stretch either mark.
`));

/* ------------------------------------------------------------------- cover */
written.push(write("components/Cover/preview.html", `<!-- @dsCard height=288 -->
<!doctype html>
<html>
<head><meta charset="utf-8"><title>Idli UI — cover</title>
<style>
  html, body { margin: 0; height: 100%; background: var(--idli-background); }
  .ground { position: relative; width: 960px; height: 288px; overflow: hidden; }
  .name { position: absolute; left: 48px; bottom: 44px; max-width: 440px; margin: 0; font-family: var(--font-heading); font-weight: 800;
          font-size: 96px; line-height: .92; letter-spacing: -0.03em; color: var(--idli-foreground); }
  .tag { position: absolute; left: 50px; bottom: 20px; max-width: 440px; margin: 0; font-family: var(--font-sans); font-size: 14px; color: var(--idli-muted-foreground); }
  svg { position: absolute; left: 480px; top: 0; }
  .b-primary { fill: var(--color-blush-600); } .b-brand { fill: var(--color-blush-500); } .b-ink { fill: var(--color-ink-900); }
  .b-tint { fill: var(--color-sand-200); } .b-soft { fill: var(--color-blush-200); } .b-ocean { fill: var(--color-ocean-500); }
  [data-theme="dark"] .b-ink { fill: var(--color-sand-100); }
  [data-theme="dark"] .b-tint { fill: var(--color-ink-700); }
</style></head>
<body>
<div class="ground">
  <!--
    blocks: color-blush-600 slab 288x192 (radius-2xl corners), color-ink-900 block 192x96, color-sand-200 tint 96x192, color-blush-500 disc 96, color-ocean-500 small disc 32
    arrangement: one tall pink slab bleeding off the top with ink and sand satellites, stepped on the 32px (space-8) grid
    pattern: discs from radius-full — an idli is a round steamed cake, and the brand is soft, friendly and rounded (the wordmark's rounded letters)
    steps and radii: space-8 (32px) pitch, space-6 gaps, radius-2xl (16px) block corners, radius-full discs
  -->
  <svg width="480" height="288" viewBox="0 0 480 288" aria-hidden="true">
    <rect class="b-primary" x="160" y="-16" width="192" height="224" rx="16"/>
    <rect class="b-ink" x="32" y="208" width="224" height="96" rx="16"/>
    <rect class="b-tint" x="368" y="64" width="128" height="240" rx="16"/>
    <circle class="b-brand" cx="96" cy="96" r="48"/>
    <circle class="b-soft" cx="256" cy="104" r="32"/>
    <circle class="b-soft" cx="256" cy="104" r="16" style="fill: var(--color-blush-600)"/>
    <circle class="b-tint" cx="96" cy="176" r="16"/>
    <circle class="b-ocean" cx="432" cy="32" r="16"/>
    <circle class="b-brand" cx="304" cy="256" r="16"/>
    <circle class="b-soft" cx="432" cy="208" r="24"/>
  </svg>
  <h1 class="name">Idli UI</h1>
  <p class="tag">Open-source made effortless.</p>
</div>
</body>
</html>
`));

console.log(JSON.stringify({ outDir, files: written.length, removedTokenDeclarations: removed, bundleKB: Math.round(bundleJs.length / 1024), cssKB: Math.round(css.length / 1024), reactVersion }, null, 2));
