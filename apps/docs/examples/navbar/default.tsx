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
