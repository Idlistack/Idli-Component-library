import Link from "next/link";
import { Accessibility, ArrowRight, Feather, Mail, Moon, Rocket, Smartphone } from "lucide-react";
import {
  Alert,
  AppCard,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  Field,
  Input,
  Label,
  Stepper,
  Switch,
} from "@idlistack/ui";
import { CodeBlock } from "@/components/code-block";
import { registry } from "@/lib/registry";

const highlights = [
  { icon: Accessibility, title: "Accessible by default", body: "WCAG 2.2 AA contrast, full keyboard support and screen reader semantics via Radix." },
  { icon: Moon, title: "Light and dark", body: "Semantic tokens flip the whole system with one class. No separate dark components." },
  { icon: Smartphone, title: "Built for real devices", body: "Mobile-first, tree-shakable and light enough for budget phones on slow networks." },
  { icon: Feather, title: "Plain-spoken", body: "Patterns and copy guidance that keep the tech out of the way." },
];

export default function Home() {
  return (
    <main id="main">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_85%_0%,var(--color-primary-soft),transparent_70%)]"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_1fr] lg:px-8">
          <div>
            <Badge tone="brand" dot>
              v0.1 · {registry.length} components
            </Badge>
            <h1 className="mt-6 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-[3.5rem]">
              The building blocks of <span className="text-brand">Idlistack.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Idli UI is a React and Tailwind design system for tools that help organisations focus on impact, not
              infrastructure. It's warm, accessible and simple, like a good idli.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/docs/installation">
                  Get started <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs/components/button">Browse components</Link>
              </Button>
            </div>
            <CodeBlock lang="bash" code="npm install @idlistack/ui" className="mt-8 max-w-sm" />
          </div>

          {/* Live composition */}
          <div className="relative grid gap-4 sm:grid-cols-2">
            <Card className="p-5 sm:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <p className="font-heading font-bold">Deploy Listmonk</p>
                <Badge tone="warning" dot size="sm">
                  In progress
                </Badge>
              </div>
              <Stepper
                current={2}
                steps={[{ title: "Select app" }, { title: "Configure" }, { title: "Deploy" }, { title: "Go live" }]}
              />
            </Card>
            <AppCard
              name="Listmonk"
              maker="Kailash Nadh"
              description="Newsletters and mailing lists that reach every supporter."
              logo={<Mail className="text-blush-600" />}
              category="Communication"
            />
            <Card className="gap-4 p-5">
              <Field label="Subdomain" hint="mail.yourngo.org">
                <Input defaultValue="mail" />
              </Field>
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="hero-backups">Daily backups</Label>
                <Switch id="hero-backups" defaultChecked />
              </div>
              <Button className="mt-auto w-full">
                <Rocket /> Deploy
              </Button>
            </Card>
            <Alert tone="success" title="Ghost is live at blog.yourngo.org" className="sm:col-span-2">
              <span className="flex items-center justify-between gap-3">
                Your team has been invited.
                <AvatarGroup>
                  <Avatar name="Asha Rao" size="xs" />
                  <Avatar name="Rahul Menon" size="xs" />
                  <Avatar name="Fatima Shaikh" size="xs" />
                </AvatarGroup>
              </span>
            </Alert>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
          Just the right components, <span className="text-brand">ready to work.</span>
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.title}>
              <div className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary-strong">
                <h.icon className="size-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.body}</p>
            </div>
          ))}
        </div>
        <Link
          href="/docs/principles"
          className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-strong hover:underline"
        >
          Read the design principles <ArrowRight className="size-4" aria-hidden />
        </Link>
      </section>

      {/* Component index */}
      <section className="border-t border-border bg-surface-muted/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          {(["Components", "Patterns"] as const).map((group) => (
            <div key={group} className="mb-14 last:mb-0">
              <div className="mb-6 flex items-baseline justify-between gap-4">
                <h2 className="text-2xl font-bold">{group === "Patterns" ? "Idlistack patterns" : "Core components"}</h2>
                <span className="text-sm text-muted-foreground">
                  {registry.filter((c) => c.group === group).length} {group.toLowerCase()}
                </span>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {registry
                  .filter((c) => c.group === group)
                  .map((c) => (
                    <li key={c.slug}>
                      <Card interactive className="relative h-full p-4">
                        <h3 className="flex items-center justify-between font-heading text-[15px] font-bold">
                          <Link href={`/docs/components/${c.slug}`} className="after:absolute after:inset-0">
                            {c.name}
                          </Link>
                          <ArrowRight className="size-4 text-subtle-foreground" aria-hidden />
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
                          {c.description}
                        </p>
                      </Card>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
