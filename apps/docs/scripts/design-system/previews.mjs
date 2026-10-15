// Live previews for the Claude Design System artifact: one small document per
// component that mounts the real @idlistack/ui bundle (window.IdliUI) with
// React 19. `card` is the @dsCard marker; `body` is the script that renders.
// Keys are the component names the registry slugs map to (see build.mjs).

const wrap = (cls, children) => `h("div", { className: ${JSON.stringify(cls)} }, ${children})`;

export const previews = {
  Button: {
    card: 'group="Actions" height=128',
    body: wrap("flex flex-wrap items-center gap-3", `
      h(UI.Button, null, "Get started"),
      h(UI.Button, { variant: "secondary" }, "Explore stacks"),
      h(UI.Button, { variant: "outline" }, "Log in"),
      h(UI.Button, { variant: "soft" }, "Request an app"),
      h(UI.Button, { variant: "ghost" }, "Cancel"),
      h(UI.Button, { variant: "link" }, "Price philosophy"),
      h(UI.Button, { loading: true }, "Deploying…"),
      h(UI.Button, { variant: "danger", size: "sm" }, "Delete site")`),
  },
  Input: {
    card: 'group="Forms" height=200',
    body: wrap("grid max-w-sm gap-4", `
      h("div", { className: "grid gap-2" }, h(UI.Label, { htmlFor: "org" }, "Organisation name"), h(UI.Input, { id: "org", placeholder: "e.g. Pratham Education Foundation" })),
      h("div", { className: "grid gap-2" }, h(UI.Label, { htmlFor: "need" }, "What would you like to build?"), h(UI.Textarea, { id: "need", placeholder: "Tell us about your goals…", className: "min-h-20" }))`),
  },
  Field: {
    card: 'group="Forms" height=200',
    body: wrap("grid max-w-sm gap-5", `
      h(UI.Field, { label: "Work email", hint: "We'll send your deployment credentials here.", required: true }, h(UI.Input, { type: "email", placeholder: "you@yourngo.org" })),
      h(UI.Field, { label: "Subdomain", error: "This subdomain is already taken. Try another." }, h(UI.Input, { defaultValue: "donate" }))`),
  },
  Select: {
    card: 'group="Forms" height=96',
    body: wrap("grid max-w-xs gap-2", `
      h(UI.Label, { htmlFor: "stack" }, "Stack"),
      h(UI.Select, { defaultValue: "communication" },
        h(UI.SelectTrigger, { id: "stack" }, h(UI.SelectValue, { placeholder: "Choose a stack" })),
        h(UI.SelectContent, null,
          h(UI.SelectItem, { value: "fundraising" }, "Fundraising"),
          h(UI.SelectItem, { value: "community" }, "Community engagement"),
          h(UI.SelectItem, { value: "communication" }, "Communication"),
          h(UI.SelectItem, { value: "websites" }, "Websites")))`),
  },
  Checkbox: {
    card: 'group="Forms" height=136',
    body: wrap("grid gap-3", `
      ...[["listmonk", "Listmonk — email campaigns", true, false], ["ghost", "Ghost — newsletter & blog", false, false], ["fms", "FMS — fundraising (requires approval)", false, true]].map(([id, label, on, off]) =>
        h("div", { key: id, className: "flex items-center gap-3" }, h(UI.Checkbox, { id, defaultChecked: on, disabled: off }), h(UI.Label, { htmlFor: id, className: "font-normal" }, label)))`),
  },
  RadioGroup: {
    card: 'group="Forms" height=112',
    body: `h(UI.RadioGroup, { defaultValue: "monthly", "aria-label": "Billing cycle" },
      ...[["monthly", "Monthly", "Pay as you go"], ["yearly", "Yearly", "Two months free"]].map(([v, label, hint]) =>
        h("div", { key: v, className: "flex items-start gap-3" }, h(UI.RadioGroupItem, { id: v, value: v, className: "mt-0.5" }),
          h(UI.Label, { htmlFor: v, className: "grid gap-1 font-normal" }, h("span", { className: "font-medium" }, label), h("span", { className: "text-xs text-muted-foreground" }, hint)))))`,
  },
  Switch: {
    card: 'group="Forms" height=136',
    body: wrap("grid max-w-sm gap-4", `
      ...[["backups", "Daily backups", "Kept for 30 days", true], ["updates", "Automatic updates", "Security patches are always applied", true], ["maintenance", "Maintenance mode", "Show a holding page to visitors", false]].map(([id, label, hint, on]) =>
        h("div", { key: id, className: "flex items-center justify-between gap-4" },
          h(UI.Label, { htmlFor: id, className: "grid gap-1" }, label, h("span", { className: "text-xs font-normal text-muted-foreground" }, hint)),
          h(UI.Switch, { id, defaultChecked: on })))`),
  },
  Badge: {
    card: 'group="Display" height=72',
    body: wrap("flex flex-wrap items-center gap-2", `
      h(UI.Badge, { tone: "brand" }, "Fundraising"),
      h(UI.Badge, { tone: "neutral" }, "Open source"),
      h(UI.Badge, { tone: "info" }, "Beta"),
      h(UI.Badge, { tone: "success", dot: true }, "Running"),
      h(UI.Badge, { tone: "warning", dot: true }, "Updating"),
      h(UI.Badge, { tone: "danger", dot: true }, "Down"),
      h(UI.Badge, { tone: "solid" }, "New")`),
  },
  Card: {
    card: 'group="Display" height=280',
    body: `h(UI.Card, { className: "max-w-sm" },
      h(UI.CardHeader, null,
        h("div", { className: "flex items-center justify-between" }, h(UI.CardTitle, null, "donate.yourngo.org"), h(UI.Badge, { tone: "success", dot: true, size: "sm" }, "Running")),
        h(UI.CardDescription, null, "WordPress · Mumbai region · Last backup 2 hours ago")),
      h(UI.CardContent, null,
        h("dl", { className: "grid grid-cols-2 gap-4 text-sm" },
          h("div", null, h("dt", { className: "text-muted-foreground" }, "Visitors this month"), h("dd", { className: "mt-1 font-heading text-2xl font-bold" }, "12,480")),
          h("div", null, h("dt", { className: "text-muted-foreground" }, "Uptime"), h("dd", { className: "mt-1 font-heading text-2xl font-bold" }, "99.98%")))),
      h(UI.CardFooter, null, h(UI.Button, { size: "sm" }, "Open dashboard"), h(UI.Button, { size: "sm", variant: "ghost" }, "Settings")))`,
  },
  Avatar: {
    card: 'group="Display" height=88',
    body: wrap("flex flex-wrap items-center gap-6", `
      h("div", { className: "flex items-end gap-3" }, ...["xs", "sm", "md", "lg"].map((s) => h(UI.Avatar, { key: s, name: "Asha Rao", size: s }))),
      h(UI.Avatar, { name: "Vidhi Centre", shape: "square", size: "lg" }),
      h(UI.AvatarGroup, null, ...["Asha Rao", "Rahul Menon", "Fatima Shaikh", "Karan Gill"].map((n) => h(UI.Avatar, { key: n, name: n, size: "sm" })))`),
  },
  Spinner: {
    card: 'group="Display" height=72',
    body: wrap("flex items-center gap-6", `
      h(UI.Spinner, { className: "size-4 text-muted-foreground" }),
      h(UI.Spinner, { className: "text-primary" }),
      h(UI.Spinner, { className: "size-8 text-foreground", label: "Deploying your app" })`),
  },
  Alert: {
    card: 'group="Feedback" height=360',
    body: wrap("grid max-w-xl gap-3", `
      h(UI.Alert, { tone: "brand", title: "Your app is live" }, "Listmonk is ready at mail.yourngo.org. Credentials are on their way to your inbox."),
      h(UI.Alert, { tone: "info", title: "Scheduled maintenance" }, "WordPress will update on Sunday at 2:00 AM IST. No action needed."),
      h(UI.Alert, { tone: "warning", title: "Storage almost full", actions: h(UI.Button, { size: "sm", variant: "outline" }, "Upgrade storage") }, "You have used 9.2 GB of 10 GB."),
      h(UI.Alert, { tone: "danger", title: "Deployment failed" }, "We couldn't verify your domain's DNS records. Check them and try again.")`),
  },
  Tooltip: {
    card: 'group="Feedback" height=88 subtitle="Hover or focus a button"',
    body: wrap("flex items-center gap-2 pt-6", `
      h(UI.Tooltip, { content: "Copy site URL" }, h(UI.Button, { variant: "outline", size: "icon", "aria-label": "Copy site URL" }, "⧉")),
      h(UI.Tooltip, { content: "Restart app" }, h(UI.Button, { variant: "outline", size: "icon", "aria-label": "Restart app" }, "↻")),
      h(UI.Tooltip, { content: "Billed in INR. GST included.", side: "right" }, h(UI.Button, { variant: "ghost", size: "sm" }, "Pricing details"))`),
  },
  Tabs: {
    card: 'group="Navigation" height=200',
    body: wrap("grid max-w-md gap-8", `
      h(UI.Tabs, { defaultValue: "overview" },
        h(UI.TabsList, null, h(UI.TabsTrigger, { value: "overview" }, "Overview"), h(UI.TabsTrigger, { value: "backups" }, "Backups"), h(UI.TabsTrigger, { value: "domain" }, "Domain")),
        h(UI.TabsContent, { value: "overview", className: "text-sm text-muted-foreground" }, "Your Ghost site is running on the latest version."),
        h(UI.TabsContent, { value: "backups", className: "text-sm text-muted-foreground" }, "30 daily backups are available to restore."),
        h(UI.TabsContent, { value: "domain", className: "text-sm text-muted-foreground" }, "blog.yourngo.org — SSL active.")),
      h(UI.Tabs, { defaultValue: "all", variant: "underline" },
        h(UI.TabsList, null, h(UI.TabsTrigger, { value: "all" }, "All apps"), h(UI.TabsTrigger, { value: "fundraising" }, "Fundraising"), h(UI.TabsTrigger, { value: "communication" }, "Communication")),
        h(UI.TabsContent, { value: "all", className: "text-sm text-muted-foreground" }, "7 apps ready to deploy."),
        h(UI.TabsContent, { value: "fundraising", className: "text-sm text-muted-foreground" }, "FMS, WordPress"),
        h(UI.TabsContent, { value: "communication", className: "text-sm text-muted-foreground" }, "Listmonk, Ghost, Mattermost, Whatomate"))`),
  },
  Dialog: {
    card: 'group="Overlays" height=96 subtitle="Opens a modal form"',
    body: `h(UI.Dialog, null,
      h(UI.DialogTrigger, { asChild: true }, h(UI.Button, null, "Request an app")),
      h(UI.DialogContent, null,
        h(UI.DialogHeader, null, h(UI.DialogTitle, null, "Request an app"), h(UI.DialogDescription, null, "Tell us which open-source tool you need. We reply within two working days.")),
        h(UI.Field, { label: "App name", required: true }, h(UI.Input, { placeholder: "e.g. Nextcloud" })),
        h(UI.DialogFooter, null, h(UI.DialogClose, { asChild: true }, h(UI.Button, { variant: "ghost" }, "Cancel")), h(UI.Button, null, "Send request"))))`,
  },
  AppCard: {
    card: 'group="Idlistack patterns" height=260',
    body: wrap("grid gap-4 sm:grid-cols-3", `
      h(UI.AppCard, { name: "Listmonk", maker: "Kailash Nadh", description: "Self-hosted newsletter and mailing list manager for campaigns that reach every supporter.", logo: h("span", { className: "font-heading text-lg font-extrabold text-blush-600" }, "L"), category: "Communication", href: "#" }),
      h(UI.AppCard, { name: "Ghost", maker: "Ghost Foundation", description: "A modern publishing platform for your blog, newsletter and memberships.", logo: h("span", { className: "font-heading text-lg font-extrabold text-ink-900" }, "G"), category: "Websites", status: "beta", href: "#" }),
      h(UI.AppCard, { name: "Whatomate", maker: "T4GC", description: "Build WhatsApp chatbots to answer FAQs and collect information at scale.", logo: h("span", { className: "font-heading text-lg font-extrabold text-ink-900" }, "W"), category: "Communication", status: "coming-soon" })`),
  },
  StackCard: {
    card: 'group="Idlistack patterns" height=300',
    body: wrap("grid gap-4 sm:grid-cols-3", `
      h(UI.StackCard, { title: "Fundraising", description: "Run campaigns, track donors and issue receipts without the spreadsheet chaos.", icon: h("span", { className: "font-heading font-extrabold" }, "₹"), apps: ["FMS", "WordPress"], href: "#" }),
      h(UI.StackCard, { title: "Community engagement", description: "Host live Q&As, polls and discussions that keep your community close.", icon: h("span", { className: "font-heading font-extrabold" }, "◎"), apps: ["rForum", "Mattermost"], href: "#" }),
      h(UI.StackCard, { title: "Communication", description: "Reach supporters by email and WhatsApp from tools you own.", icon: h("span", { className: "font-heading font-extrabold" }, "✉"), apps: ["Listmonk", "Ghost", "Whatomate"], href: "#" })`),
  },
  Stepper: {
    card: 'group="Idlistack patterns" height=340',
    body: wrap("grid gap-10", `
      h(UI.Stepper, { current: 2, steps: [{ title: "Select an app", description: "Pick from the catalogue" }, { title: "Configure", description: "Domain and admin email" }, { title: "Deploy", description: "We set up the server" }, { title: "Start using", description: "Log in and go" }] }),
      h(UI.Stepper, { orientation: "vertical", current: 1, steps: [{ title: "Migration requested", description: "14 Oct, 10:12 AM" }, { title: "Switching DNS", description: "Usually under an hour" }, { title: "Live on Idlistack" }] })`),
  },
  Navbar: {
    card: 'group="Idlistack patterns" height=150',
    body: wrap("overflow-hidden rounded-xl border border-border", `
      h(UI.Navbar, { sticky: false,
        logo: h("a", { href: "#", className: "font-heading text-lg font-extrabold tracking-tight" }, "your", h("span", { className: "text-brand" }, "ngo")),
        links: [{ label: "Stacks", href: "#stacks", active: true }, { label: "Apps", href: "#apps" }, { label: "Pricing", href: "#pricing" }, { label: "Migrate", href: "#migrate" }],
        actions: h(React.Fragment, null, h(UI.Button, { variant: "outline", size: "sm" }, "Log in"), h(UI.Button, { size: "sm" }, "Get started")) }),
      h("div", { className: "h-12 bg-surface-muted" })`),
  },
  PricingCard: {
    card: 'group="Idlistack patterns" height=440 subtitle="Example prices"',
    body: wrap("grid items-start gap-6 pt-3 sm:grid-cols-3", `
      h(UI.PricingCard, { plan: "Starter", price: "₹0", period: "for 30 days", description: "Try any one app with full support.", features: ["1 app", "Idlistack subdomain", "Community support"], action: h(UI.Button, { variant: "outline" }, "Start free trial") }),
      h(UI.PricingCard, { highlighted: true, plan: "Organisation", price: "₹1,499", period: "per month", description: "Everything a growing team needs.", features: ["Up to 5 apps", "Custom domains & SSL", "Daily backups", "Email support"], action: h(UI.Button, null, "Get started") }),
      h(UI.PricingCard, { plan: "Network", price: "Custom", description: "For foundations supporting many grantees.", features: ["Unlimited apps", "Bulk onboarding", "Dedicated success manager"], action: h(UI.Button, { variant: "secondary" }, "Talk to us") })`),
  },
};

export function previewHtml(name, { card, body }) {
  return `<!-- @dsCard ${card} -->
<!doctype html>
<html>
<head><meta charset="utf-8"><title>${name} — preview</title></head>
<body class="bg-background p-4 text-foreground">
<div id="root"></div>
<script>
  var UI = window.IdliUI, h = React.createElement;
  ReactDOM.createRoot(document.getElementById("root")).render(${body.trim()});
</script>
</body>
</html>
`;
}
