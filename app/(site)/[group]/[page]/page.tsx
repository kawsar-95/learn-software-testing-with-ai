import type { Metadata } from "next";
import type { MDXContent } from "mdx/types";
import { notFound } from "next/navigation";
import { PAGES, getPage } from "@/lib/nav";

type MdxPage = { default: MDXContent; metadata: Metadata };

export const dynamicParams = false;

export function generateStaticParams() {
  return PAGES.map((page) => ({ group: page.group, page: page.slug }));
}

/** Loads content/<group>/<page>.mdx. Params that are not in lib/nav.ts get a 404. */
async function loadPage(params: PageProps<"/[group]/[page]">["params"]): Promise<MdxPage> {
  const { group, page } = await params;
  if (!getPage(group, page)) notFound();
  return import(`@/content/${group}/${page}.mdx`);
}

export async function generateMetadata({ params }: PageProps<"/[group]/[page]">): Promise<Metadata> {
  const { metadata } = await loadPage(params);
  return metadata;
}

export default async function ContentPage({ params }: PageProps<"/[group]/[page]">) {
  const { default: Content } = await loadPage(params);
  return (
    <article data-content className="mdx">
      <Content />
    </article>
  );
}
