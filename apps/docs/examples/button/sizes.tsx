import { Button } from "@idlistack/ui";
import { Plus } from "lucide-react";

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" variant="outline" aria-label="Add app">
        <Plus />
      </Button>
    </div>
  );
}
