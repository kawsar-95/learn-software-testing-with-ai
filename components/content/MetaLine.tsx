import { formatUpdated } from "@/lib/page";
import { metaSections, metaSources, metaUpdated, suggestEdit } from "@/lib/ui";

/** The line under the lede: `4 sections · 3 sources · updated Oct 2026 · Suggest an edit`. */
export function MetaLine({
  sections,
  sources,
  updated,
  editHref,
}: {
  sections: number;
  sources: number;
  updated: string;
  editHref: string;
}) {
  return (
    <div
      data-page-meta
      className="mt-0 border-t border-border pt-4 font-mono text-xs leading-relaxed text-text-faint"
    >
      {metaSections(sections)} · {metaSources(sources)} · {metaUpdated(formatUpdated(updated))} ·{" "}
      <a
        href={editHref}
        className="text-text-dim underline decoration-border-strong underline-offset-4 hover:text-accent"
      >
        {suggestEdit}
      </a>
    </div>
  );
}
