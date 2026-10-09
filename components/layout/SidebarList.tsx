import Link from "next/link";
import { GROUPS } from "@/lib/nav";
import { partLabel, partsNav } from "@/lib/ui";

/** The export uses trailing slashes, but usePathname may not return one. */
export function withTrailingSlash(pathname: string | null): string | null {
  if (pathname === null) return null;
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

/**
 * All the parts in their groups. A plain component without hooks, so the
 * server layout can render it as the Suspense fallback and the client Sidebar
 * and MobileNav can render it with the active path.
 */
export function SidebarList({
  activePath,
  onNavigate,
}: {
  activePath: string | null;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label={partsNav} className="px-3 py-6">
      {GROUPS.map((group) => (
        <div key={group.slug} className="mb-6 last:mb-0">
          <p className="mb-2 px-3 font-mono text-[11px] uppercase tracking-[0.16em] text-text-faint">
            {group.title}
          </p>
          <ol className="m-0 list-none space-y-px p-0">
            {group.pages.map((page) => {
              const active = page.href === activePath;
              return (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    aria-current={active ? "page" : undefined}
                    onClick={onNavigate}
                    className={
                      "group block rounded-r-md border-l-2 px-3 py-2 no-underline transition-colors " +
                      (active
                        ? "border-accent bg-bg-raised"
                        : "border-transparent hover:border-border-strong hover:bg-bg-raised/60")
                    }
                  >
                    <span
                      className={
                        "block font-mono text-[10.5px] uppercase tracking-[0.12em] " +
                        (active ? "text-accent" : "text-text-faint")
                      }
                    >
                      {partLabel(page.part)}
                    </span>
                    <span
                      className={
                        "mt-0.5 block text-[13.5px] leading-snug " +
                        (active ? "text-text" : "text-text-dim group-hover:text-text")
                      }
                    >
                      {page.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </nav>
  );
}
