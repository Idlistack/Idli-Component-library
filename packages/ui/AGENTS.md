# Idli UI — reference for AI agents

> Idli UI is the design system for Idlistack (idlistack.com, by T4GC): a React + Tailwind CSS v4 component library with design tokens, light and dark themes, 15 accessible core components and 5 Idlistack patterns, for building calm, plain-spoken tools for the social sector.

Generated file — do not edit; run `npm run gen:agent-docs -w docs`. Built from the Idli UI docs (http://localhost:3005) and the component source (https://github.com/Idlistack/Idli-Component-library). Read Setup and Design rules once, then jump to the component you need. Every example is the complete, runnable source of a live demo.

## Setup

Idli UI is `@idlistack/ui`: React 19 components for Tailwind CSS v4, built on Radix primitives. It works in any React 19 app with Tailwind v4; Next.js (App Router) is the reference setup.

```bash
npm install @idlistack/ui
```

Import the theme after Tailwind in the global stylesheet. It registers the tokens, dark mode and tells Tailwind to scan the components:

```css
@import "tailwindcss";
@import "@idlistack/ui/theme.css";
```

Fonts: headings use Manrope, body text uses Inter. Point `--idli-font-heading` and `--idli-font-body` at your loaded fonts, e.g. with `next/font/google`:

```tsx
import { Inter, Manrope } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--idli-font-body" });
const manrope = Manrope({ subsets: ["latin"], variable: "--idli-font-heading" });
// <html className={`${inter.variable} ${manrope.variable}`}>
```

Dark mode: add the `dark` class (or `data-theme="dark"`) to `<html>` or any container. Every component and token switches; there are no separate dark components.

### Import rules

- Components: `import { Button, Card, ... } from "@idlistack/ui"`. This entry is a client module (`"use client"`), so you can use it from Server Components and Client Components alike.
- Helpers: `import { cn, buttonVariants, badgeVariants } from "@idlistack/ui/utils"`. This entry has no client code and is the one to use inside Server Components — importing `cn` from the main entry in a Server Component throws at render.
- Styling: pass Tailwind classes via `className`; `cn()` merges them so later utilities override component defaults.
- Links: to make a Button or card link navigate with your router, use `asChild` (Button) or `linkAs={Link}` (AppCard, StackCard, Navbar) rather than wrapping in an anchor.
- Form wiring: put a control inside `<Field>`; Idli controls read the id and ARIA attributes from context. Do not rely on cloning children — children rendered by a Server Component may arrive as a deferred placeholder.

## Design rules

Apply these when composing screens with Idli UI.

1. **Skip the tech.** Write for a programme manager, not an engineer. Say “your website is live”, not “deployment succeeded”. If a screen needs a glossary, we haven't finished designing it.
   - Use verbs people already use: publish, send, invite.
   - Explain consequences before asking for a decision.
   - Hide infrastructure details behind “Advanced”.
2. **Calm, confident, one step at a time.** Teams come to us to stop worrying about servers. Every screen has one clear primary action, generous space and a quiet palette, so the next step is always obvious.
   - One primary button per view.
   - Break long flows into a Stepper.
   - Prefer soft surfaces and borders over heavy shadows.
3. **Accessible by default.** We meet WCAG 2.2 AA in every component. Contrast, keyboard access, focus visibility and reduced motion are built in, not left to each product team.
   - Solid pink fills use blush-600 (4.6:1 with white); the brighter logo pink is for large type, icons and focus rings.
   - Never communicate status with colour alone — always add a word or icon.
   - Every interactive element is reachable and operable with a keyboard.
4. **Every rupee, every kilobyte.** Our users work on budget Android phones, shared laptops and patchy connections. Interfaces should be light, fast and usable on a 360px screen.
   - Design mobile-first; test at 360px.
   - No decorative images or video where an icon will do.
   - Tree-shakable components; no runtime CSS-in-JS.
5. **Warm, not loud.** Pink is our warmth and our signature, so we use it with intent: for the main action, the active state, a highlight. Roughly 60% neutral surface, 30% ink, 10% brand.
   - Reach for soft and brand badges before solid pink blocks.
   - Use the warm sand neutrals, not cold greys, for surfaces.
6. **Tokens, not values.** Components only use semantic tokens like bg-primary and text-muted-foreground. That is what makes dark mode free and lets us re-tune the brand in one place.
   - Never hard-code hex values in product code.
   - Add a token before adding a one-off colour.

Writing: sentence case everywhere (buttons, headings, labels). Buttons say what happens (“Deploy app”, not “Submit”). Errors say how to fix the problem. Prices in rupees.

## Design tokens

Use tokens as Tailwind utilities; never hard-code hex values in product code. Each token flips automatically in dark mode.

### Semantic colours

Usable as `bg-{token}`, `text-{token}`, `border-{token}`, `ring-{token}`, `fill-{token}`.

| Token | Use |
|---|---|
| `background` | Page background |
| `surface` | Cards, popovers, inputs |
| `surface-muted` | Sections, hovers, tracks |
| `foreground` | Primary text |
| `muted-foreground` | Secondary text |
| `subtle-foreground` | Placeholders, captions |
| `border` | Dividers and card edges |
| `border-strong` | Input borders |
| `brand` | Logo pink: icons, rings, large type (fails AA for small white text) |
| `primary` | Primary button fill (AA with white text) |
| `primary-hover` | Primary button hover |
| `primary-foreground` | Text on primary |
| `primary-soft` | Tinted pink backgrounds |
| `primary-strong` | Pink text and links |
| `secondary` | Secondary (navy) button fill |
| `secondary-foreground` | Text on secondary |
| `info` | Informational status (also info-soft) |
| `success` | Positive status (also success-soft) |
| `warning` | Needs attention (also warning-soft) |
| `danger` | Errors, destructive actions (also danger-soft) |
| `ring` | Focus ring colour |

### Raw palettes

Usable as e.g. `bg-blush-600`. Prefer semantic tokens; reach for these only for one-off illustration.

- **blush** — Idlistack pink. 500 is the logo pink; 600 is the accessible fill for buttons. Shades: 50 #fdf2f7, 100 #fce4ef, 200 #f9c9de, 300 #f5a1c5, 400 #f06fa8, 500 #ed4690, 600 #d63079, 700 #b32363, 800 #8e1d50, 900 #6b1a3e, 950 #420b24
- **ink** — Navy for headings, body text and secondary actions. Shades: 50 #f8fafc, 100 #f1f5f9, 200 #e2e8f0, 300 #cad5e2, 400 #90a1b9, 500 #64748b, 600 #45556c, 700 #314158, 800 #1d293d, 900 #0f172a, 950 #0a0f1c
- **sand** — Warm, rose-tinted neutrals for surfaces and borders. Shades: 50 #faf7f8, 100 #f5f0f1, 200 #e8e0e2, 300 #d6cbce, 400 #a8999d, 500 #867277, 600 #6b5a5f, 700 #52444a, 800 #3a3035, 900 #241d21
- **ocean** — Informational blue, used sparingly. Shades: 50 #eff6ff, 100 #dbeafe, 400 #4d9bff, 500 #0070f3, 600 #005cc8, 700 #0049a0

### Type, radius, elevation, motion

| Utility | Value | Use |
|---|---|---|
| `font-heading` | Manrope (via --idli-font-heading) | Headings; applied to h1–h6 by default |
| `font-sans` | Inter (via --idli-font-body) | Body and UI text; applied to body by default |
| `font-mono` | ui-monospace stack | Code |

| Utility | Value | Use |
|---|---|---|
| `rounded-md` | 6px | Small buttons, inline code |
| `rounded-lg` | 8px | Buttons, inputs |
| `rounded-xl` | 12px | Alerts, menus, tiles |
| `rounded-2xl` | 16px | Cards, dialogs |
| `rounded-full` | 9999px | Badges, avatars, switches |

| Utility | Use |
|---|---|
| `shadow-soft` | Cards at rest |
| `shadow-lifted` | Hover, popovers, dialogs |
| `animate-fade-in / animate-fade-out` | Overlays |
| `animate-pop-in / animate-pop-out` | Popovers, dialogs, tooltips (150–200ms; near-instant under reduced motion) |

Spacing follows Tailwind's 4px scale; 4, 6 and 8 cover most component gaps. Containers: marketing pages `max-w-7xl px-4 sm:px-6 lg:px-8`; reading content `max-w-3xl`; forms in dialogs `max-w-lg`. Body text is 15–16px, never below 12px.

## Component index

- Button — Triggers an action. Primary buttons carry the one thing we most want someone to do on a screen.
- Input & Textarea — Single and multi-line text entry. Pair with a Label, or use Field for label, hint and error wiring.
- Field — Lays out a label, a control and its helper or error text, and connects them for assistive technology.
- Select — Choose one option from a list of five or more. For two to four options, prefer a RadioGroup.
- Checkbox — Turn independent options on or off, usually inside a form that is submitted later.
- Radio group — Pick exactly one of a small set of visible options.
- Switch — A setting that takes effect immediately, like turning on automatic backups.
- Badge — A short label for a status, category or count.
- Card — A surface that groups related content and actions.
- Alert — An inline message about something that needs attention or has just happened.
- Tabs — Switch between related views without leaving the page.
- Dialog — A focused task on top of the page that must be finished or dismissed.
- Tooltip — A short label that appears on hover or focus, mostly for icon-only buttons.
- Avatar — A person or organisation, shown as a photo or initials.
- Spinner — Shows that something is in progress. Inherits the current text colour.
- AppCard — An open-source app in the Idlistack catalogue: logo, maker, one-line pitch and category.
- StackCard — A curated group of apps around one organisational need, like Fundraising or Communication.
- Stepper — Progress through a multi-step flow, like deploying an app or migrating a site.
- Navbar — The site header: logo, primary links and actions, collapsing to a menu on small screens.
- PricingCard — A plan with its price, what’s included and a call to action. Prices in the example are illustrative.

## Core components

### Button

Triggers an action. Primary buttons carry the one thing we most want someone to do on a screen.

```tsx
import { Button } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "outline" \| "soft" \| "ghost" \| "link" \| "danger"` | `"primary"` | Visual emphasis. |
| `size` | `"sm" \| "md" \| "lg" \| "icon"` | `"md"` | Height and padding. `icon` is a 40px square and needs an `aria-label`. |
| `loading` | `boolean` | `false` | Shows a spinner, disables the button and sets `aria-busy`. |
| `asChild` | `boolean` | `false` | Style a child element (like a link) as a button instead of rendering `<button>`. |

#### Usage

- Do: Use verbs that say what happens: “Deploy app”, not “Submit”.
- Do: Keep a single primary button per section; pair it with `outline` or `ghost`.
- Do: Use `asChild` with a link when the button navigates to another page.
- Don't: Don’t use `danger` for anything that can be undone — save it for destructive actions.
- Don't: Don’t disable a submit button to signal invalid input; let people submit and show the error.

#### Accessibility

- Renders a native `<button>` with `type` passed through — set `type="submit"` explicitly inside forms.
- Icon-only buttons must have an `aria-label`.
- Keyboard focus shows a 2px brand ring offset from the button.

#### Example: Variants

One primary action per view. Everything else steps down in emphasis.

```tsx
import { Button } from "@idlistack/ui";

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Get started</Button>
      <Button variant="secondary">Explore stacks</Button>
      <Button variant="outline">Log in</Button>
      <Button variant="soft">Request an app</Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="link">Read the price philosophy</Button>
    </div>
  );
}
```

#### Example: Sizes

```tsx
import { Button } from "@idlistack/ui";
import { Plus } from "lucide-react";

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" variant="outline" aria-label="Add app">
        <Plus />
      </Button>
    </div>
  );
}
```

#### Example: Icons, loading and disabled

```tsx
import { Button } from "@idlistack/ui";
import { ArrowRight, Rocket, Trash2 } from "lucide-react";

export default function ButtonStates() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <Rocket /> Deploy app
      </Button>
      <Button variant="outline">
        View all apps <ArrowRight />
      </Button>
      <Button loading>Deploying…</Button>
      <Button disabled>Unavailable</Button>
      <Button variant="danger">
        <Trash2 /> Delete site
      </Button>
    </div>
  );
}
```

### Input & Textarea

Single and multi-line text entry. Pair with a Label, or use Field for label, hint and error wiring.

```tsx
import { Input, Textarea, Label } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `...props` | `ComponentProps<"input">` | — | All native input attributes are supported. |
| `aria-invalid` | `boolean` | — | Shows the error border. Field sets this for you. |

#### Usage

- Do: Always give inputs a visible label.
- Do: Use placeholders for an example value, not as the label.
- Don't: Don’t use a Textarea for values that must be one line, like a domain.

#### Accessibility

- Placeholder text is a lighter tone and isn’t a substitute for a label.
- Focus shows a soft brand halo plus a border change, so it doesn’t rely on colour alone.

#### Example: Default

```tsx
import { Input, Label, Textarea } from "@idlistack/ui";

export default function InputDefault() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <div className="grid gap-2">
        <Label htmlFor="org">Organisation name</Label>
        <Input id="org" placeholder="e.g. Pratham Education Foundation" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="domain">Domain</Label>
        <Input id="domain" placeholder="yourngo.org" disabled />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="need">What would you like to build?</Label>
        <Textarea id="need" placeholder="Tell us about your goals…" />
      </div>
    </div>
  );
}
```

### Field

Lays out a label, a control and its helper or error text, and connects them for assistive technology.

```tsx
import { Field, Input } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `ReactNode` | — | Visible label, linked to the control. |
| `hint` | `ReactNode` | — | Helper text under the control. |
| `error` | `ReactNode` | — | Replaces the hint and marks the control invalid. |
| `required` | `boolean` | — | Adds a visual asterisk and the native `required` attribute. |
| `children` | `ReactNode` | — | The control. Idli controls read the Field’s `id`, `required`, `aria-describedby` and `aria-invalid` from context. |
| `useFieldControl` | `(props) => props` | — | Hook for custom controls: merges the enclosing Field’s attributes into your props. Explicit props win. |

