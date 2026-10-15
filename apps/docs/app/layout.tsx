import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { InlineScript } from "@/components/inline-script";
import { SiteFooter } from "@/components/site-footer";
import { SITE_URL } from "@/lib/site";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--idli-font-body", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--idli-font-heading", display: "swap" });

const description =
  "Accessible React + Tailwind components and design tokens for building Idlistack products. Open-source made effortless.";

export const metadata: Metadata = {
  // Absolute URLs for social previews and canonical links need the public domain: set NEXT_PUBLIC_SITE_URL.
  ...(SITE_URL && { metadataBase: new URL(SITE_URL) }),
  title: { default: "Idli UI — Idlistack component library", template: "%s · Idli UI" },
  description,
  applicationName: "Idli UI",
  openGraph: {
    type: "website",
    siteName: "Idli UI",
    title: "Idli UI — Idlistack component library",
    description,
    ...(SITE_URL && { images: [{ url: "/og.png", width: 1200, height: 630, alt: "Idli UI, the Idlistack design system" }] }),
  },
  twitter: { card: "summary_large_image", title: "Idli UI — Idlistack component library", description, ...(SITE_URL && { images: ["/og.png"] }) },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1c" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* Applies the saved or system theme before first paint, so there is no flash. */}
        <InlineScript html={themeScript} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-lg bg-secondary px-4 py-2 text-secondary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
