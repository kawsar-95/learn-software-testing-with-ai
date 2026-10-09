import type { ReactNode } from "react";
import Link from "next/link";
import { GROUPS } from "@/lib/nav";

const PART_COUNT = GROUPS.reduce((sum, group) => sum + group.pages.length, 0);

const LABEL = "font-mono text-[11px] font-medium uppercase tracking-[0.2em]";

/** Render `text` with each backtick span as a small <code> element. */
function renderInlineCode(text: string): ReactNode[] {
  return text.split("`").map((part, i) =>
    i % 2 === 1 ? (
      <code
        key={i}
        className="rounded border border-border bg-bg-raised px-1 py-px font-mono text-[0.85em]"
      >
        {part}
      </code>
    ) : (
      part
    ),
  );
}

/** The landing page: the contents of the tutorial, grouped. */
export function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pt-14 pb-8 sm:px-8 sm:pt-20">
      <header className="max-w-3xl">
        <p className={`${LABEL} text-accent`}>
          TUTORIAL · {PART_COUNT} PARTS · {GROUPS.length} GROUPS
        </p>
        <h1 className="mt-5 font-display text-[clamp(2.5rem,8vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.03em] text-balance text-text">
          🤖 Software Testing with Claude AI
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-pretty text-text-dim sm:text-xl sm:leading-relaxed">
          Master Prompt Engineering, Context Engineering, Skills, Agents &amp; MCP Servers in
          Claude. A complete guide to building autonomous AI testing systems with Claude Code.
        </p>
      </header>

      <section aria-labelledby="contents-heading" className="mt-16 sm:mt-24">
        <h2
          id="contents-heading"
          className={`${LABEL} border-b border-border-strong pb-3 text-text-dim`}
        >
          CONTENTS
        </h2>
        {GROUPS.map((group) => (
          <div key={group.slug}>
            <h3 className={`${LABEL} mt-10 text-accent`}>{group.title}</h3>
            <ol className="m-0 mt-3 list-none border-t border-border p-0">
              {group.pages.map((page) => (
                <li
                  key={page.slug}
                  data-home-row
                  className="group relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 border-b border-border py-7 sm:grid-cols-[5.5rem_minmax(0,1fr)_1.5rem] sm:gap-x-6 sm:py-9"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-[2.25rem] font-light leading-[0.9] tracking-[-0.04em] text-text-faint tabular-nums transition-colors group-hover:text-accent sm:text-[4rem]"
                  >
                    {String(page.part).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-display text-[1.5rem] font-medium leading-tight tracking-[-0.015em] text-balance sm:text-[1.875rem]">
                      <Link
                        href={page.href}
                        className="text-text no-underline transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
                      >
                        {page.title}
                      </Link>
                    </h4>
                    <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-pretty text-text-dim sm:line-clamp-none sm:text-[15px]">
                      {renderInlineCode(page.description)}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="hidden pt-2 font-mono text-base text-text-faint transition-all group-hover:translate-x-1 group-hover:text-accent sm:block"
                  >
                    →
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </div>
  );
}
