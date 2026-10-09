import { citeLabel } from "@/lib/ui";

/** A small `[n]` link to the n-th entry of `page.sources` (1-based). Style: `.mdx a.cite`. */
export function Cite({ n }: { n: number }) {
  return (
    <sup>
      <a className="cite" href={`#src-${n}`} aria-label={citeLabel(n)}>
        [{n}]
      </a>
    </sup>
  );
}
