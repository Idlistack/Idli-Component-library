import { DocsMobileNav, DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-7xl gap-10 px-4 sm:px-6 lg:px-8">
      <DocsSidebar />
      <main id="main" className="min-w-0 flex-1 py-10 lg:py-12">
        <DocsMobileNav />
        <div className="max-w-3xl">{children}</div>
      </main>
    </div>
  );
}