#### Usage

- Do: Write errors that say how to fix the problem.
- Do: Show errors after the person leaves the field or submits, not while they type.
- Don't: Don’t put more than one control inside a Field — use a fieldset for groups.

#### Accessibility

- The hint or error is announced with the control via `aria-describedby`.
- The error state sets `aria-invalid` on the control.
- A plain `<input>` isn’t wired automatically — use an Idli control or `useFieldControl` so the label and messages are linked.

#### Example: Hint and error

```tsx
import { Field, Input } from "@idlistack/ui";

export default function FieldDefault() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <Field label="Work email" hint="We'll send your deployment credentials here." required>
        <Input type="email" placeholder="you@yourngo.org" />
      </Field>
      <Field label="Subdomain" error="This subdomain is already taken. Try another.">
        <Input defaultValue="donate" />
      </Field>
    </div>
  );
}
```

### Select

Choose one option from a list of five or more. For two to four options, prefer a RadioGroup.

```tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value / defaultValue` | `string` | — | Controlled or uncontrolled selected value (on `Select`). |
| `onValueChange` | `(value: string) => void` | — | Called when the selection changes. |
| `placeholder` | `string` | — | Shown in `SelectValue` until something is chosen. |

#### Usage

- Do: Order options logically — by frequency or alphabetically.
- Don't: Don’t use a Select for navigation.

