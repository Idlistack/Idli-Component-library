import type { Metadata } from "next";
import { Alert } from "@idlistack/ui";
import { CodeBlock } from "@/components/code-block";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = { title: "Installation" };

export default function Installation() {
  return (
    <>
      <PageHeader eyebrow="Getting started" title="Installation">
        Idli UI works in any React 19 app that uses Tailwind CSS v4. Next.js is the reference setup.
      </PageHeader>
      <div className="prose-idli">
        <h2>1. Install the package</h2>
        <p>The package is published from this monorepo as <code>@idlistack/ui</code>.</p>
      </div>
      <CodeBlock lang="bash" code={`npm install @idlistack/ui`} />
      <div className="prose-idli">
        <h2>2. Import the theme</h2>
        <p>
          Add the theme after Tailwind in your global stylesheet. It registers the colour, type and motion tokens,
          sets up dark mode, and tells Tailwind to scan the components for classes.
        </p>
      </div>
      <CodeBlock
        lang="css"
        title="app/globals.css"
        code={`@import "tailwindcss";
@import "@idlistack/ui/theme.css";`}
      />
      <div className="prose-idli">
        <h2>3. Load the fonts</h2>
        <p>
          Headings use <strong>Manrope</strong> and body text uses <strong>Inter</strong>. Point the
          <code>--idli-font-heading</code> and <code>--idli-font-body</code> variables at your loaded fonts. With
          Next.js:
        </p>
      </div>
      <CodeBlock
        title="app/layout.tsx"
        code={`import { Inter, Manrope } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--idli-font-body" });
const manrope = Manrope({ subsets: ["latin"], variable: "--idli-font-heading" });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={\`\${inter.variable} \${manrope.variable}\`}>
      <body>{children}</body>
    </html>
  );
}`}
      />
      <div className="prose-idli">
        <h2>4. Use a component</h2>
      </div>
      <CodeBlock
        code={`import { Button } from "@idlistack/ui";

export default function Page() {
  return <Button>Get started</Button>;
}`}
      />
      <div className="prose-idli">
        <h2>Dark mode</h2>
        <p>
          Add the <code>dark</code> class (or <code>data-theme="dark"</code>) to <code>&lt;html&gt;</code> or any
          container. Every component and token switches automatically; there are no separate dark components.
        </p>
      </div>
      <Alert tone="info" title="Server Components" className="mt-8">
        The package is marked <code className="font-mono">&quot;use client&quot;</code>, so you can import components
        directly into Server Components.
      </Alert>
    </>
  );
}
