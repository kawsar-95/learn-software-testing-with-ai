"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { SidebarList, withTrailingSlash } from "./SidebarList";
import { scrollActiveIntoView } from "./scroll-active";

/**
 * The desktop sidebar. It reads the pathname to mark the current part and
 * scrolls that part into view in the sidebar.
 * usePathname can suspend on a path that is not known at build time, so
 * the layout wraps this component in Suspense.
 */
export function Sidebar() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollActiveIntoView(ref.current);
  }, [pathname]);

  return (
    <div ref={ref}>
      <SidebarList activePath={withTrailingSlash(pathname)} />
    </div>
  );
}
