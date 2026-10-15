import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Download, X } from "lucide-react";
import { Badge, Button } from "@idlistack/ui";
import { ColourSwatch } from "@/components/colour-swatch";
import { PageHeader } from "@/components/page-header";
import { brandColours, brandFonts, logoFiles, rgb, taglines } from "@/lib/brand-kit";
import { contrast } from "@/lib/contrast";

export const metadata: Metadata = {
  title: "Brand kit",
  description: "Idlistack logos, colours, fonts and voice, ready to download.",
};

const kitContents = [
  "Wordmark in black and white (PNG)",
  "Heart mark (SVG)",
  "Brand colours as HEX, RGB and CSS",
  "All design tokens (JSON)",
  "Fonts, logo rules and taglines (README)",
];

function SectionTitle({ id, children, lead }: { id: string; children: React.ReactNode; lead?: string }) {
  return (
    <div className="mb-6">
      <h2 id={id} className="scroll-mt-24 text-2xl font-bold">
        {children}
      </h2>
      {lead && <p className="mt-2 text-muted-foreground">{lead}</p>}
    </div>
  );
}

/** The logo used in the don't examples. */
function Mark({ className, style }: { className?: string; style?: React.CSSProperties }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/idlistack-logo.png" alt="" className={className ?? "h-7 w-auto"} style={style} />;
}

const donts = [
  { label: "Don’t stretch or squash it", ground: "bg-white", mark: <Mark style={{ transform: "scaleX(1.45)" }} /> },
  { label: "Don’t recolour it", ground: "bg-white", mark: <Mark style={{ filter: "hue-rotate(150deg) saturate(2)" }} /> },
  { label: "Don’t place it on pink", ground: "bg-blush-600", mark: <Mark /> },
  { label: "Don’t add shadows or effects", ground: "bg-white", mark: <Mark style={{ filter: "drop-shadow(3px 4px 2px rgb(15 23 42 / .55))" }} /> },
];

