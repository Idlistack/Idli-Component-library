import { Button, Tooltip } from "@idlistack/ui";
import { Copy, Info, RefreshCw } from "lucide-react";

export default function TooltipDefault() {
  return (
    <div className="flex items-center gap-2">
      <Tooltip content="Copy site URL">
        <Button variant="outline" size="icon" aria-label="Copy site URL">
          <Copy />
        </Button>
      </Tooltip>
      <Tooltip content="Restart app">
        <Button variant="outline" size="icon" aria-label="Restart app">
          <RefreshCw />
        </Button>
      </Tooltip>
      <Tooltip content="Billed in INR. GST included." side="right">
        <button type="button" className="rounded-full p-1 text-muted-foreground hover:text-foreground" aria-label="Pricing details">
          <Info className="size-4" />
        </button>
      </Tooltip>
    </div>
  );
}
