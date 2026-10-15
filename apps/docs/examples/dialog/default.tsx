import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
} from "@idlistack/ui";

export default function DialogDefault() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Request an app</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request an app</DialogTitle>
          <DialogDescription>
            Tell us which open-source tool you need. We review every request and reply within two working days.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Field label="App name" required>
            <Input placeholder="e.g. Nextcloud" />
          </Field>
          <Field label="How will your team use it?" hint="Optional, but it helps us prioritise.">
            <Input placeholder="File sharing with field staff" />
          </Field>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button>Send request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
