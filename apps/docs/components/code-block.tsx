import { cn } from "@idlistack/ui/utils";
import { highlight } from "@/lib/highlight";
import { CopyButton } from "./copy-button";

export async function CodeBlock({
  code,
  lang = "tsx",
  title,
  className,
}: {
  code: string;
  lang?: "tsx" | "bash" | "css";
  title?: string;
  className?: string;
}) {
  const html = await highlight(code.trim(), lang);
  return (
    <div className={cn("group relative overflow-hidden rounded-xl border border-border bg-sand-50 dark:bg-ink-950", className)}>
      {title && (
        <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-xs text-muted-foreground">
          {title}
        </div>
      )}
      <div className="absolute top-1.5 right-1.5 z-10 rounded-lg bg-sand-50 dark:bg-ink-950">
        <CopyButton value={code.trim()} />
      </div>
      <div
        className="overflow-x-auto p-4 pr-12 font-mono text-[13px] leading-6 [&_pre]:outline-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
