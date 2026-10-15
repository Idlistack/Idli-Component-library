import * as React from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const avatarVariants = cva(
  "relative inline-flex shrink-0 overflow-hidden bg-blush-100 font-heading font-bold text-blush-800 ring-2 ring-background",
  {
    variants: {
      size: { xs: "size-6 text-[10px]", sm: "size-8 text-xs", md: "size-10 text-sm", lg: "size-14 text-lg" },
      shape: { circle: "rounded-full", square: "rounded-xl" },
    },
    defaultVariants: { size: "md", shape: "circle" },
  },
);

export interface AvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  /** Person or organisation name. Used for alt text and the initials fallback. */
  name: string;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

export function Avatar({ src, name, size, shape, className, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root data-slot="avatar" className={cn(avatarVariants({ size, shape }), className)} {...props}>
      {src && <AvatarPrimitive.Image src={src} alt={name} className="size-full object-cover" />}
      <AvatarPrimitive.Fallback className="grid size-full place-items-center" delayMs={src ? 400 : 0}>
        <span aria-hidden>{initials(name)}</span>
        <span className="sr-only">{name}</span>
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

export function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="avatar-group" className={cn("flex -space-x-1.5", className)} {...props} />;
}
