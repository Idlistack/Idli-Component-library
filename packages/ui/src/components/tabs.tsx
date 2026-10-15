import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn, focusRing } from "../lib/cn";

type TabsVariant = "pill" | "underline";
const TabsVariantContext = React.createContext<TabsVariant>("pill");

export interface TabsProps extends React.ComponentProps<typeof TabsPrimitive.Root> {
  /** `pill` for in-page switches, `underline` for section-level navigation. */
  variant?: TabsVariant;
}

export function Tabs({ className, variant = "pill", ...props }: TabsProps) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.Root data-slot="tabs" className={cn("grid gap-4", className)} {...props} />
    </TabsVariantContext.Provider>
  );
}

export function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  const variant = React.useContext(TabsVariantContext);
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex w-fit items-center",
        variant === "pill" && "gap-1 rounded-xl bg-surface-muted p-1",
        variant === "underline" && "w-full gap-6 border-b border-border",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const variant = React.useContext(TabsVariantContext);
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center gap-2 text-sm font-medium whitespace-nowrap text-muted-foreground",
        "transition-[color,background-color,box-shadow,border-color] duration-150 hover:text-foreground",
        "disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
        variant === "pill" &&
          "h-8 rounded-lg px-3 data-[state=active]:bg-surface data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        variant === "underline" &&
          "-mb-px h-10 border-b-2 border-transparent px-0.5 data-[state=active]:border-primary data-[state=active]:text-foreground",
        focusRing,
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("rounded-lg", focusRing, className)} {...props} />;
}
