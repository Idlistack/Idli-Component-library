import Link from "next/link";
import { cn } from "@idlistack/ui/utils";

/** Idlistack wordmark with the "UI" suffix. The PNG is inverted (hue preserved) in dark mode. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/idlistack-logo.png"
        alt="Idlistack"
        width={882}
        height={186}
        className="h-[22px] w-auto dark:[filter:invert(1)_hue-rotate(180deg)]"
      />
      <span className="rounded-md bg-primary-soft px-1.5 py-0.5 font-heading text-xs font-extrabold tracking-wide text-primary-strong">
        UI
      </span>
    </Link>
  );
}
