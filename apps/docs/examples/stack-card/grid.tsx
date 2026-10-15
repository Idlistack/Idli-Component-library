import { StackCard } from "@idlistack/ui";
import { HandHeart, Megaphone, Users } from "lucide-react";

export default function StackCardGrid() {
  return (
    <div className="grid w-full gap-4 md:grid-cols-3">
      <StackCard
        title="Fundraising"
        description="Run campaigns, track donors and issue receipts without the spreadsheet chaos."
        icon={<HandHeart />}
        apps={["FMS", "WordPress"]}
        href="#"
      />
      <StackCard
        title="Community engagement"
        description="Host live Q&As, polls and discussions that keep your community close."
        icon={<Users />}
        apps={["rForum", "Mattermost"]}
        href="#"
      />
      <StackCard
        title="Communication"
        description="Reach supporters by email and WhatsApp from tools you own."
        icon={<Megaphone />}
        apps={["Listmonk", "Ghost", "Whatomate"]}
        href="#"
      />
    </div>
  );
}
