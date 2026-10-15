import { buildDesignTokens } from "@/lib/design-tokens";

// The design tokens as JSON (the Design System artifact's tokens.json format).
export const dynamic = "force-static";

export function GET() {
  return new Response(JSON.stringify(buildDesignTokens(), null, 2), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
