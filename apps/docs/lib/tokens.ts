/** Colour data shared by the Colour page and the agent reference. Values mirror packages/ui/theme.css. */

export const palettes = {
  blush: {
    note: "Idlistack pink. 500 is the logo pink; 600 is the accessible fill for buttons.",
    shades: { 50: "#fdf2f7", 100: "#fce4ef", 200: "#f9c9de", 300: "#f5a1c5", 400: "#f06fa8", 500: "#ed4690", 600: "#d63079", 700: "#b32363", 800: "#8e1d50", 900: "#6b1a3e", 950: "#420b24" },
  },
  ink: {
    note: "Navy for headings, body text and secondary actions.",
    shades: { 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cad5e2", 400: "#90a1b9", 500: "#64748b", 600: "#45556c", 700: "#314158", 800: "#1d293d", 900: "#0f172a", 950: "#0a0f1c" },
  },
  sand: {
    note: "Warm, rose-tinted neutrals for surfaces and borders.",
    shades: { 50: "#faf7f8", 100: "#f5f0f1", 200: "#e8e0e2", 300: "#d6cbce", 400: "#a8999d", 500: "#867277", 600: "#6b5a5f", 700: "#52444a", 800: "#3a3035", 900: "#241d21" },
  },
  ocean: {
    note: "Informational blue, used sparingly.",
    shades: { 50: "#eff6ff", 100: "#dbeafe", 400: "#4d9bff", 500: "#0070f3", 600: "#005cc8", 700: "#0049a0" },
  },
} as const;

/** Semantic tokens, usable as Tailwind utilities: bg-{token}, text-{token}, border-{token}, ring-{token}. */
export const semanticTokens = [
  { token: "background", use: "Page background" },
  { token: "surface", use: "Cards, popovers, inputs" },
  { token: "surface-muted", use: "Sections, hovers, tracks" },
  { token: "foreground", use: "Primary text" },
  { token: "muted-foreground", use: "Secondary text" },
  { token: "subtle-foreground", use: "Placeholders, captions" },
  { token: "border", use: "Dividers and card edges" },
  { token: "border-strong", use: "Input borders" },
  { token: "brand", use: "Logo pink: icons, rings, large type (fails AA for small white text)" },
  { token: "primary", use: "Primary button fill (AA with white text)" },
  { token: "primary-hover", use: "Primary button hover" },
  { token: "primary-foreground", use: "Text on primary" },
  { token: "primary-soft", use: "Tinted pink backgrounds" },
  { token: "primary-strong", use: "Pink text and links" },
  { token: "secondary", use: "Secondary (navy) button fill" },
  { token: "secondary-foreground", use: "Text on secondary" },
  { token: "info", use: "Informational status (also info-soft)" },
  { token: "success", use: "Positive status (also success-soft)" },
  { token: "warning", use: "Needs attention (also warning-soft)" },
  { token: "danger", use: "Errors, destructive actions (also danger-soft)" },
  { token: "ring", use: "Focus ring colour" },
];

export const otherTokens = {
  fonts: [
    { utility: "font-heading", value: "Manrope (via --idli-font-heading)", use: "Headings; applied to h1–h6 by default" },
    { utility: "font-sans", value: "Inter (via --idli-font-body)", use: "Body and UI text; applied to body by default" },
    { utility: "font-mono", value: "ui-monospace stack", use: "Code" },
  ],
  radius: [
    { utility: "rounded-md", value: "6px", use: "Small buttons, inline code" },
    { utility: "rounded-lg", value: "8px", use: "Buttons, inputs" },
    { utility: "rounded-xl", value: "12px", use: "Alerts, menus, tiles" },
    { utility: "rounded-2xl", value: "16px", use: "Cards, dialogs" },
    { utility: "rounded-full", value: "9999px", use: "Badges, avatars, switches" },
  ],
  shadows: [
    { utility: "shadow-soft", use: "Cards at rest" },
    { utility: "shadow-lifted", use: "Hover, popovers, dialogs" },
  ],
  motion: [
    { utility: "animate-fade-in / animate-fade-out", use: "Overlays" },
    { utility: "animate-pop-in / animate-pop-out", use: "Popovers, dialogs, tooltips (150–200ms; near-instant under reduced motion)" },
  ],
};
