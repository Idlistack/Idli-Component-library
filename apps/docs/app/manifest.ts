import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Idli UI — Idlistack design system",
    short_name: "Idli UI",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#d63079",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
