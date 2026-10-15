/**
 * An inline script that runs during HTML parsing on full page loads.
 * It renders as `text/plain` on the client so React doesn't warn about
 * rendering a <script>; `suppressHydrationWarning` covers the type mismatch.
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
