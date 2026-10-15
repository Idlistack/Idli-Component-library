import { Label, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@idlistack/ui";

export default function SelectDefault() {
  return (
    <div className="grid w-full max-w-xs gap-2">
      <Label htmlFor="stack">Stack</Label>
      <Select>
        <SelectTrigger id="stack">
          <SelectValue placeholder="Choose a stack" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Stacks</SelectLabel>
            <SelectItem value="fundraising">Fundraising</SelectItem>
            <SelectItem value="community">Community engagement</SelectItem>
            <SelectItem value="communication">Communication</SelectItem>
            <SelectItem value="websites">Websites</SelectItem>
            <SelectItem value="custom" disabled>
              Custom apps (coming soon)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
