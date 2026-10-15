import { Tabs, TabsContent, TabsList, TabsTrigger } from "@idlistack/ui";

export default function TabsDefault() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="backups">Backups</TabsTrigger>
        <TabsTrigger value="domain">Domain</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="text-sm text-muted-foreground">
        Your Ghost site is running on the latest version.
      </TabsContent>
      <TabsContent value="backups" className="text-sm text-muted-foreground">
        30 daily backups are available to restore.
      </TabsContent>
      <TabsContent value="domain" className="text-sm text-muted-foreground">
        blog.yourngo.org — SSL active, renews automatically.
      </TabsContent>
    </Tabs>
  );
}