#### Accessibility

- Built on Radix Select: full keyboard support, type-ahead and correct listbox semantics.
- Give the trigger an `id` and pair it with a `Label`.

#### Example: Default

```tsx
import { Label, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@idlistack/ui";

export default function SelectDefault() {
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="stack">Stack</Label>
      <Select>
        <SelectTrigger id="stack">
          <SelectValue placeholder="Choose a stack" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Stacks</SelectLabel>
            <SelectItem value="fundraising">Fundraising</SelectItem>
            <SelectItem value="community">Community engagement</SelectItem>
            <SelectItem value="communication">Communication</SelectItem>
            <SelectItem value="websites">Websites</SelectItem>
            <SelectItem value="custom" disabled>
              Custom apps (coming soon)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
```

### Checkbox

Turn independent options on or off, usually inside a form that is submitted later.

```tsx
import { Checkbox, Label } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked / defaultChecked` | `boolean \| "indeterminate"` | — | Controlled or uncontrolled state. |
| `onCheckedChange` | `(checked: boolean \| "indeterminate") => void` | — | Called on toggle. |

#### Usage

- Do: Group related checkboxes in a `fieldset` with a `legend`.
- Don't: Don’t use a checkbox for a setting that applies immediately — use a Switch.

#### Accessibility

- Clicking the label toggles the box.
- Supports the `indeterminate` state for “select all”.

