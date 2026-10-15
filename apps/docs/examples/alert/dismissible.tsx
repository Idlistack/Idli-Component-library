"use client";

import { useState } from "react";
import { Alert, Button } from "@idlistack/ui";

export default function AlertDismissible() {
  const [open, setOpen] = useState(true);
  if (!open) {
    return (
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Show alert again
      </Button>
    );
  }
  return (
    <Alert tone="brand" title="New: WhatsApp chatbots with Whatomate" onDismiss={() => setOpen(false)} className="max-w-xl">
      Reach supporters where they already are. Deploy it from the Communication stack.
    </Alert>
  );
}
