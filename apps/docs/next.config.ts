import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Every page is static, so production builds export plain files to out/,
  // served by Cloudflare Workers static assets (see wrangler.jsonc). The dev
  // server stays a normal server so the .md rewrites below work.
  ...(!isDev && { output: "export" as const }),
  // Example source files are read from disk at build time to render code snippets.
  outputFileTracingIncludes: { "/**": ["./examples/**/*"] },
  // Every docs page is also available as Markdown for AI agents: append .md to
  // its URL. Static exports don't support rewrites, so in production
  // scripts/copy-markdown.mjs writes the .md files into out/; these rewrites
  // give the dev server the same URLs.
  ...(isDev && {
    async rewrites() {
      return [
        { source: "/docs.md", destination: "/md/index" },
        { source: "/docs/components/:slug.md", destination: "/md/components/:slug" },
        { source: "/docs/foundations/:page.md", destination: "/md/foundations/:page" },
        { source: "/docs/:page.md", destination: "/md/:page" },
      ];
    },
  }),
};

export default nextConfig;
