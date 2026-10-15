/**
 * Renders the documentation as Markdown for AI agents and other machine readers.
 *
 * Everything here is derived from the same sources as the HTML docs — the
 * component registry, the example files, the principles and token data — so
 * the agent reference cannot drift from what people see.
 *
 * Consumers: the /llms.txt, /llms-full.txt and *.md route handlers, and
 * scripts/gen-agent-docs.mjs, which writes packages/ui/AGENTS.md.
 * Imports use explicit .ts extensions so Node can run this file directly.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { registry, type ComponentDoc } from "./registry.ts";
import { principles } from "./principles.ts";
import { brandBook, brandIntro } from "./brand.ts";
import { otherTokens, palettes, semanticTokens } from "./tokens.ts";
import { REPO_URL, SITE_URL } from "./site.ts";

const EXAMPLES_DIR = path.join(process.cwd(), "examples");

async function exampleSource(id: string) {
  const source = await readFile(path.join(EXAMPLES_DIR, `${id}.tsx`), "utf8");
  return source.replace(/^"use client";\n\n?/, "").trim();
}

/** A docs URL: absolute when NEXT_PUBLIC_SITE_URL is set, otherwise root-relative. */
const siteUrl = (p: string) => `${SITE_URL}${p}`;
const siteName = SITE_URL || "the Idli UI docs site";

