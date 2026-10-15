import { Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@idlistack/ui";

export default function CardDefault() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>donate.yourngo.org</CardTitle>
          <Badge tone="success" dot size="sm">
            Running
          </Badge>
        </div>
        <CardDescription>WordPress · Mumbai region · Last backup 2 hours ago</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Visitors this month</dt>
            <dd className="mt-1 font-heading text-2xl font-bold">12,480</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Uptime</dt>
            <dd className="mt-1 font-heading text-2xl font-bold">99.98%</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter>
        <Button size="sm">Open dashboard</Button>
        <Button size="sm" variant="ghost">
          Settings
        </Button>
      </CardFooter>
    </Card>
  );
}