#### Example: Group

```tsx
import { Checkbox, Label } from "@idlistack/ui";

export default function CheckboxDefault() {
  return (
    <fieldset className="grid gap-3">
      <legend className="mb-3 text-sm font-semibold">Include in your stack</legend>
      {[
        { id: "listmonk", label: "Listmonk — email campaigns", checked: true },
        { id: "ghost", label: "Ghost — newsletter & blog" },
        { id: "mattermost", label: "Mattermost — team chat" },
        { id: "fms", label: "FMS — fundraising (requires approval)", disabled: true },
      ].map((app) => (
        <div key={app.id} className="flex items-center gap-3">
          <Checkbox id={app.id} defaultChecked={app.checked} disabled={app.disabled} />
          <Label htmlFor={app.id} className="font-normal">
            {app.label}
          </Label>
        </div>
      ))}
    </fieldset>
  );
}
```

### Radio group

Pick exactly one of a small set of visible options.

```tsx
import { RadioGroup, RadioGroupItem, Label } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value / defaultValue` | `string` | — | Selected item value. |
| `onValueChange` | `(value: string) => void` | — | Called when selection changes. |

#### Usage

- Do: Pre-select the most common or safest option.
- Don't: Don’t use for more than about five options — use a Select.

#### Accessibility

- Arrow keys move between options; Tab moves into and out of the group.
- Name the group with `aria-label` or a visible legend.

#### Example: Default

```tsx
import { Label, RadioGroup, RadioGroupItem } from "@idlistack/ui";

export default function RadioGroupDefault() {
  return (
    <RadioGroup defaultValue="monthly" aria-label="Billing cycle">
      {[
        { value: "monthly", label: "Monthly", hint: "Pay as you go" },
        { value: "yearly", label: "Yearly", hint: "Two months free" },
      ].map((option) => (
        <div key={option.value} className="flex items-start gap-3">
          <RadioGroupItem id={option.value} value={option.value} className="mt-0.5" />
          <Label htmlFor={option.value} className="grid gap-1 font-normal">
            <span className="font-medium">{option.label}</span>
            <span className="text-xs text-muted-foreground">{option.hint}</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
```

### Switch

A setting that takes effect immediately, like turning on automatic backups.

```tsx
import { Switch, Label } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked / defaultChecked` | `boolean` | — | On or off. |
| `onCheckedChange` | `(checked: boolean) => void` | — | Called on toggle. |

#### Usage

- Do: Label the setting, not the state (“Daily backups”, not “On”).
- Don't: Don’t use inside forms that need a Save button.

#### Accessibility

- Exposes `role="switch"` with `aria-checked`.
- Space toggles when focused.

#### Example: Settings list

