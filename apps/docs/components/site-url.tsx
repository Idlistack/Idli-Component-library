"use client";

import { useEffect, useState } from "react";
import { SITE_URL } from "@/lib/site";

/**
 * The current site's origin. The docs are a static export, so the host isn't
 * known at build time: this starts from NEXT_PUBLIC_SITE_URL (or nothing) and
 * switches to window.location.origin once mounted, so it always shows the
 * domain the page is actually served from.
 */
export function useSiteOrigin() {
  const [origin, setOrigin] = useState(SITE_URL);
  useEffect(() => setOrigin(window.location.origin), []);
  return origin;
}

/** Renders `path` as an absolute URL on the current site. */
export function SiteUrl({ path }: { path: string }) {
  return <>{useSiteOrigin() + path}</>;
}
