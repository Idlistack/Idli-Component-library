import { Label, RadioGroup, RadioGroupItem } from "@idlistack/ui";

export default function RadioGroupDefault() {
  return (
    <RadioGroup defaultValue="monthly" aria-label="Billing cycle">
      {[
        { value: "monthly", label: "Monthly", hint: "Pay as you go" },
        { value: "yearly", label: "Yearly", hint: "Two months free" },
      ].map((option) => (
        <div key={option.value} className="flex items-start gap-3">
          <RadioGroupItem id={option.value} value={option.value} className="mt-0.5" />
          <Label htmlFor={option.value} className="grid gap-1 font-normal">
            <span className="font-medium">{option.label}</span>
            <span className="text-xs text-muted-foreground">{option.hint}</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
