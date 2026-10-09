import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/mdx/Callout";
import { CodeBlock } from "@/components/mdx/CodeBlock";
import { CardGrid } from "@/components/mdx/CardGrid";
import { InfoCard } from "@/components/mdx/InfoCard";

// The custom components the MDX files in content/ use without an import.
const components: MDXComponents = {
  Callout,
  CardGrid,
  InfoCard,
  pre: CodeBlock,
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
