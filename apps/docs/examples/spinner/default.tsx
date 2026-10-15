import { Spinner } from "@idlistack/ui";

export default function SpinnerDefault() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-4 text-muted-foreground" />
      <Spinner className="text-primary" />
      <Spinner className="size-8 text-foreground" label="Deploying your app" />
    </div>
  );
}
