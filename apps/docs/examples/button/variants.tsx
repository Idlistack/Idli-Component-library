import { Button } from "@idlistack/ui";

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Get started</Button>
      <Button variant="secondary">Explore stacks</Button>
      <Button variant="outline">Log in</Button>
      <Button variant="soft">Request an app</Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="link">Read the price philosophy</Button>
    </div>
  );
}
