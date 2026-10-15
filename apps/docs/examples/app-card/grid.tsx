import { AppCard } from "@idlistack/ui";
import { Mail, MessageCircle, Newspaper } from "lucide-react";

export default function AppCardGrid() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AppCard
        name="Listmonk"
        maker="Kailash Nadh"
        description="Self-hosted newsletter and mailing list manager for campaigns that reach every supporter."
        logo={<Mail className="text-blush-600" />}
        category="Communication"
        href="#"
      />
      <AppCard
        name="Ghost"
        maker="Ghost Foundation"
        description="A modern publishing platform for your blog, newsletter and paid memberships."
        logo={<Newspaper className="text-ink-900" />}
        category="Websites"
        status="beta"
        href="#"
      />
      <AppCard
        name="Whatomate"
        maker="T4GC"
        description="Build WhatsApp chatbots to answer FAQs and collect information at scale."
        logo={<MessageCircle className="text-emerald-600" />}
        category="Communication"
        status="coming-soon"
      />
    </div>
  );
}