const cell = (s: string) => s.replace(/\|/g, "\\|").replace(/\n/g, " ");
const code = (s: string) => `\`${cell(s)}\``;
const table = (header: string[], rows: string[][]) =>
  [`| ${header.join(" | ")} |`, `|${header.map(() => "---").join("|")}|`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");

/* ------------------------------------------------------------ Sections */

export function setupMarkdown(h = "##") {
  return `${h} Setup

Idli UI is \`@idlistack/ui\`: React 19 components for Tailwind CSS v4, built on Radix primitives. It works in any React 19 app with Tailwind v4; Next.js (App Router) is the reference setup.

\`\`\`bash
npm install @idlistack/ui
\`\`\`

Import the theme after Tailwind in the global stylesheet. It registers the tokens, dark mode and tells Tailwind to scan the components:

\`\`\`css
@import "tailwindcss";
@import "@idlistack/ui/theme.css";
\`\`\`

Fonts: headings use Manrope, body text uses Inter. Point \`--idli-font-heading\` and \`--idli-font-body\` at your loaded fonts, e.g. with \`next/font/google\`:

\`\`\`tsx
import { Inter, Manrope } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--idli-font-body" });
const manrope = Manrope({ subsets: ["latin"], variable: "--idli-font-heading" });
// <html className={\`\${inter.variable} \${manrope.variable}\`}>
\`\`\`

Dark mode: add the \`dark\` class (or \`data-theme="dark"\`) to \`<html>\` or any container. Every component and token switches; there are no separate dark components.

${h}# Import rules

- Components: \`import { Button, Card, ... } from "@idlistack/ui"\`. This entry is a client module (\`"use client"\`), so you can use it from Server Components and Client Components alike.
- Helpers: \`import { cn, buttonVariants, badgeVariants } from "@idlistack/ui/utils"\`. This entry has no client code and is the one to use inside Server Components — importing \`cn\` from the main entry in a Server Component throws at render.
- Styling: pass Tailwind classes via \`className\`; \`cn()\` merges them so later utilities override component defaults.
- Links: to make a Button or card link navigate with your router, use \`asChild\` (Button) or \`linkAs={Link}\` (AppCard, StackCard, Navbar) rather than wrapping in an anchor.
- Form wiring: put a control inside \`<Field>\`; Idli controls read the id and ARIA attributes from context. Do not rely on cloning children — children rendered by a Server Component may arrive as a deferred placeholder.
`;
}

export function rulesMarkdown(h = "##") {
  return `${h} Design rules

Apply these when composing screens with Idli UI.

${principles.map((p, i) => `${i + 1}. **${p.title}.** ${p.body}\n${p.practice.map((x) => `   - ${x}`).join("\n")}`).join("\n")}

Writing: sentence case everywhere (buttons, headings, labels). Buttons say what happens (“Deploy app”, not “Submit”). Errors say how to fix the problem. Prices in rupees.
`;
}

/** The brand book (writing, colour, type, space, icons, logo) as Markdown sections. */
export function brandBookMarkdown(h = "##") {
  return brandBook
    .map((b) => `${h} ${b.title}\n\n${b.intro ? `${b.intro}\n\n` : ""}${b.rules.map((r) => `- ${r}`).join("\n")}\n`)
    .join("\n");
}

export function tokensMarkdown(h = "##") {
  return `${h} Design tokens

Use tokens as Tailwind utilities; never hard-code hex values in product code. Each token flips automatically in dark mode.

${h}# Semantic colours

Usable as \`bg-{token}\`, \`text-{token}\`, \`border-{token}\`, \`ring-{token}\`, \`fill-{token}\`.

${table(["Token", "Use"], semanticTokens.map((t) => [code(t.token), cell(t.use)]))}

${h}# Raw palettes

Usable as e.g. \`bg-blush-600\`. Prefer semantic tokens; reach for these only for one-off illustration.

${Object.entries(palettes)
  .map(([name, p]) => `- **${name}** — ${p.note} Shades: ${Object.entries(p.shades).map(([s, hex]) => `${s} ${hex}`).join(", ")}`)
  .join("\n")}

${h}# Type, radius, elevation, motion

${table(["Utility", "Value", "Use"], otherTokens.fonts.map((t) => [code(t.utility), cell(t.value), cell(t.use)]))}

${table(["Utility", "Value", "Use"], otherTokens.radius.map((t) => [code(t.utility), t.value, cell(t.use)]))}

${table(["Utility", "Use"], [...otherTokens.shadows, ...otherTokens.motion].map((t) => [code(t.utility), cell(t.use)]))}

Spacing follows Tailwind's 4px scale; 4, 6 and 8 cover most component gaps. Containers: marketing pages \`max-w-7xl px-4 sm:px-6 lg:px-8\`; reading content \`max-w-3xl\`; forms in dialogs \`max-w-lg\`. Body text is 15–16px, never below 12px.
`;
}

export async function componentMarkdown(doc: ComponentDoc, h = "##") {
  const parts: string[] = [
    `${h} ${doc.name}`,
    "",
    `${doc.group === "Patterns" ? "Idlistack pattern. " : ""}${doc.description}`,
    "",
    "```tsx",
    `import { ${doc.imports.join(", ")} } from "@idlistack/ui";`,
    "```",
  ];
  if (doc.props) {
    parts.push(
      "",
      `${h}# Props`,
      "",
      table(["Prop", "Type", "Default", "Description"], doc.props.map((p) => [code(p.name), code(p.type), p.default ? code(p.default) : "—", cell(p.description)])),
    );
  }
  parts.push(
    "",
    `${h}# Usage`,
    "",
    ...doc.usage.do.map((x) => `- Do: ${x}`),
    ...doc.usage.dont.map((x) => `- Don't: ${x}`),
    "",
    `${h}# Accessibility`,
    "",
    ...doc.accessibility.map((x) => `- ${x}`),
  );
  for (const ex of doc.examples) {
    parts.push("", `${h}# Example: ${ex.title}`, "");
    if (ex.description) parts.push(ex.description, "");
    parts.push("```tsx", await exampleSource(ex.id), "```");
  }
  return parts.join("\n") + "\n";
}

/* ------------------------------------------------------------ Documents */

const intro = `> Idli UI is the design system for Idlistack (idlistack.com, by T4GC): a React + Tailwind CSS v4 component library with design tokens, light and dark themes, ${registry.filter((c) => c.group === "Components").length} accessible core components and ${registry.filter((c) => c.group === "Patterns").length} Idlistack patterns, for building calm, plain-spoken tools for the social sector.`;

/** Everything an agent needs to build with Idli UI, in one document. */
export async function fullReference() {
  const components = registry.filter((c) => c.group === "Components");
  const patterns = registry.filter((c) => c.group === "Patterns");
  const sections = [
    "# Idli UI — reference for AI agents",
    "",
    intro,
    "",
    `This file is generated from ${SITE_URL ? `the Idli UI docs (${SITE_URL})` : "the Idli UI docs"} and the component source (${REPO_URL}). Read Setup and Design rules once, then jump to the component you need. Every example is the complete, runnable source of a live demo.`,
    "",
    setupMarkdown(),
    rulesMarkdown(),
    tokensMarkdown(),
    "## Component index",
    "",
    ...registry.map((c) => `- ${c.name} — ${c.description}`),
    "",
    "## Core components",
    "",
    ...(await Promise.all(components.map((c) => componentMarkdown(c, "###")))),
    "## Idlistack patterns",
    "",
    ...(await Promise.all(patterns.map((c) => componentMarkdown(c, "###")))),
  ];
  return sections.join("\n");
}

/** The llms.txt index: a short summary plus links to every Markdown page. */
export function llmsIndex() {
  const link = (title: string, p: string, desc?: string) => `- [${title}](${siteUrl(p)})${desc ? `: ${desc}` : ""}`;
  return `# Idli UI

${intro}

Every docs page is available as Markdown by appending \`.md\` to its URL. The full reference in one file is ${siteUrl("/llms-full.txt")}. When the package is installed, the same reference is at node_modules/@idlistack/ui/AGENTS.md.

## Getting started

${link("Installation", "/docs/installation.md", "install, theme import, fonts, dark mode, import rules")}
${link("Design principles", "/docs/principles.md", "the six rules that decide between good options")}
${link("Design system", "/docs/design-system.md", "every token with light and dark values; machine-readable at /design-tokens.json")}
${link("Use with AI agents", "/docs/agents.md", "where to point an agent")}

## Foundations

${link("Colour", "/docs/foundations/colors.md", "semantic tokens and palettes")}
${link("Typography", "/docs/foundations/typography.md", "Manrope headings, Inter body, type scale")}
${link("Layout & elevation", "/docs/foundations/layout.md", "spacing, radius, shadows, motion")}

## Core components

${registry.filter((c) => c.group === "Components").map((c) => link(c.name, `/docs/components/${c.slug}.md`, c.description)).join("\n")}

## Idlistack patterns

${registry.filter((c) => c.group === "Patterns").map((c) => link(c.name, `/docs/components/${c.slug}.md`, c.description)).join("\n")}

## Optional

${link("Full reference", "/llms-full.txt", "everything above in one file, with every example's source")}
- [Source repository](${REPO_URL}): component source, examples and the contributor AGENTS.md
`;
}

export function agentsPageMarkdown() {
  return `# Use with AI agents

Idli UI ships its documentation in formats an AI coding agent can read in one go, so you can point an agent at it and get components used correctly.

- **Site:** \`/llms.txt\` (index) and \`/llms-full.txt\` (everything) on ${siteName}. Append \`.md\` to any docs URL for that page as Markdown.
- **Package:** after \`npm install @idlistack/ui\`, the full reference is at \`node_modules/@idlistack/ui/AGENTS.md\`.
- **Repository:** ${REPO_URL} has a root AGENTS.md for agents contributing to the library.

Example prompt: "Use Idli UI (\`@idlistack/ui\`). Read node_modules/@idlistack/ui/AGENTS.md first, then build the signup form with Field, Input and Button."
`;
}

/** Markdown for a docs page, keyed by its path under /docs (e.g. "components/button"). */
export async function markdownFor(key: string): Promise<string | null> {
  if (key.startsWith("components/")) {
    const doc = registry.find((c) => c.slug === key.slice("components/".length));
    return doc ? `${await componentMarkdown(doc, "#")}\nMore components: ${siteUrl("/llms.txt")}\n` : null;
  }
  switch (key) {
    case "index":
    case "installation":
      return `# Idli UI\n\n${intro}\n\n${setupMarkdown()}`;
    case "principles":
      return rulesMarkdown("#").replace("# Design rules", "# Design principles");
    case "agents":
      return agentsPageMarkdown();
    case "design-system":
      return `# Design system\n\n${brandIntro}\n\n${brandBookMarkdown()}\nAll tokens as JSON: ${siteUrl("/design-tokens.json")} (each colour has a light and dark value; aliases are written {token-name}). Logos: ${siteUrl("/brand/idlistack-logo.png")} (wordmark) and ${siteUrl("/brand/idlistack-icon.svg")} (heart mark).\n\n${tokensMarkdown()}`;
    case "foundations/colors":
    case "foundations/typography":
    case "foundations/layout":
      return tokensMarkdown("#");
    default:
      return null;
  }
}

export const markdownKeys = [
  "index",
  "installation",
  "principles",
  "agents",
  "design-system",
  "foundations/colors",
  "foundations/typography",
  "foundations/layout",
  ...registry.map((c) => `components/${c.slug}`),
];