```tsx
import { Label, Switch } from "@idlistack/ui";

export default function SwitchDefault() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      {[
        { id: "backups", label: "Daily backups", hint: "Kept for 30 days", on: true },
        { id: "updates", label: "Automatic updates", hint: "Security patches are always applied", on: true },
        { id: "maintenance", label: "Maintenance mode", hint: "Show a holding page to visitors" },
      ].map((s) => (
        <div key={s.id} className="flex items-center justify-between gap-4">
          <Label htmlFor={s.id} className="grid gap-1">
            {s.label}
            <span className="text-xs font-normal text-muted-foreground">{s.hint}</span>
          </Label>
          <Switch id={s.id} defaultChecked={s.on} />
        </div>
      ))}
    </div>
  );
}
```

### Badge

A short label for a status, category or count.

```tsx
import { Badge } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tone` | `"brand" \| "neutral" \| "info" \| "success" \| "warning" \| "danger" \| "solid"` | `"neutral"` | Colour and meaning. |
| `size` | `"sm" \| "md"` | `"md"` | Text size and padding. |
| `dot` | `boolean` | — | Adds a leading status dot. |

#### Usage

- Do: Use `brand` for categories like stacks and `success`/`warning`/`danger` only for status.
- Don't: Don’t make badges clickable — use a Button or link.

#### Accessibility

- Status is always written in words, so it never relies on colour alone.

#### Example: Tones

```tsx
import { Badge } from "@idlistack/ui";

export default function BadgeTones() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge tone="brand">Fundraising</Badge>
      <Badge tone="neutral">Open source</Badge>
      <Badge tone="info">Beta</Badge>
      <Badge tone="success" dot>
        Running
      </Badge>
      <Badge tone="warning" dot>
        Updating
      </Badge>
      <Badge tone="danger" dot>
        Down
      </Badge>
      <Badge tone="solid">New</Badge>
      <Badge tone="brand" size="sm">
        Small
      </Badge>
    </div>
  );
}
```

### Card

A surface that groups related content and actions.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `interactive` | `boolean` | `false` | Lift on hover. Use when the whole card is a link. |

#### Usage

- Do: Keep a card about one thing.
- Do: Put actions in the footer, primary first.
- Don't: Don’t nest cards inside cards.

#### Accessibility

- `CardTitle` renders an `h3`. If that breaks your page’s heading order, put your own heading inside `CardHeader` instead.

#### Example: Site summary

```tsx
import { Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@idlistack/ui";

export default function CardDefault() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>donate.yourngo.org</CardTitle>
          <Badge tone="success" dot size="sm">
            Running
          </Badge>
        </div>
        <CardDescription>WordPress · Mumbai region · Last backup 2 hours ago</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Visitors this month</dt>
            <dd className="mt-1 font-heading text-2xl font-bold">12,480</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Uptime</dt>
            <dd className="mt-1 font-heading text-2xl font-bold">99.98%</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter>
        <Button size="sm">Open dashboard</Button>
        <Button size="sm" variant="ghost">
          Settings
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Alert

An inline message about something that needs attention or has just happened.

```tsx
import { Alert } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tone` | `"info" \| "success" \| "warning" \| "danger" \| "brand"` | `"info"` | Colour, icon and urgency. |
| `title` | `ReactNode` | — | One-line summary. |
| `icon` | `ReactNode \| null` | — | Replace the default icon, or `null` to hide it. |
| `actions` | `ReactNode` | — | Buttons shown under the message. |
| `onDismiss` | `() => void` | — | Shows a close button. |

#### Usage

- Do: Lead with what happened, then what to do.
- Don't: Don’t stack several alerts — combine or prioritise them.

#### Accessibility

- `warning` and `danger` use `role="alert"` and are announced immediately; others use `role="status"`.

#### Example: Tones

```tsx
import { Alert, Button } from "@idlistack/ui";

export default function AlertTones() {
  return (
    <div className="grid w-full max-w-xl gap-3">
      <Alert tone="brand" title="Your app is live">
        Listmonk is ready at <strong>mail.yourngo.org</strong>. Credentials are on their way to your inbox.
      </Alert>
      <Alert tone="info" title="Scheduled maintenance">
        WordPress will update to 6.8 on Sunday at 2:00 AM IST. No action needed.
      </Alert>
      <Alert tone="success" title="Backup restored" />
      <Alert
        tone="warning"
        title="Storage almost full"
        actions={
          <Button size="sm" variant="outline">
            Upgrade storage
          </Button>
        }
      >
        You have used 9.2 GB of 10 GB.
      </Alert>
      <Alert tone="danger" title="Deployment failed">
        We couldn&apos;t verify your domain&apos;s DNS records. Check them and try again.
      </Alert>
    </div>
  );
}
```

#### Example: Dismissible

```tsx
import { useState } from "react";
import { Alert, Button } from "@idlistack/ui";

export default function AlertDismissible() {
  const [open, setOpen] = useState(true);
  if (!open) {
    return (
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Show alert again
      </Button>
    );
  }
  return (
    <Alert tone="brand" title="New: WhatsApp chatbots with Whatomate" onDismiss={() => setOpen(false)} className="max-w-xl">
      Reach supporters where they already are. Deploy it from the Communication stack.
    </Alert>
  );
}
```

### Tabs

Switch between related views without leaving the page.

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"pill" \| "underline"` | `"pill"` | Pill for compact switches, underline for section navigation. |
| `value / defaultValue` | `string` | — | Active tab. |

