import type { Metadata } from "next";
import type { MDXContent } from "mdx/types";
import { notFound } from "next/navigation";
import { PAGES, getNeighbors, getPage } from "@/lib/nav";
import { getOutline } from "@/lib/outline";
import { PageHeader } from "@/components/content/PageHeader";
import { PrevNext } from "@/components/content/PrevNext";
import { SectionNav } from "@/components/navigation/SectionNav";

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
  const { group, page: slug } = await params;
  const page = getPage(group, slug);
  if (!page) notFound();
  const { default: Content } = await loadPage(params);
  const { prev, next } = getNeighbors(group, slug);

  return (
    <div className="mx-auto w-full max-w-[728px] px-4 py-12 sm:px-6 sm:py-16 xl:grid xl:max-w-[1012px] xl:grid-cols-[minmax(0,680px)_220px] xl:gap-16">
      <div className="min-w-0">
        <PageHeader page={page} />
        <article data-content className="mdx">
          <Content />
        </article>
        <div className="mt-28">
          <PrevNext prev={prev} next={next} />
        </div>
      </div>
      <aside className="hidden xl:block">
        <SectionNav items={getOutline(group, slug)} />
      </aside>
    </div>
  );
}
