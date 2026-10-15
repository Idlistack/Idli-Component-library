import { Stepper } from "@idlistack/ui";

export default function StepperVertical() {
  return (
    <Stepper
      orientation="vertical"
      current={2}
      steps={[
        { title: "Migration requested", description: "14 Oct, 10:12 AM" },
        { title: "Files and database copied", description: "14 Oct, 11:40 AM" },
        { title: "Switching DNS", description: "Usually takes under an hour" },
        { title: "Live on Idlistack" },
      ]}
    />
  );
}
