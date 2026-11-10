import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleReader } from "@/components/article-reader";
import { getPage, pages } from "@/lib/pages";

type ArticlePageProps = {
  params: Promise<{ slug: string[] }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map((page) => ({ slug: page.path.split("/") }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug.join("/"));
  if (!page) return { title: "Page not found" };
  return {
    title: page.title,
    description: page.description,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const page = getPage(slug.join("/"));
  if (!page) notFound();
  return <ArticleReader page={page} />;
}
