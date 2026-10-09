import type { Source } from "@/lib/page";
import { sourceAccessed, sourcesHeading } from "@/lib/ui";

/**
 * The numbered list of sources at the end of a page. Item k has the id
 * `src-k`: the `<Cite n={k} />` links in the body jump to it. The heading is
 * rendered here, not in the MDX, so it is not part of the "On this page" list.
 */
export function Sources({ sources }: { sources: Source[] }) {
  if (sources.length === 0) return null;
  return (
    <section aria-labelledby="sources" className="mt-20 border-t border-border pt-10">
      <h2
        id="sources"
        className="scroll-mt-20 font-display text-3xl font-medium tracking-[-0.01em] text-text"
      >
        {sourcesHeading}
      </h2>
      <ol role="list" className="mt-6 list-none divide-y divide-border p-0">
        {sources.map((source, index) => (
          <li
            key={`${index}-${source.url}`}
            id={`src-${index + 1}`}
            className="grid scroll-mt-20 grid-cols-[2.75rem_minmax(0,1fr)] gap-x-2 py-3 text-sm leading-relaxed target:bg-accent/10"
          >
            <span className="pl-1 font-mono text-xs leading-relaxed text-text-dim">[{index + 1}]</span>
            <div className="min-w-0">
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-text underline decoration-border-strong underline-offset-4 [overflow-wrap:anywhere] hover:text-accent"
              >
                {source.title}
              </a>
              <p className="mt-0.5 font-mono text-xs text-text-dim">
                {source.publisher} · {sourceAccessed(source.accessed)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
