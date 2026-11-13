import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { defaultLocale, localePath, type Locale } from "@/lib/i18n";
import { visualizerTools } from "@/data/visualizers";
import { getTranslator } from "@/lib/messages.server";

export const metadata: Metadata = {
  title: "Zcash Visualizers",
  description:
    "Interactive cryptographic and blockchain visualizers for Zcash: zk-SNARKs, key derivation, consensus, hash functions, and shielded pools.",
};

export function VisualizerPageContent({ locale = defaultLocale }: { locale?: Locale }) {
  const t = getTranslator(locale);
  const basic = visualizerTools.filter((tool) => tool.category === "basic");
  const advanced = visualizerTools.filter((tool) => tool.category === "advanced");

  return (
    <>
      <SectionHero
        eyebrow={t("visualizer.eyebrow", "Interactive")}
        title={t("visualizer.title", "Zcash Visualizers")}
        description={t("visualizer.description", "Interactive educational tools to understand Zcash privacy technology, infrastructure, and zero-knowledge proofs.")}
        actions={
          <Button asChild>
            <Link href={localePath(locale, "/visualizer/zcash-wallets")}>
              {t("visualizer.open", "Start with wallets")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        }
        meta={
          <>
            <span>{basic.length + advanced.length} {t("visualizer.tools", "tools")}</span>
          </>
        }
      />

      <div className="container-page space-y-8 py-8 md:py-10">
        <section>
          <p className="eyebrow">{t("visualizer.basic", "Basic")}</p>
          <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">{t("visualizer.foundational", "Foundational concepts")}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {basic.map((tool) => (
              <Link
                key={tool.slug}
                href={localePath(locale, `/visualizer/${tool.slug}`)}
                className="group rounded-card border border-line bg-paper p-4 shadow-stamp transition-[border-color,background-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-gold-deep">{t("visualizer.visualizer", "Visualizer")}</p>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="mt-3 font-display text-xl leading-tight tracking-[-0.03em]">{t(tool.titleKey, tool.title)}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-muted">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <p className="eyebrow">{t("visualizer.advanced", "Advanced")}</p>
          <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">{t("visualizer.deep", "Deep technical dives")}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {advanced.map((tool) => (
              <Link
                key={tool.slug}
                href={localePath(locale, `/visualizer/${tool.slug}`)}
                className="group rounded-card border border-line bg-paper p-4 shadow-stamp transition-[border-color,background-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-gold-deep">{t("visualizer.visualizer", "Visualizer")}</p>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="mt-3 font-display text-xl leading-tight tracking-[-0.03em]">{t(tool.titleKey, tool.title)}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-muted">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}

export default function VisualizerPage() {
  return <VisualizerPageContent locale={defaultLocale} />;
}
