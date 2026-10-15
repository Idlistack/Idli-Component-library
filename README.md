# Idli UI

The design system and component library for [Idlistack](https://idlistack.com): open-source made effortless.

Idli UI gives Idlistack products a shared set of design tokens, accessible React components and ready-made patterns, so every screen feels calm, warm and easy to use for teams in the social sector.

- **Design tokens.** Colour, type, radius, elevation and motion as Tailwind CSS v4 theme variables, with light and dark themes.
- **15 core components.** Button, Input, Field, Select, Checkbox, Radio group, Switch, Badge, Card, Alert, Tabs, Dialog, Tooltip, Avatar and Spinner, built on [Radix](https://www.radix-ui.com) primitives for keyboard and screen reader support.
- **5 Idlistack patterns.** AppCard, StackCard, Stepper, Navbar and PricingCard.
- **Docs site.** Live examples, props, usage guidance and accessibility notes for every component, plus design principles and foundations.

## Repository layout

```
packages/ui     @idlistack/ui: the component library (React 19 + Tailwind v4)
  theme.css     design tokens; consumers import this after Tailwind
  src/          components, patterns and helpers
apps/docs       documentation site (Next.js 16)
  examples/     example components; each is both a live preview and the code shown on the page
  lib/registry  docs content for every component (props, usage, accessibility)
```

## Development

Requires Node 22.6 or later (`.nvmrc` pins 24, which Cloudflare also uses). Consumers of the published package need Node 20.9+.

```bash
npm install
npm run dev        # builds the library in watch mode and starts the docs at http://localhost:3005
npm run build      # production build of the library and the docs
npm run typecheck
npm test           # component tests (node:test + Testing Library, against the built package)
npm run check      # typecheck, tests and build: what CI runs
```

The docs run on port 3005. To check a page for browser console errors the way a visitor would see them (initial load, hot reload and client-side navigation), run:

```bash
node apps/docs/scripts/console-check.mjs http://localhost:3005/ apps/docs/lib/site.ts
```

## Deploying the docs (Cloudflare Workers)

The docs site is a Next.js static export (`output: "export"` → `apps/docs/out`), served by Cloudflare Workers static assets. There's no server code. `wrangler.jsonc` at the repo root points Workers at the export.

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Optional: set `NEXT_PUBLIC_SITE_URL` (for example `https://idli-ui.<your-subdomain>.workers.dev`) as a build variable to make links in `llms.txt` and the `.md` pages absolute. Without it they are root-relative, which work on any host. Pages people see always show the live domain from the browser.
- The `name` in `wrangler.jsonc` must match the Worker's name in the Cloudflare dashboard.

To preview exactly what Workers will serve: `npm run build && npx wrangler dev`.

## Using the library

```bash
npm install @idlistack/ui
```

```css
/* app/globals.css */
@import "tailwindcss";
@import "@idlistack/ui/theme.css";
```

```tsx
import { Button } from "@idlistack/ui";
import { cn } from "@idlistack/ui/utils"; // server-safe helpers: cn, buttonVariants, badgeVariants

export default function Page() {
  return <Button>Get started</Button>;
}
```

Headings use Manrope and body text uses Inter. Point `--idli-font-heading` and `--idli-font-body` at your loaded fonts (see the Installation page in the docs). For dark mode, add the `dark` class or `data-theme="dark"` to `<html>`.

## Design system

`/docs/design-system` on the docs site is the whole system on one sheet: the brand book (writing, colour, type, space, icons, logo), every token in both themes with measured contrast, palettes, type styles, radius, elevation, spacing, the Idlistack logos (downloadable) and the component index. `/design-tokens.json` is the same token data as JSON.

It is generated from `packages/ui/theme.css` (`apps/docs/lib/design-tokens.ts`) and `apps/docs/lib/brand.ts`, so it always matches the components. `npm run design-system:build -w docs -- <out-dir>` also exports it as standalone design-system files (tokens, brand book, component bundle and live previews).

## For AI agents

The docs are published in agent-readable form, generated from the same registry and examples as the site:

- `https://<docs-site>/llms.txt` (index) and `/llms-full.txt` (everything); append `.md` to any docs URL for that page as Markdown.
- `node_modules/@idlistack/ui/AGENTS.md` ships in the package with the full usage reference.
- The root `AGENTS.md` (and `CLAUDE.md`) is for agents contributing to this repo.

Regenerate the package reference with `npm run gen:agent-docs -w docs` (the docs build runs it).

## Adding a component

1. Create it in `packages/ui/src/components/` (or `patterns/`) using semantic tokens only (`bg-primary`, `text-muted-foreground`, …), and export it from `src/index.ts`.
2. Add one or more examples in `apps/docs/examples/<slug>/<name>.tsx`, then run `npm run gen:examples -w docs`.
3. Add an entry to `apps/docs/lib/registry.ts` with the description, props, usage do's and don'ts, and accessibility notes.

## Design principles

1. **Skip the tech.** Write for a programme manager, not an engineer.
2. **Calm, confident, one step at a time.** One primary action per view.
3. **Accessible by default.** WCAG 2.2 AA throughout. Solid pink fills use `blush-600` (4.6:1 with white text); the logo pink `blush-500` is for large type, icons and focus rings.
4. **Every rupee, every kilobyte.** Mobile-first and light enough for budget phones.
5. **Warm, not loud.** Mostly neutral, with pink kept for emphasis.
6. **Tokens, not values.** No hard-coded colours in product code.
