import type { MetadataRoute } from "next";
import { markdownKeys } from "@/lib/markdown";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Every HTML docs page. Sitemaps need absolute URLs, so this is empty until NEXT_PUBLIC_SITE_URL is set.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_URL) return [];
  const pages = ["", "/docs/brand-kit", "/docs/design-system", ...markdownKeys.map((k) => (k === "index" ? "/docs" : `/docs/${k}`))];
  return [...new Set(pages)].map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
