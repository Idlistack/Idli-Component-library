import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Example source files are read from disk at build time to render code snippets.
  outputFileTracingIncludes: { "/**": ["./examples/**/*"] },
};

export default nextConfig;