#### Usage

- Do: Use short, parallel labels.
- Don't: Don’t use tabs for sequential steps — use a Stepper.

#### Accessibility

- Arrow keys move between tabs; Tab moves into the panel.
- Implements the WAI-ARIA tabs pattern via Radix.

#### Example: Pill

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@idlistack/ui";

export default function TabsDefault() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="backups">Backups</TabsTrigger>
        <TabsTrigger value="domain">Domain</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-sm text-muted-foreground">
        Your Ghost site is running on the latest version.
      </TabsContent>
      <TabsContent value="backups" className="text-sm text-muted-foreground">
        30 daily backups are available to restore.
      </TabsContent>
      <TabsContent value="domain" className="text-sm text-muted-foreground">
        blog.yourngo.org — SSL active, renews automatically.
      </TabsContent>
    </Tabs>
  );
}
```

#### Example: Underline

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@idlistack/ui";

export default function TabsUnderline() {
  return (
    <Tabs defaultValue="all" variant="underline" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="all">All apps</TabsTrigger>
        <TabsTrigger value="fundraising">Fundraising</TabsTrigger>
        <TabsTrigger value="communication">Communication</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="text-sm text-muted-foreground">7 apps ready to deploy.</TabsContent>
      <TabsContent value="fundraising" className="text-sm text-muted-foreground">FMS, WordPress</TabsContent>
      <TabsContent value="communication" className="text-sm text-muted-foreground">
        Listmonk, Ghost, Mattermost, Whatomate
      </TabsContent>
    </Tabs>
  );
}
```

### Dialog

A focused task on top of the page that must be finished or dismissed.

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Max width (on `DialogContent`). |
| `hideClose` | `boolean` | `false` | Hide the corner close button. |
| `open / onOpenChange` | `boolean / (open) => void` | — | Control it from state (on `Dialog`). |

#### Usage

- Do: Keep dialogs short — one task, a few fields.
- Don't: Don’t open a dialog from another dialog.

#### Accessibility

- Focus is trapped inside and returns to the trigger on close.
- Escape and clicking the overlay close it.
- Always include a `DialogTitle`.

#### Example: Form in a dialog

```tsx
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
} from "@idlistack/ui";

export default function DialogDefault() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Request an app</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request an app</DialogTitle>
          <DialogDescription>
            Tell us which open-source tool you need. We review every request and reply within two working days.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Field label="App name" required>
            <Input placeholder="e.g. Nextcloud" />
          </Field>
          <Field label="How will your team use it?" hint="Optional, but it helps us prioritise.">
            <Input placeholder="File sharing with field staff" />
          </Field>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button>Send request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Tooltip

A short label that appears on hover or focus, mostly for icon-only buttons.

```tsx
import { Tooltip } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `ReactNode` | — | Tooltip text. |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"top"` | Preferred side. |
| `delayDuration` | `number` | `250` | Milliseconds before it opens. |

#### Usage

- Do: Keep it to a few words.
- Don't: Don’t hide essential information in a tooltip — touch users may never see it.

#### Accessibility

- Opens on keyboard focus as well as hover.
- The trigger must be focusable.

#### Example: Default

```tsx
import { Button, Tooltip } from "@idlistack/ui";
import { Copy, Info, RefreshCw } from "lucide-react";

export default function TooltipDefault() {
  return (
    <div className="flex items-center gap-2">
      <Tooltip content="Copy site URL">
        <Button variant="outline" size="icon" aria-label="Copy site URL">
          <Copy />
        </Button>
      </Tooltip>
      <Tooltip content="Restart app">
        <Button variant="outline" size="icon" aria-label="Restart app">
          <RefreshCw />
        </Button>
      </Tooltip>
      <Tooltip content="Billed in INR. GST included." side="right">
        <button type="button" className="rounded-full p-1 text-muted-foreground hover:text-foreground" aria-label="Pricing details">
          <Info className="size-4" />
        </button>
      </Tooltip>
    </div>
  );
}
```

### Avatar

A person or organisation, shown as a photo or initials.

```tsx
import { Avatar, AvatarGroup } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | — | Used for alt text and initials. |
| `src` | `string` | — | Image URL. Falls back to initials if it fails. |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | 24 – 56px. |
| `shape` | `"circle" \| "square"` | `"circle"` | Use `square` for organisations. |

#### Usage

- Do: Use squares for organisations and circles for people.
- Don't: Don’t rely on the avatar alone to identify someone — show the name nearby.

#### Accessibility

- The full name is available to screen readers even when initials are shown.

#### Example: Sizes, shapes and groups

