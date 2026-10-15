import { Alert, Button } from "@idlistack/ui";

export default function AlertTones() {
  return (
    <div className="grid w-full max-w-xl gap-3">
      <Alert tone="brand" title="Your app is live">
        Listmonk is ready at <strong>mail.yourngo.org</strong>. Credentials are on their way to your inbox.
      </Alert>
      <Alert tone="info" title="Scheduled maintenance">
        WordPress will update to 6.8 on Sunday at 2:00 AM IST. No action needed.
      </Alert>
      <Alert tone="success" title="Backup restored" />
      <Alert
        tone="warning"
        title="Storage almost full"
        actions={
          <Button size="sm" variant="outline">
            Upgrade storage
          </Button>
        }
      >
        You have used 9.2 GB of 10 GB.
      </Alert>
      <Alert tone="danger" title="Deployment failed">
        We couldn&apos;t verify your domain&apos;s DNS records. Check them and try again.
      </Alert>
    </div>
  );
}
