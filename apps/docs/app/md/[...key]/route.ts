import { markdownFor, markdownKeys } from "@/lib/markdown";

// Serves each docs page as Markdown. next.config rewrites /docs/<page>.md here.
export const dynamic = "force-static";

export function generateStaticParams() {
  return markdownKeys.map((key) => ({ key: key.split("/") }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ key: string[] }> }) {
  const { key } = await params;
  const markdown = await markdownFor(key.join("/"));
  if (!markdown) return new Response("Not found", { status: 404 });
  return new Response(markdown, { headers: { "content-type": "text/markdown; charset=utf-8" } });
}