```tsx
import { Avatar, AvatarGroup } from "@idlistack/ui";

export default function AvatarDefault() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex items-end gap-3">
        <Avatar name="Asha Rao" size="xs" />
        <Avatar name="Asha Rao" size="sm" />
        <Avatar name="Asha Rao" size="md" />
        <Avatar name="Asha Rao" size="lg" />
      </div>
      <Avatar name="Vidhi Centre" shape="square" size="lg" />
      <AvatarGroup>
        <Avatar name="Asha Rao" size="sm" />
        <Avatar name="Rahul Menon" size="sm" />
        <Avatar name="Fatima Shaikh" size="sm" />
        <Avatar name="Karan Gill" size="sm" />
      </AvatarGroup>
    </div>
  );
}
```

### Spinner

Shows that something is in progress. Inherits the current text colour.

```tsx
import { Spinner } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string \| null` | `"Loading"` | Announced to screen readers. `null` hides it when a parent announces instead. |

#### Usage

- Do: Say what’s loading if it takes more than a second.
- Don't: Don’t use for page loads — use skeletons.

#### Accessibility

- Has `role="status"` and a label.
- Respects reduced motion.

#### Example: Default

```tsx
import { Spinner } from "@idlistack/ui";

export default function SpinnerDefault() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-4 text-muted-foreground" />
      <Spinner className="text-primary" />
      <Spinner className="size-8 text-foreground" label="Deploying your app" />
    </div>
  );
}
```

## Idlistack patterns

### AppCard

Idlistack pattern. An open-source app in the Idlistack catalogue: logo, maker, one-line pitch and category.

```tsx
import { AppCard } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | — | App name. |
| `maker` | `string` | — | Shown as “by …”. |
| `description` | `string` | — | One sentence on what it helps you do. |
| `logo` | `ReactNode` | — | Image or icon in a 48px tile. |
| `category` | `string` | — | Stack the app belongs to. |
| `status` | `"available" \| "beta" \| "coming-soon"` | `"available"` | Availability badge. |
| `href / linkAs` | `string / ElementType` | — | Make the whole card a link; pass Next.js `Link` as `linkAs`. |

#### Usage

- Do: Describe the outcome, not the technology (“Reach every supporter”, not “SMTP-based”).
- Don't: Don’t make coming-soon cards clickable.

#### Accessibility

- The title link stretches over the card so there is a single tab stop per card.

#### Example: Catalogue grid

```tsx
import { AppCard } from "@idlistack/ui";
import { Mail, MessageCircle, Newspaper } from "lucide-react";

export default function AppCardGrid() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AppCard
        name="Listmonk"
        maker="Kailash Nadh"
        description="Self-hosted newsletter and mailing list manager for campaigns that reach every supporter."
        logo={<Mail className="text-blush-600" />}
        category="Communication"
        href="#"
      />
      <AppCard
        name="Ghost"
        maker="Ghost Foundation"
        description="A modern publishing platform for your blog, newsletter and paid memberships."
        logo={<Newspaper className="text-ink-900" />}
        category="Websites"
        status="beta"
        href="#"
      />
      <AppCard
        name="Whatomate"
        maker="T4GC"
        description="Build WhatsApp chatbots to answer FAQs and collect information at scale."
        logo={<MessageCircle className="text-emerald-600" />}
        category="Communication"
        status="coming-soon"
      />
    </div>
  );
}
```

### StackCard

Idlistack pattern. A curated group of apps around one organisational need, like Fundraising or Communication.

```tsx
import { StackCard } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | The need this stack serves. |
| `description` | `string` | — | What a team can do with it. |
| `icon` | `ReactNode` | — | Icon in the tile. |
| `apps` | `string[]` | — | Apps included. |
| `href / linkAs / cta` | `string / ElementType / string` | — | Link and its label. |

#### Usage

- Do: Name stacks by need, not by tool.
- Don't: Don’t list more than about four apps — link to the stack page instead.

#### Accessibility

- The CTA link covers the card; the app list is a labelled list.

#### Example: Stacks

```tsx
import { StackCard } from "@idlistack/ui";
import { HandHeart, Megaphone, Users } from "lucide-react";

export default function StackCardGrid() {
  return (
    <div className="grid w-full gap-4 md:grid-cols-3">
      <StackCard
        title="Fundraising"
        description="Run campaigns, track donors and issue receipts without the spreadsheet chaos."
        icon={<HandHeart />}
        apps={["FMS", "WordPress"]}
        href="#"
      />
      <StackCard
        title="Community engagement"
        description="Host live Q&As, polls and discussions that keep your community close."
        icon={<Users />}
        apps={["rForum", "Mattermost"]}
        href="#"
      />
      <StackCard
        title="Communication"
        description="Reach supporters by email and WhatsApp from tools you own."
        icon={<Megaphone />}
        apps={["Listmonk", "Ghost", "Whatomate"]}
        href="#"
      />
    </div>
  );
}
```

### Stepper

Idlistack pattern. Progress through a multi-step flow, like deploying an app or migrating a site.

