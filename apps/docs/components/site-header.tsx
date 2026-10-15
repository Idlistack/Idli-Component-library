"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Navbar } from "@idlistack/ui";
import { GithubIcon } from "./github-icon";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { REPO_URL } from "@/lib/site";

const links = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components/button", match: "/docs/components" },
  { label: "Design system", href: "/docs/design-system" },
  { label: "Brand kit", href: "/docs/brand-kit" },
];

/** The site header, built from the library's own Navbar (which brings the phone menu). */
export function SiteHeader() {
  const pathname = usePathname();
  return (
    <Navbar
      logo={<Logo />}
      linkAs={Link}
      links={links.map(({ label, href, match }) => ({
        label,
        href,
        active: match ? pathname.startsWith(match) : href === "/docs" ? pathname === "/docs" : pathname === href,
      }))}
      actions={
        <>
          <Button variant="ghost" size="icon" asChild>
            <a href={REPO_URL} aria-label="GitHub repository">
              <GithubIcon />
            </a>
          </Button>
          <ThemeToggle />
        </>
      }
    />
  );
}
