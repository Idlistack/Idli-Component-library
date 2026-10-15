import Link from "next/link";
import { Button } from "@idlistack/ui";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto grid max-w-xl place-items-center px-4 py-32 text-center">
      <p className="font-heading text-6xl font-extrabold text-brand">404</p>
      <h1 className="mt-4 text-2xl font-bold">This page has wandered off</h1>
      <p className="mt-2 text-muted-foreground">It may have moved, or the link might be mistyped.</p>
      <Button asChild className="mt-8">
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  );
}