```tsx
import { Stepper } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `steps` | `{ title: string; description?: string }[]` | — | The steps, in order. |
| `current` | `number` | — | Zero-based current step. Earlier steps show as complete. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Use vertical on narrow screens and for timelines. |

#### Usage

- Do: Keep it to three to five steps.
- Don't: Don’t use as navigation tabs.

#### Accessibility

- Uses an ordered list with `aria-current="step"`.
- Each step’s state is spelled out for screen readers.

#### Example: Horizontal

```tsx
import { useState } from "react";
import { Button, Stepper } from "@idlistack/ui";

const steps = [
  { title: "Select an app", description: "Pick from the catalogue" },
  { title: "Configure", description: "Domain and admin email" },
  { title: "Deploy", description: "We set up the server" },
  { title: "Start using", description: "Log in and go" },
];

export default function StepperHorizontal() {
  const [current, setCurrent] = useState(1);
  return (
    <div className="grid w-full max-w-2xl gap-8">
      <Stepper steps={steps} current={current} />
      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}>
          Back
        </Button>
        <Button size="sm" onClick={() => setCurrent((c) => Math.min(steps.length, c + 1))} disabled={current === steps.length}>
          Next step
        </Button>
      </div>
    </div>
  );
}
```

#### Example: Vertical timeline

```tsx
import { Stepper } from "@idlistack/ui";

export default function StepperVertical() {
  return (
    <Stepper
      orientation="vertical"
      current={2}
      steps={[
        { title: "Migration requested", description: "14 Oct, 10:12 AM" },
        { title: "Files and database copied", description: "14 Oct, 11:40 AM" },
        { title: "Switching DNS", description: "Usually takes under an hour" },
        { title: "Live on Idlistack" },
      ]}
    />
  );
}
```

### Navbar

Idlistack pattern. The site header: logo, primary links and actions, collapsing to a menu on small screens.

```tsx
import { Navbar, Button } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `logo` | `ReactNode` | — | Brand mark, usually wrapped in a home link. |
| `links` | `{ label; href; active? }[]` | — | Primary navigation. |
| `actions` | `ReactNode` | — | Buttons on the right. |
| `sticky` | `boolean` | `true` | Stick to the top with a translucent backdrop. |
| `linkAs` | `ElementType` | `"a"` | Custom link component. |

#### Usage

- Do: Keep to five or fewer links.
- Don't: Don’t put more than two actions in the header.

#### Accessibility

- Marks the active link with `aria-current="page"`.
- The menu button reports `aria-expanded`.

#### Example: Default

Resize the window to see the mobile menu.

```tsx
import { Button, Navbar } from "@idlistack/ui";

export default function NavbarDefault() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border">
      <Navbar
        sticky={false}
        logo={
          <a href="#" className="font-heading text-lg font-extrabold tracking-tight">
            your<span className="text-brand">ngo</span>
          </a>
        }
        links={[
          { label: "Stacks", href: "#stacks", active: true },
          { label: "Apps", href: "#apps" },
          { label: "Pricing", href: "#pricing" },
          { label: "Migrate", href: "#migrate" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">
              Log in
            </Button>
            <Button size="sm">Get started</Button>
          </>
        }
      />
      <div className="h-24 bg-surface-muted" />
    </div>
  );
}
```

### PricingCard

Idlistack pattern. A plan with its price, what’s included and a call to action. Prices in the example are illustrative.

```tsx
import { PricingCard, Button } from "@idlistack/ui";
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `plan` | `string` | — | Plan name. |
| `price / period` | `string` | — | Formatted price and billing period. |
| `features` | `string[]` | — | What’s included. |
| `action` | `ReactNode` | — | Usually a Button. |
| `highlighted / highlightLabel` | `boolean / string` | — | Emphasise the recommended plan. |

#### Usage

- Do: Show prices in rupees with GST status nearby.
- Do: Highlight at most one plan.
- Don't: Don’t hide limits in fine print — list them as features.

#### Accessibility

- Feature ticks are decorative; the list is plain text.

#### Example: Plans

```tsx
import { Button, PricingCard } from "@idlistack/ui";

export default function PricingCardDefault() {
  return (
    <div className="grid w-full items-start gap-6 pt-3 md:grid-cols-3">
      <PricingCard
        plan="Starter"
        price="₹0"
        period="for 30 days"
        description="Try any one app with full support."
        features={["1 app", "Idlistack subdomain", "Community support"]}
        action={<Button variant="outline">Start free trial</Button>}
      />
      <PricingCard
        highlighted
        plan="Organisation"
        price="₹1,499"
        period="per month"
        description="Everything a growing team needs."
        features={["Up to 5 apps", "Custom domains & SSL", "Daily backups", "Email support"]}
        action={<Button>Get started</Button>}
      />
      <PricingCard
        plan="Network"
        price="Custom"
        description="For foundations supporting many grantees."
        features={["Unlimited apps", "Bulk onboarding", "Dedicated success manager"]}
        action={<Button variant="secondary">Talk to us</Button>}
      />
    </div>
  );
}
```
