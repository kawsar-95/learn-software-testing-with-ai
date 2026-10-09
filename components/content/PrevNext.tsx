import Link from "next/link";
import type { NavPage } from "@/lib/nav";
import { partLabel, prevNextNav } from "@/lib/ui";

const CARD =
  "group block rounded-2xl border border-border bg-bg-raised px-5 py-5 no-underline transition-colors hover:border-border-strong hover:bg-bg-raised-2";

/** Cards that link to the previous and the next part. */
export function PrevNext({ prev, next }: { prev?: NavPage; next?: NavPage }) {
  if (!prev && !next) return null;
  return (
    <nav aria-label={prevNextNav} className="grid gap-4 sm:grid-cols-2">
      {prev && (
        <Link href={prev.href} rel="prev" className={CARD}>
          <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">
            ← {partLabel(prev.part)}
          </span>
          <span className="mt-2 block font-display text-xl leading-snug text-text transition-colors group-hover:text-accent">
            {prev.title}
          </span>
        </Link>
      )}
      {next && (
        <Link href={next.href} rel="next" className={CARD + " sm:col-start-2 sm:text-right"}>
          <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint">
            {partLabel(next.part)} →
          </span>
          <span className="mt-2 block font-display text-xl leading-snug text-text transition-colors group-hover:text-accent">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
