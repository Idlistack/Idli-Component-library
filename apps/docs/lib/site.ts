export const REPO_URL = "https://github.com/Idlistack/Idli-Component-library";

/** Public origin of the docs site, used for absolute links in llms.txt. Set NEXT_PUBLIC_SITE_URL in production. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3005").replace(/\/$/, "");
