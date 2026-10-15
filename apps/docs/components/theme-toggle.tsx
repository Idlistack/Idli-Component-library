"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button, Tooltip } from "@idlistack/ui";

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("idli-theme", next ? "dark" : "light");
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
