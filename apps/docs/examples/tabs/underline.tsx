import { Tabs, TabsContent, TabsList, TabsTrigger } from "@idlistack/ui";

export default function TabsUnderline() {
  return (
    <Tabs defaultValue="all" variant="underline" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="all">All apps</TabsTrigger>
        <TabsTrigger value="fundraising">Fundraising</TabsTrigger>
        <TabsTrigger value="communication">Communication</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="text-sm text-muted-foreground">7 apps ready to deploy.</TabsContent>
      <TabsContent value="fundraising" className="text-sm text-muted-foreground">FMS, WordPress</TabsContent>
      <TabsContent value="communication" className="text-sm text-muted-foreground">
        Listmonk, Ghost, Mattermost, Whatomate
      </TabsContent>
    </Tabs>
  );
}
