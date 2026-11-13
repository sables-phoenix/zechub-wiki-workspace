import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VisualizerToolView } from "@/components/visualizer-tool-view";
import { getVisualizerTool, visualizerTools } from "@/data/visualizers";

type VisualizerPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return visualizerTools.map((tool) => ({ slug: tool.slug }));
}

export function VisualizerToolPageContent({ slug }: { slug: string }) {
  const tool = getVisualizerTool(slug);
  if (!tool) notFound();
  return <VisualizerToolView slug={slug} />;
}

export async function generateMetadata({ params }: VisualizerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getVisualizerTool(slug);
  if (!tool) return { title: "Visualizer" };
  return { title: tool.title, description: tool.description };
}

export default async function VisualizerToolPage({ params }: VisualizerPageProps) {
  const { slug } = await params;
  return <VisualizerToolPageContent slug={slug} />;
}
