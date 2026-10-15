export const REPO_URL = "https://github.com/Idlistack/Idli-Component-library";

/**
 * Public origin of the docs site, e.g. "https://idli-ui.example.workers.dev".
 * Optional: set NEXT_PUBLIC_SITE_URL at build time to make links in llms.txt
 * and the .md pages absolute. Left empty, they are root-relative ("/llms.txt"),
 * which resolve correctly wherever the static site is hosted. Pages shown to
 * people use the live origin from the browser instead (see SiteUrl).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
