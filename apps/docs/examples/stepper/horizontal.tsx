"use client";

import { useState } from "react";
import { Button, Stepper } from "@idlistack/ui";

const steps = [
  { title: "Select an app", description: "Pick from the catalogue" },
  { title: "Configure", description: "Domain and admin email" },
  { title: "Deploy", description: "We set up the server" },
  { title: "Start using", description: "Log in and go" },
];

export default function StepperHorizontal() {
  const [current, setCurrent] = useState(1);
  return (
    <div className="grid w-full max-w-2xl gap-8">
      <Stepper steps={steps} current={current} />
      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}>
          Back
        </Button>
        <Button size="sm" onClick={() => setCurrent((c) => Math.min(steps.length, c + 1))} disabled={current === steps.length}>
          Next step
        </Button>
      </div>
    </div>
  );
}
