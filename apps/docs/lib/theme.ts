export const THEME_STORAGE_KEY = "idli-theme";

/** True when the saved theme, or the system preference if none is saved, is dark. */
export function prefersDark() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
}

// Same logic as prefersDark(), inlined so it runs before first paint.
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;
