import { Suspense } from "react";
import type { ReactNode } from "react";
import { OWNER } from "@/lib/site";
import { footerSummary, skipLink } from "@/lib/ui";
import { SiteHeader } from "./SiteHeader";
import { Sidebar } from "./Sidebar";
import { SidebarList } from "./SidebarList";

/** Everything around a page: the skip link, the header, the sidebar of parts, and the footer. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:border focus:border-accent focus:bg-bg-raised focus:px-4 focus:py-2 focus:text-sm focus:text-text"
      >
        {skipLink}
      </a>
      <SiteHeader />
      <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden border-r border-border lg:sticky lg:top-14 lg:block lg:h-[calc(100vh-3.5rem)] lg:self-start lg:overflow-y-auto">
          <Suspense fallback={<SidebarList activePath={null} />}>
            <Sidebar />
          </Suspense>
        </aside>
        <div className="flex min-h-[calc(100vh-3.5rem)] min-w-0 flex-col">
          {/* The inline style beats the global :focus-visible rule for the skip-link target. */}
          <main id="content" tabIndex={-1} style={{ outline: "none" }} className="flex-1">
            {children}
          </main>
          <footer className="mt-24 border-t border-border px-6 py-8 font-mono text-xs leading-relaxed text-text-faint">
            <p className="mx-auto max-w-3xl">
              {footerSummary} · © 2026{" "}
              <a href={OWNER.url} className="underline underline-offset-2 hover:text-accent">
                {OWNER.name}
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
