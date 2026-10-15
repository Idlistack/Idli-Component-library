import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Example source files are read from disk at build time to render code snippets.
  outputFileTracingIncludes: { "/**": ["./examples/**/*"] },
  // Every docs page is also available as Markdown for AI agents: append .md to its URL.
  async rewrites() {
    return [
      { source: "/docs.md", destination: "/md/index" },
      { source: "/docs/components/:slug.md", destination: "/md/components/:slug" },
      { source: "/docs/foundations/:page.md", destination: "/md/foundations/:page" },
      { source: "/docs/:page.md", destination: "/md/:page" },
    ];
  },
};

export default nextConfig;
