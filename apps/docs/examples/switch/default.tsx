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
