# Idli UI — guide for agents working in this repository

Idli UI is the design system for Idlistack (idlistack.com, by T4GC): `@idlistack/ui`, a React 19 + Tailwind CSS v4 component library, and its docs site. If you are *using* the library in another project, read `packages/ui/AGENTS.md` (the generated usage reference) instead of this file.

## Layout

- `packages/ui` — the `@idlistack/ui` package. `theme.css` holds the design tokens; `src/components` the core components; `src/patterns` the Idlistack-specific ones; `src/index.ts` (client entry) and `src/utils.ts` (server-safe helpers) are the two public entries. Built with tsup to `dist/`.
- `apps/docs` — the Next.js 16 docs site. `lib/registry.ts` is the source of truth for every component's docs (description, props, usage, accessibility). `examples/<slug>/<name>.tsx` files are both the live previews and the code shown. `lib/markdown.ts` renders the docs as Markdown for agents.
- Generated, do not edit by hand: `apps/docs/examples/index.ts` (`npm run gen:examples -w docs`), `packages/ui/AGENTS.md` (`npm run gen:agent-docs -w docs`, also run by the docs build), `apps/docs/AGENTS.md` (written by `next dev`).

## Commands

```bash
npm install
npm run dev          # library in watch mode + docs at http://localhost:3005
npm run build        # library, agent docs, then the docs site (30 static pages)
npm run typecheck
node apps/docs/scripts/console-check.mjs http://localhost:3005/<path> apps/docs/lib/site.ts   # browser console check
```

Node 20.9+ (22+ for the agent-docs script). Port 3005 is deliberate; 3000 is used by another project on the maintainer's machine.

## Conventions

- Components use semantic tokens only (`bg-primary`, `text-muted-foreground`, `border-border`, …), never raw hex or raw palette shades. Add a token to `theme.css` before adding a one-off colour. Tokens live in `@theme inline` so they flip for dark mode.
- Interactive behaviour comes from Radix (`radix-ui` package namespaces). Keep the WAI-ARIA pattern intact; add `focusRing` from `lib/cn` for keyboard focus.
- `cva` variant objects live in separate `*-variants.ts` files and are exported from `src/utils.ts` so Server Components can call them; everything React goes through `src/index.ts`, which is one `"use client"` bundle.
- Never use `React.cloneElement` or `React.Children` on `children` in a client component. Children rendered by a Server Component can arrive as a deferred placeholder; cloning it crashes with "Element type is invalid". Pass data through context instead (see `Field` and `useFieldControl`).
- Copy is sentence case and plain-spoken; buttons say what happens. Follow `apps/docs/lib/principles.ts`.
- Solid pink fills use `blush-600` (`--idli-primary`), not the logo pink `blush-500`, for WCAG AA contrast with white text. Keep it that way.

## Adding or changing a component

1. Implement it in `packages/ui/src/components` (or `patterns`) and export it from `src/index.ts`.
2. Add one or more examples in `apps/docs/examples/<slug>/`, then `npm run gen:examples -w docs`.
3. Add or update its entry in `apps/docs/lib/registry.ts`: description, imports, examples, props, usage do/don't, accessibility.
4. Run `npm run typecheck` and `npm run build`. Start the dev server and run the console check on the component's page and on `/` (the home page composes many components).
5. Commit the regenerated `packages/ui/AGENTS.md` with your change.

## Checks before you say you are done

`npm run typecheck`, `npm run build`, and a clean console-check run (initial load, hot reload and client navigation) on every page you touched. Report what you actually ran.
