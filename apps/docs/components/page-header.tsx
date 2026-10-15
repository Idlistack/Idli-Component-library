import { Badge } from "@idlistack/ui";

export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="mb-10 border-b border-border pb-8">
      {eyebrow && (
        <Badge tone="brand" size="sm" className="mb-4">
          {eyebrow}
        </Badge>
      )}
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
      {children && <div className="mt-3 text-lg leading-relaxed text-muted-foreground">{children}</div>}
    </header>
  );
}
