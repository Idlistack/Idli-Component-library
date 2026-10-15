import { Button, PricingCard } from "@idlistack/ui";

export default function PricingCardDefault() {
  return (
    <div className="grid w-full items-start gap-6 pt-3 md:grid-cols-3">
      <PricingCard
        plan="Starter"
        price="₹0"
        period="for 30 days"
        description="Try any one app with full support."
        features={["1 app", "Idlistack subdomain", "Community support"]}
        action={<Button variant="outline">Start free trial</Button>}
      />
      <PricingCard
        highlighted
        plan="Organisation"
        price="₹1,499"
        period="per month"
        description="Everything a growing team needs."
        features={["Up to 5 apps", "Custom domains & SSL", "Daily backups", "Email support"]}
        action={<Button>Get started</Button>}
      />
      <PricingCard
        plan="Network"
        price="Custom"
        description="For foundations supporting many grantees."
        features={["Unlimited apps", "Bulk onboarding", "Dedicated success manager"]}
        action={<Button variant="secondary">Talk to us</Button>}
      />
    </div>
  );
}
