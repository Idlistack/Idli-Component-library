export type PropDoc = { name: string; type: string; default?: string; description: string };

export type ComponentDoc = {
  slug: string;
  name: string;
  group: "Components" | "Patterns";
  description: string;
  /** Names to import from @idlistack/ui. */
  imports: string[];
  examples: { id: string; title: string; description?: string }[];
  props?: PropDoc[];
  /** When to reach for it, and when not to. */
  usage: { do: string[]; dont: string[] };
  accessibility: string[];
};

export const registry: ComponentDoc[] = [
  {
    slug: "button",
    name: "Button",
    group: "Components",
    description: "Triggers an action. Primary buttons carry the one thing we most want someone to do on a screen.",
    imports: ["Button"],
    examples: [
      { id: "button/variants", title: "Variants", description: "One primary action per view. Everything else steps down in emphasis." },
      { id: "button/sizes", title: "Sizes" },
      { id: "button/states", title: "Icons, loading and disabled" },
    ],
    props: [
      { name: "variant", type: '"primary" | "secondary" | "outline" | "soft" | "ghost" | "link" | "danger"', default: '"primary"', description: "Visual emphasis." },
      { name: "size", type: '"sm" | "md" | "lg" | "icon"', default: '"md"', description: "Height and padding. `icon` is a 40px square and needs an `aria-label`." },
      { name: "loading", type: "boolean", default: "false", description: "Shows a spinner, disables the button and sets `aria-busy`." },
      { name: "asChild", type: "boolean", default: "false", description: "Style a child element (like a link) as a button instead of rendering `<button>`." },
    ],
    usage: {
      do: [
        "Use verbs that say what happens: “Deploy app”, not “Submit”.",
        "Keep a single primary button per section; pair it with `outline` or `ghost`.",
        "Use `asChild` with a link when the button navigates to another page.",
      ],
      dont: [
        "Don’t use `danger` for anything that can be undone — save it for destructive actions.",
        "Don’t disable a submit button to signal invalid input; let people submit and show the error.",
      ],
    },
    accessibility: [
      "Renders a native `<button>` with `type` passed through — set `type=\"submit\"` explicitly inside forms.",
      "Icon-only buttons must have an `aria-label`.",
      "Keyboard focus shows a 2px brand ring offset from the button.",
    ],
  },
  {
    slug: "input",
    name: "Input & Textarea",
    group: "Components",
    description: "Single and multi-line text entry. Pair with a Label, or use Field for label, hint and error wiring.",
    imports: ["Input", "Textarea", "Label"],
    examples: [{ id: "input/default", title: "Default" }],
    props: [
      { name: "...props", type: 'ComponentProps<"input">', description: "All native input attributes are supported." },
      { name: "aria-invalid", type: "boolean", description: "Shows the error border. Field sets this for you." },
    ],
    usage: {
      do: ["Always give inputs a visible label.", "Use placeholders for an example value, not as the label."],
      dont: ["Don’t use a Textarea for values that must be one line, like a domain."],
    },
    accessibility: [
      "Placeholder text is a lighter tone and isn’t a substitute for a label.",
      "Focus shows a soft brand halo plus a border change, so it doesn’t rely on colour alone.",
    ],
  },
  {
    slug: "field",
    name: "Field",
    group: "Components",
    description: "Lays out a label, a control and its helper or error text, and connects them for assistive technology.",
    imports: ["Field", "Input"],
    examples: [{ id: "field/default", title: "Hint and error" }],
    props: [
      { name: "label", type: "ReactNode", description: "Visible label, linked to the control." },
      { name: "hint", type: "ReactNode", description: "Helper text under the control." },
      { name: "error", type: "ReactNode", description: "Replaces the hint and marks the control invalid." },
      { name: "required", type: "boolean", description: "Adds a visual asterisk and the native `required` attribute." },
      { name: "children", type: "ReactElement", description: "Exactly one control. It receives `id`, `aria-describedby` and `aria-invalid`." },
    ],
    usage: {
      do: ["Write errors that say how to fix the problem.", "Show errors after the person leaves the field or submits, not while they type."],
      dont: ["Don’t put more than one control inside a Field — use a fieldset for groups."],
    },
    accessibility: ["The hint or error is announced with the control via `aria-describedby`.", "The error state sets `aria-invalid` on the control."],
  },
  {
    slug: "select",
    name: "Select",
    group: "Components",
    description: "Choose one option from a list of five or more. For two to four options, prefer a RadioGroup.",
    imports: ["Select", "SelectTrigger", "SelectValue", "SelectContent", "SelectGroup", "SelectLabel", "SelectItem"],
    examples: [{ id: "select/default", title: "Default" }],
    props: [
      { name: "value / defaultValue", type: "string", description: "Controlled or uncontrolled selected value (on `Select`)." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called when the selection changes." },
      { name: "placeholder", type: "string", description: "Shown in `SelectValue` until something is chosen." },
    ],
    usage: {
      do: ["Order options logically — by frequency or alphabetically."],
      dont: ["Don’t use a Select for navigation."],
    },
    accessibility: ["Built on Radix Select: full keyboard support, type-ahead and correct listbox semantics.", "Give the trigger an `id` and pair it with a `Label`."],
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    group: "Components",
    description: "Turn independent options on or off, usually inside a form that is submitted later.",
    imports: ["Checkbox", "Label"],
    examples: [{ id: "checkbox/default", title: "Group" }],
    props: [
      { name: "checked / defaultChecked", type: 'boolean | "indeterminate"', description: "Controlled or uncontrolled state." },
      { name: "onCheckedChange", type: '(checked: boolean | "indeterminate") => void', description: "Called on toggle." },
    ],
    usage: {
      do: ["Group related checkboxes in a `fieldset` with a `legend`."],
      dont: ["Don’t use a checkbox for a setting that applies immediately — use a Switch."],
    },
    accessibility: ["Clicking the label toggles the box.", "Supports the `indeterminate` state for “select all”."],
  },
  {
    slug: "radio-group",
    name: "Radio group",
    group: "Components",
    description: "Pick exactly one of a small set of visible options.",
    imports: ["RadioGroup", "RadioGroupItem", "Label"],
    examples: [{ id: "radio-group/default", title: "Default" }],
    props: [
      { name: "value / defaultValue", type: "string", description: "Selected item value." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called when selection changes." },
    ],
    usage: { do: ["Pre-select the most common or safest option."], dont: ["Don’t use for more than about five options — use a Select."] },
    accessibility: ["Arrow keys move between options; Tab moves into and out of the group.", "Name the group with `aria-label` or a visible legend."],
  },
  {
    slug: "switch",
    name: "Switch",
    group: "Components",
    description: "A setting that takes effect immediately, like turning on automatic backups.",
    imports: ["Switch", "Label"],
    examples: [{ id: "switch/default", title: "Settings list" }],
    props: [
      { name: "checked / defaultChecked", type: "boolean", description: "On or off." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Called on toggle." },
    ],
    usage: { do: ["Label the setting, not the state (“Daily backups”, not “On”)."], dont: ["Don’t use inside forms that need a Save button."] },
    accessibility: ["Exposes `role=\"switch\"` with `aria-checked`.", "Space toggles when focused."],
  },
  {
    slug: "badge",
    name: "Badge",
    group: "Components",
    description: "A short label for a status, category or count.",
    imports: ["Badge"],
    examples: [{ id: "badge/tones", title: "Tones" }],
    props: [
      { name: "tone", type: '"brand" | "neutral" | "info" | "success" | "warning" | "danger" | "solid"', default: '"neutral"', description: "Colour and meaning." },
      { name: "size", type: '"sm" | "md"', default: '"md"', description: "Text size and padding." },
      { name: "dot", type: "boolean", description: "Adds a leading status dot." },
    ],
    usage: { do: ["Use `brand` for categories like stacks and `success`/`warning`/`danger` only for status."], dont: ["Don’t make badges clickable — use a Button or link."] },
    accessibility: ["Status is always written in words, so it never relies on colour alone."],
  },
  {
    slug: "card",
    name: "Card",
    group: "Components",
    description: "A surface that groups related content and actions.",
    imports: ["Card", "CardHeader", "CardTitle", "CardDescription", "CardContent", "CardFooter"],
    examples: [{ id: "card/default", title: "Site summary" }],
    props: [{ name: "interactive", type: "boolean", default: "false", description: "Lift on hover. Use when the whole card is a link." }],
    usage: { do: ["Keep a card about one thing.", "Put actions in the footer, primary first."], dont: ["Don’t nest cards inside cards."] },
    accessibility: ["`CardTitle` renders an `h3`. If that breaks your page’s heading order, put your own heading inside `CardHeader` instead."],
  },
  {
    slug: "alert",
    name: "Alert",
    group: "Components",
    description: "An inline message about something that needs attention or has just happened.",
    imports: ["Alert"],
    examples: [
      { id: "alert/tones", title: "Tones" },
      { id: "alert/dismissible", title: "Dismissible" },
    ],
    props: [
      { name: "tone", type: '"info" | "success" | "warning" | "danger" | "brand"', default: '"info"', description: "Colour, icon and urgency." },
      { name: "title", type: "ReactNode", description: "One-line summary." },
      { name: "icon", type: "ReactNode | null", description: "Replace the default icon, or `null` to hide it." },
      { name: "actions", type: "ReactNode", description: "Buttons shown under the message." },
      { name: "onDismiss", type: "() => void", description: "Shows a close button." },
    ],
    usage: { do: ["Lead with what happened, then what to do."], dont: ["Don’t stack several alerts — combine or prioritise them."] },
    accessibility: ["`warning` and `danger` use `role=\"alert\"` and are announced immediately; others use `role=\"status\"`."],
  },
  {
    slug: "tabs",
    name: "Tabs",
    group: "Components",
    description: "Switch between related views without leaving the page.",
    imports: ["Tabs", "TabsList", "TabsTrigger", "TabsContent"],
    examples: [
      { id: "tabs/default", title: "Pill" },
      { id: "tabs/underline", title: "Underline" },
    ],
    props: [
      { name: "variant", type: '"pill" | "underline"', default: '"pill"', description: "Pill for compact switches, underline for section navigation." },
      { name: "value / defaultValue", type: "string", description: "Active tab." },
    ],
    usage: { do: ["Use short, parallel labels."], dont: ["Don’t use tabs for sequential steps — use a Stepper."] },
    accessibility: ["Arrow keys move between tabs; Tab moves into the panel.", "Implements the WAI-ARIA tabs pattern via Radix."],
  },
  {
    slug: "dialog",
    name: "Dialog",
    group: "Components",
    description: "A focused task on top of the page that must be finished or dismissed.",
    imports: ["Dialog", "DialogTrigger", "DialogContent", "DialogHeader", "DialogTitle", "DialogDescription", "DialogFooter", "DialogClose"],
    examples: [{ id: "dialog/default", title: "Form in a dialog" }],
    props: [
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Max width (on `DialogContent`)." },
      { name: "hideClose", type: "boolean", default: "false", description: "Hide the corner close button." },
      { name: "open / onOpenChange", type: "boolean / (open) => void", description: "Control it from state (on `Dialog`)." },
    ],
    usage: { do: ["Keep dialogs short — one task, a few fields."], dont: ["Don’t open a dialog from another dialog."] },
    accessibility: ["Focus is trapped inside and returns to the trigger on close.", "Escape and clicking the overlay close it.", "Always include a `DialogTitle`."],
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    group: "Components",
    description: "A short label that appears on hover or focus, mostly for icon-only buttons.",
    imports: ["Tooltip"],
    examples: [{ id: "tooltip/default", title: "Default" }],
    props: [
      { name: "content", type: "ReactNode", description: "Tooltip text." },
      { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "Preferred side." },
      { name: "delayDuration", type: "number", default: "250", description: "Milliseconds before it opens." },
    ],
    usage: { do: ["Keep it to a few words."], dont: ["Don’t hide essential information in a tooltip — touch users may never see it."] },
    accessibility: ["Opens on keyboard focus as well as hover.", "The trigger must be focusable."],
  },
  {
    slug: "avatar",
    name: "Avatar",
    group: "Components",
    description: "A person or organisation, shown as a photo or initials.",
    imports: ["Avatar", "AvatarGroup"],
    examples: [{ id: "avatar/default", title: "Sizes, shapes and groups" }],
    props: [
      { name: "name", type: "string", description: "Used for alt text and initials." },
      { name: "src", type: "string", description: "Image URL. Falls back to initials if it fails." },
      { name: "size", type: '"xs" | "sm" | "md" | "lg"', default: '"md"', description: "24 – 56px." },
      { name: "shape", type: '"circle" | "square"', default: '"circle"', description: "Use `square` for organisations." },
    ],
    usage: { do: ["Use squares for organisations and circles for people."], dont: ["Don’t rely on the avatar alone to identify someone — show the name nearby."] },
    accessibility: ["The full name is available to screen readers even when initials are shown."],
  },
  {
    slug: "spinner",
    name: "Spinner",
    group: "Components",
    description: "Shows that something is in progress. Inherits the current text colour.",
    imports: ["Spinner"],
    examples: [{ id: "spinner/default", title: "Default" }],
    props: [{ name: "label", type: "string | null", default: '"Loading"', description: "Announced to screen readers. `null` hides it when a parent announces instead." }],
    usage: { do: ["Say what’s loading if it takes more than a second."], dont: ["Don’t use for page loads — use skeletons."] },
    accessibility: ["Has `role=\"status\"` and a label.", "Respects reduced motion."],
  },
  {
    slug: "app-card",
    name: "AppCard",
    group: "Patterns",
    description: "An open-source app in the Idlistack catalogue: logo, maker, one-line pitch and category.",
    imports: ["AppCard"],
    examples: [{ id: "app-card/grid", title: "Catalogue grid" }],
    props: [
      { name: "name", type: "string", description: "App name." },
      { name: "maker", type: "string", description: "Shown as “by …”." },
      { name: "description", type: "string", description: "One sentence on what it helps you do." },
      { name: "logo", type: "ReactNode", description: "Image or icon in a 48px tile." },
      { name: "category", type: "string", description: "Stack the app belongs to." },
      { name: "status", type: '"available" | "beta" | "coming-soon"', default: '"available"', description: "Availability badge." },
      { name: "href / linkAs", type: "string / ElementType", description: "Make the whole card a link; pass Next.js `Link` as `linkAs`." },
    ],
    usage: { do: ["Describe the outcome, not the technology (“Reach every supporter”, not “SMTP-based”)."], dont: ["Don’t make coming-soon cards clickable."] },
    accessibility: ["The title link stretches over the card so there is a single tab stop per card."],
  },
  {
    slug: "stack-card",
    name: "StackCard",
    group: "Patterns",
    description: "A curated group of apps around one organisational need, like Fundraising or Communication.",
    imports: ["StackCard"],
    examples: [{ id: "stack-card/grid", title: "Stacks" }],
    props: [
      { name: "title", type: "string", description: "The need this stack serves." },
      { name: "description", type: "string", description: "What a team can do with it." },
      { name: "icon", type: "ReactNode", description: "Icon in the tile." },
      { name: "apps", type: "string[]", description: "Apps included." },
      { name: "href / linkAs / cta", type: "string / ElementType / string", description: "Link and its label." },
    ],
    usage: { do: ["Name stacks by need, not by tool."], dont: ["Don’t list more than about four apps — link to the stack page instead."] },
    accessibility: ["The CTA link covers the card; the app list is a labelled list."],
  },
  {
    slug: "stepper",
    name: "Stepper",
    group: "Patterns",
    description: "Progress through a multi-step flow, like deploying an app or migrating a site.",
    imports: ["Stepper"],
    examples: [
      { id: "stepper/horizontal", title: "Horizontal" },
      { id: "stepper/vertical", title: "Vertical timeline" },
    ],
    props: [
      { name: "steps", type: "{ title: string; description?: string }[]", description: "The steps, in order." },
      { name: "current", type: "number", description: "Zero-based current step. Earlier steps show as complete." },
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Use vertical on narrow screens and for timelines." },
    ],
    usage: { do: ["Keep it to three to five steps."], dont: ["Don’t use as navigation tabs."] },
    accessibility: ["Uses an ordered list with `aria-current=\"step\"`.", "Each step’s state is spelled out for screen readers."],
  },
  {
    slug: "navbar",
    name: "Navbar",
    group: "Patterns",
    description: "The site header: logo, primary links and actions, collapsing to a menu on small screens.",
    imports: ["Navbar", "Button"],
    examples: [{ id: "navbar/default", title: "Default", description: "Resize the window to see the mobile menu." }],
    props: [
      { name: "logo", type: "ReactNode", description: "Brand mark, usually wrapped in a home link." },
      { name: "links", type: "{ label; href; active? }[]", description: "Primary navigation." },
      { name: "actions", type: "ReactNode", description: "Buttons on the right." },
      { name: "sticky", type: "boolean", default: "true", description: "Stick to the top with a translucent backdrop." },
      { name: "linkAs", type: "ElementType", default: '"a"', description: "Custom link component." },
    ],
    usage: { do: ["Keep to five or fewer links."], dont: ["Don’t put more than two actions in the header."] },
    accessibility: ["Marks the active link with `aria-current=\"page\"`.", "The menu button reports `aria-expanded`."],
  },
  {
    slug: "pricing-card",
    name: "PricingCard",
    group: "Patterns",
    description: "A plan with its price, what’s included and a call to action. Prices in the example are illustrative.",
    imports: ["PricingCard", "Button"],
    examples: [{ id: "pricing-card/default", title: "Plans" }],
    props: [
      { name: "plan", type: "string", description: "Plan name." },
      { name: "price / period", type: "string", description: "Formatted price and billing period." },
      { name: "features", type: "string[]", description: "What’s included." },
      { name: "action", type: "ReactNode", description: "Usually a Button." },
      { name: "highlighted / highlightLabel", type: "boolean / string", description: "Emphasise the recommended plan." },
    ],
    usage: { do: ["Show prices in rupees with GST status nearby.", "Highlight at most one plan."], dont: ["Don’t hide limits in fine print — list them as features."] },
    accessibility: ["Feature ticks are decorative; the list is plain text."],
  },
];

export const componentNav = (["Components", "Patterns"] as const).map((group) => ({
  title: group,
  items: registry.filter((c) => c.group === group).map((c) => ({ title: c.name, href: `/docs/components/${c.slug}` })),
}));

export const docsNav = [
  {
    title: "Getting started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Design principles", href: "/docs/principles" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { title: "Colour", href: "/docs/foundations/colors" },
      { title: "Typography", href: "/docs/foundations/typography" },
      { title: "Layout & elevation", href: "/docs/foundations/layout" },
    ],
  },
  ...componentNav,
];
