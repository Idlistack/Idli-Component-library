import { Field, Input } from "@idlistack/ui";

export default function FieldDefault() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <Field label="Work email" hint="We'll send your deployment credentials here." required>
        <Input type="email" placeholder="you@yourngo.org" />
      </Field>
      <Field label="Subdomain" error="This subdomain is already taken. Try another.">
        <Input defaultValue="donate" />
      </Field>
    </div>
  );
}
