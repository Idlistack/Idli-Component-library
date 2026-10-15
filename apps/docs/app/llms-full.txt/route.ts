import { fullReference } from "@/lib/markdown";

export const dynamic = "force-static";

export async function GET() {
  return new Response(await fullReference(), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
