"use client";

import { usePathname } from "next/navigation";
import { SidebarList, withTrailingSlash } from "./SidebarList";

/**
 * The desktop sidebar. It reads the pathname to mark the current part.
 * usePathname can suspend on a path that is not known at build time, so
 * the layout wraps this component in Suspense.
 */
export function Sidebar() {
  return <SidebarList activePath={withTrailingSlash(usePathname())} />;
}
