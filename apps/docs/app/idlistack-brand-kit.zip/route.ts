import { brandKitFiles } from "@/lib/brand-kit";
import { zip } from "@/lib/zip";

// The whole brand kit as one download: logos, colours, tokens and a README.
export const dynamic = "force-static";

export function GET() {
  return new Response(new Uint8Array(zip(brandKitFiles())), {
    headers: { "content-type": "application/zip", "content-disposition": 'attachment; filename="idlistack-brand-kit.zip"' },
  });
}
