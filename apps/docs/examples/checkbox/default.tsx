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
