import type { ReactNode } from "react";
import Link from "next/link";
import { GROUPS } from "@/lib/nav";
import { START_STEPS, groupLabel } from "@/lib/home";

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
          ✴️ Software Testing with Claude AI
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-pretty text-text-dim sm:text-xl sm:leading-relaxed">
          A hands-on tutorial for QA engineers and SDETs: install Claude Code, learn how it
          works, configure it, extend it with skills, subagents, hooks, MCP and plugins, and
          automate testing in CI and the browser. Then follow one real QA project from a bug hunt
          to a second fix PR.
        </p>
      </header>

      <section aria-labelledby="start-heading" className="mt-14 sm:mt-20">
        <h2
          id="start-heading"
          className={`${LABEL} border-b border-border-strong pb-3 text-text-dim`}
        >
          START HERE
        </h2>
        <ol className="m-0 mt-5 grid list-none gap-3 p-0 sm:grid-cols-3 sm:gap-x-10">
          {START_STEPS.map((step, i) => (
            <li key={step.href} data-start-step className="relative">
              <Link
                href={step.href}
                className="group block h-full rounded-[10px] border border-border bg-bg-raised px-4 py-4 no-underline transition-colors hover:border-accent"
              >
                <span className={`${LABEL} block text-text-dim`}>
                  PART {String(step.part).padStart(2, "0")}
                </span>
                <span className="mt-2 block font-display text-xl font-medium leading-snug text-text transition-colors group-hover:text-accent">
                  {step.title}
                </span>
              </Link>
              {i < START_STEPS.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -right-10 hidden w-10 -translate-y-1/2 text-center font-mono text-base text-text-faint sm:block"
                >
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="contents-heading" className="mt-14 sm:mt-20">
        <h2
          id="contents-heading"
          className={`${LABEL} border-b border-border-strong pb-3 text-text-dim`}
        >
          CONTENTS
        </h2>
        {GROUPS.map((group) => (
          <div key={group.slug}>
            <h3 className={`${LABEL} mt-10 text-accent`}>{groupLabel(group.title, group.pages.length)}</h3>
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
                    <p
                      data-home-tagline
                      className="mt-1 font-display text-lg italic leading-snug text-text-dim"
                    >
                      {page.tagline}
                    </p>
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
