import { GROUPS } from "@/lib/nav";
import type { NavPage } from "@/lib/nav";
import { partLabel } from "@/lib/ui";

/** The eyebrow above the page title: `PART 08 · CONFIGURE`. */
export function PageHeader({ page }: { page: NavPage }) {
  const group = GROUPS.find((g) => g.slug === page.group);
  return (
    <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
      {partLabel(page.part)} · {(group?.title ?? page.group).toUpperCase()}
    </p>
  );
}
