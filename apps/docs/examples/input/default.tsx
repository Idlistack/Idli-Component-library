import { Input, Label, Textarea } from "@idlistack/ui";

export default function InputDefault() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <div className="grid gap-2">
        <Label htmlFor="org">Organisation name</Label>
        <Input id="org" placeholder="e.g. Pratham Education Foundation" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="domain">Domain</Label>
        <Input id="domain" placeholder="yourngo.org" disabled />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="need">What would you like to build?</Label>
        <Textarea id="need" placeholder="Tell us about your goals…" />
      </div>
    </div>
  );
}
