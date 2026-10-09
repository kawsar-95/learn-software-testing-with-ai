import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/mdx/Callout";
import { CardGrid } from "@/components/mdx/CardGrid";
import { InfoCard } from "@/components/mdx/InfoCard";

// The custom components the MDX files in content/ use without an import.
const components: MDXComponents = { Callout, CardGrid, InfoCard };

export function useMDXComponents(): MDXComponents {
  return components;
}
