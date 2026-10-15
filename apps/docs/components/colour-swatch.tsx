import { cn } from "@idlistack/ui/utils";
import { CopyColour } from "./copy-colour";

/** A brand colour card. Clicking the coloured block copies its HEX code; the values below are plain text. */
export function ColourSwatch({ name, hex, rgb, use, dark }: { name: string; hex: string; rgb: string; use: string; dark: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <CopyColour
        value={hex}
        name={name}
        className={cn("flex h-28 w-full items-end p-4 font-heading text-lg font-bold", dark ? "text-white" : "text-ink-900")}
      >
        {name}
      </CopyColour>
      <dl className="grid gap-1.5 p-4 font-mono text-[13px]">
        <div className="flex gap-2">
          <dt className="w-9 text-subtle-foreground">HEX</dt>
          <dd className="select-all">{hex.toUpperCase()}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-9 text-subtle-foreground">RGB</dt>
          <dd className="select-all">rgb({rgb})</dd>
        </div>
      </dl>
      <p className="-mt-2 px-4 pb-4 text-xs leading-relaxed text-muted-foreground">{use}</p>
    </div>
  );
}
