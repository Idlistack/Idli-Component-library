import { Button } from "@idlistack/ui";
import { ArrowRight, Rocket, Trash2 } from "lucide-react";

export default function ButtonStates() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <Rocket /> Deploy app
      </Button>
      <Button variant="outline">
        View all apps <ArrowRight />
      </Button>
      <Button loading>Deploying…</Button>
      <Button disabled>Unavailable</Button>
      <Button variant="danger">
        <Trash2 /> Delete site
      </Button>
    </div>
  );
}
