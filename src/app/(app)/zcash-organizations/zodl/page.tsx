import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleReader } from "@/components/article-reader";
import { getPage } from "@/lib/pages";

const source = getPage("zcash-organizations/ZODL");

export const metadata: Metadata = {
  title: source?.title ?? "ZODL",
  description: source?.description,
};

export default function ZodlAliasPage() {
  if (!source) notFound();
  return <ArticleReader page={source} />;
}
