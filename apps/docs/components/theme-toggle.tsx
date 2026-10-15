"use client";

import { useLayoutEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button, Tooltip } from "@idlistack/ui";
import { prefersDark, THEME_STORAGE_KEY } from "@/lib/theme";

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  // The inline script in the root layout sets the theme before paint. In
  // development, Strict Mode's remount resets <html> attributes and clears the
  // class, so re-apply it here. This is a no-op in production.
  useLayoutEffect(() => {
    const isDark = prefersDark();
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
    } catch {}
  }

  const label = dark ? "Switch to light theme" : "Switch to dark theme";
  return (
    <Tooltip content={label}>
      <Button variant="ghost" size="icon" onClick={toggle} aria-label={label}>
        {dark ? <Sun /> : <Moon />}
      </Button>
    </Tooltip>
  );
}
