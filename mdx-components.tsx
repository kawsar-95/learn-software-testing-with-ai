import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Callout } from "@/components/mdx/Callout";
import { Cite } from "@/components/mdx/Cite";
import { CodeBlock } from "@/components/mdx/CodeBlock";
import { CardGrid } from "@/components/mdx/CardGrid";
import { InfoCard } from "@/components/mdx/InfoCard";

// The custom components the MDX files in content/ use without an import.
const components: MDXComponents = {
  Callout,
  CardGrid,
  Cite,
  InfoCard,
  pre: CodeBlock,
  // Site-internal links ("/group/page/") go through next/link, which adds the
  // basePath on GitHub Pages. In-page anchors and external links stay plain.
  a: ({ href = "", ...props }) =>
    href.startsWith("/") ? <Link href={href} {...props} /> : <a href={href} {...props} />,
  // The wrapper scrolls the table sideways on narrow screens (see .mdx-table).
  table: (props) => (
    <div className="mdx-table">
      <table {...props} />
    </div>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