export default function BrandKitPage() {
  return (
    <>
      <PageHeader eyebrow="Getting started" title="Brand kit">
        Everything you need to present Idlistack: logos, colours, fonts and voice. Download it all in one file, or take
        just what you need below.
      </PageHeader>

      <div className="flex flex-col gap-5 rounded-2xl border border-brand/25 bg-primary-soft p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-lg font-bold">Idlistack brand kit</p>
          <ul className="mt-2 grid gap-1 text-sm text-muted-foreground sm:grid-cols-2 sm:gap-x-6">
            {kitContents.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <Check className="size-3.5 shrink-0 text-primary-strong" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <Button size="lg" asChild className="shrink-0">
          <a href="/idlistack-brand-kit.zip" download>
            <Download /> Download .zip
          </a>
        </Button>
      </div>

      <section aria-labelledby="kit-logos" className="mt-14">
        <SectionTitle id="kit-logos" lead="Use the original files. Pick the wordmark that contrasts with the background.">
          Logos
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-3">
          {logoFiles.map((logo) => (
            <figure key={logo.file} className="overflow-hidden rounded-2xl border border-border">
              <div className={`grid h-36 place-items-center p-6 ${logo.ground === "dark" ? "bg-ink-950" : "bg-white"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/brand/${logo.file}`} alt={`Idlistack ${logo.title.toLowerCase()}`} className={logo.wide ? "h-8 w-auto max-w-full" : "h-16 w-auto"} />
              </div>
              <figcaption className="grid gap-3 border-t border-border p-4">
                <div>
                  <p className="text-sm font-medium">{logo.title}</p>
                  <p className="text-xs text-muted-foreground">{logo.note}</p>
                </div>
                <a
                  href={`/brand/${logo.file}`}
                  download
                  className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary-strong hover:underline"
                >
                  <Download className="size-4" aria-hidden /> {logo.file.endsWith(".svg") ? "SVG" : "PNG"}
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section aria-labelledby="kit-usage" className="mt-14">
        <SectionTitle id="kit-usage" lead="Give the logo room, keep it legible, and never alter it.">
          Logo usage
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border p-6">
            <p className="text-sm font-semibold">Clear space</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep a margin at least the height of the heart “a” on every side. Nothing else goes inside it.
            </p>
            <div className="mt-5 grid place-items-center rounded-xl bg-white p-8">
              <div className="relative rounded-sm outline-2 outline-offset-[18px] outline-blush-400 outline-dashed">
                <Mark className="h-9 w-auto" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border p-6">
            <p className="text-sm font-semibold">Minimum size</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Wordmark at least 22px tall on screen (12mm in print). Below that, use the heart mark, down to 16px.
            </p>
            <div className="mt-5 flex items-end justify-center gap-8 rounded-xl bg-white p-8">
              <div className="grid justify-items-center gap-2">
                <Mark className="h-[22px] w-auto" />
                <span className="font-mono text-[11px] text-ink-500">22px</span>
              </div>
              <div className="grid justify-items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/idlistack-icon.svg" alt="" className="size-4" />
                <span className="font-mono text-[11px] text-ink-500">16px</span>
              </div>
            </div>
          </div>
        </div>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {donts.map((d) => (
            <li key={d.label} className="overflow-hidden rounded-2xl border border-danger/25">
              <div className={`grid h-24 place-items-center overflow-hidden p-4 ${d.ground}`} aria-hidden>
                {d.mark}
              </div>
              <p className="flex items-center gap-2 border-t border-danger/25 bg-danger-soft px-4 py-2.5 text-sm font-medium text-danger">
                <X className="size-4 shrink-0" aria-hidden /> {d.label}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="kit-colours" className="mt-14">
        <SectionTitle id="kit-colours" lead="Click a value to copy it. Pink leads; warm neutrals carry the page.">
          Colours
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brandColours.map((c) => (
            <ColourSwatch
              key={c.token}
              name={c.name}
              hex={c.hex}
              rgb={rgb(c.hex)}
              use={c.use}
              dark={contrast("#ffffff", c.hex) >= contrast("#0f172a", c.hex)}
            />
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Building a product? Use the semantic tokens on the{" "}
          <Link href="/docs/design-system#ds-colour" className="font-medium text-primary-strong hover:underline">
            design system
          </Link>{" "}
          page instead of these raw values.
        </p>
      </section>

      <section aria-labelledby="kit-type" className="mt-14">
        <SectionTitle id="kit-type" lead="Both are free and open source on Google Fonts.">
          Fonts
        </SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          {brandFonts.map((f) => (
            <div key={f.family} className="flex flex-col rounded-2xl border border-border p-6">
              <p className={`text-6xl font-extrabold ${f.family === "Manrope" ? "font-heading" : "font-sans font-semibold"}`} aria-hidden>
                Aa
              </p>
              <p className={`mt-4 text-2xl ${f.family === "Manrope" ? "font-heading font-bold" : "font-sans font-medium"}`}>
                {f.family === "Manrope" ? "Just the right tools" : "We handle setup, updates and hosting."}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <div>
                  <p className="text-sm font-semibold">
                    {f.family} <Badge size="sm" className="ml-1">{f.role}</Badge>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Weights {f.weights}</p>
                </div>
                <a href={f.url} className="inline-flex items-center gap-1 text-sm font-medium text-primary-strong hover:underline">
                  Get {f.family} <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="kit-voice" className="mt-14">
        <SectionTitle id="kit-voice" lead="Short, warm and plain. Lead with what people get, not how it works.">
          Voice and taglines
        </SectionTitle>
        <ul className="grid gap-3 sm:grid-cols-2">
          {taglines.map((t, i) => (
            <li key={t} className="rounded-2xl border border-border bg-surface p-6">
              <p className="font-heading text-xl leading-snug font-extrabold tracking-tight">
                {i === 0 ? (
                  <>
                    Open-source made <span className="text-brand">effortless.</span>
                  </>
                ) : (
                  t
                )}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          The full writing guide is in the{" "}
          <Link href="/docs/design-system#writing" className="font-medium text-primary-strong hover:underline">
            brand book
          </Link>
          .
        </p>
      </section>

      <section aria-labelledby="kit-use" className="mt-14">
        <SectionTitle id="kit-use" lead="How the pieces come together on a social post and an event banner.">
          In use
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-[1fr_1.6fr]">
          <div className="relative flex aspect-square flex-col justify-between overflow-hidden rounded-2xl border border-border bg-ink-950 p-7 text-white">
            <span className="absolute -top-12 -right-12 size-36 rounded-full bg-blush-600" aria-hidden />
            <span className="absolute top-20 right-6 size-8 rounded-full bg-blush-200" aria-hidden />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/idlistack-logo-white.png" alt="Idlistack" className="relative h-6 w-fit" />
            <p className="relative max-w-[11ch] font-heading text-3xl leading-tight font-extrabold tracking-tight">
              Your newsletter, <span className="text-blush-400">live in a day.</span>
            </p>
            <p className="relative text-sm text-ink-300">Listmonk on Idlistack · idlistack.com</p>
          </div>
          <div className="flex flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-border bg-sand-100 p-7 text-ink-900">
            <div className="flex items-center justify-between gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/idlistack-logo.png" alt="Idlistack" className="h-6 w-fit" />
              <span className="rounded-full bg-blush-600 px-3 py-1 text-xs font-semibold text-white">Free workshop</span>
            </div>
            <div>
              <p className="font-heading text-4xl leading-tight font-extrabold tracking-tight">
                Every rupee <span className="text-blush-600">matters.</span>
              </p>
              <p className="mt-3 max-w-md text-[15px] leading-7 text-ink-600">
                Fundraising tools for nonprofits, set up and run for you. Join us online, 14 November, 4 PM IST.
              </p>
            </div>
            <div className="flex gap-2" aria-hidden>
              {["bg-blush-600", "bg-blush-500", "bg-blush-200", "bg-ink-900", "bg-sand-200"].map((c) => (
                <span key={c} className={`h-2 flex-1 rounded-full ${c}`} />
              ))}
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Example layouts with illustrative copy.</p>
      </section>
    </>
  );
}
