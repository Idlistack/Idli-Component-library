"use client";

/**
 * An inline script that runs during HTML parsing on full page loads.
 *
 * This must be a Client Component: React only warns about <script> when the
 * browser creates the element itself (e.g. after a hydration mismatch forces a
 * client re-render), and it skips that warning for non-JavaScript types. So the
 * server renders `text/javascript` (runs before paint) and any client render
 * produces an inert `text/plain`. `suppressHydrationWarning` covers the mismatch.
 * See node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
