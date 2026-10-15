# @idlistack/ui

Idli UI is the design system for [Idlistack](https://idlistack.com): design tokens, accessible React components and ready-made Idlistack patterns, built with React 19, Tailwind CSS v4 and [Radix](https://www.radix-ui.com).

- **Design tokens.** Colour, type, radius, elevation and motion as Tailwind CSS v4 theme variables, with light and dark themes.
- **15 core components.** Button, Input, Field, Select, Checkbox, Radio group, Switch, Badge, Card, Alert, Tabs, Dialog, Tooltip, Avatar and Spinner.
- **5 Idlistack patterns.** AppCard, StackCard, Stepper, Navbar and PricingCard.
- **Accessible by default.** WCAG 2.2 AA colour contrast and full keyboard and screen reader support.

## Install

```bash
npm install @idlistack/ui
```

The package needs `react` and `react-dom` 19 or later, and `tailwindcss` 4 or later.

## Set up

Import the theme after Tailwind in your global stylesheet. It also tells Tailwind to scan the components for their classes.

```css
/* app/globals.css */
@import "tailwindcss";
@import "@idlistack/ui/theme.css";
```

Then use the components:

```tsx
import { Button } from "@idlistack/ui";

export default function Page() {
  return <Button>Get started</Button>;
}
```

`@idlistack/ui` is a client bundle. For Server Components, import the server-safe helpers from `@idlistack/ui/utils`:

```tsx
import { cn, buttonVariants, badgeVariants } from "@idlistack/ui/utils";
```

### Fonts and dark mode

Headings use Manrope and body text uses Inter. Point `--idli-font-heading` and `--idli-font-body` at the fonts you load. To switch to the dark theme, add the `dark` class or `data-theme="dark"` to `<html>`.

## Docs

- **Components, props and usage guidance:** see the docs site in the [repository](https://github.com/Idlistack/Idli-Component-library).
- **For AI coding agents:** `node_modules/@idlistack/ui/AGENTS.md` is a full usage reference, with the complete source of every example.

## License

MIT © Tech4Good Community
