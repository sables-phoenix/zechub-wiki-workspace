import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { defaultLocale, type Locale } from "@/lib/i18n";
import { getTranslator } from "@/lib/messages.server";

export const metadata: Metadata = {
  title: "Zcash Visualizers",
  description:
    "Interactive cryptographic and blockchain visualizers for Zcash: zk-SNARKs, key derivation, consensus, hash functions, and shielded pools.",
};

const basic = ["t1","t2","t3","t4","t5","t6","t7","t8"] as const;

const advanced = ["t9","t10","t11","t12","t13","t14","t15","t16"] as const;

export function VisualizerPageContent({ locale = defaultLocale }: { locale?: Locale }) {
  const t = getTranslator(locale);

  return (
    <>
      <SectionHero
        eyebrow={t("visualizer.eyebrow", "Interactive")}
        title={t("visualizer.title", "Zcash Visualizers")}
        description={t("visualizer.description", "Interactive educational tools to understand Zcash privacy technology, infrastructure, and zero-knowledge proofs.")}
        actions={
          <Button asChild>
            <a href="https://zechub.wiki/visualizer" target="_blank" rel="noreferrer">
              {t("visualizer.open", "Open the visualizer")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        }
        meta={
          <>
            <span>{basic.length + advanced.length} {t("visualizer.tools", "tools")}</span>
            <span>{t("visualizer.note", "Interactive tools open on zechub.wiki")}</span>
          </>
        }
      />

      <div className="container-page space-y-8 py-8 md:py-10">
        <section>
          <p className="eyebrow">{t("visualizer.basic", "Basic")}</p>
          <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">{t("visualizer.foundational", "Foundational concepts")}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {basic.map((item) => (
              <div key={item} className="rounded-card border border-line bg-paper p-4 shadow-stamp">
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-gold-deep">{t("visualizer.visualizer", "Visualizer")}</p>
                <h3 className="mt-3 font-display text-xl leading-tight tracking-[-0.03em]">{t(`visualizer.${item}`, item)}</h3>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="eyebrow">{t("visualizer.advanced", "Advanced")}</p>
          <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">{t("visualizer.deep", "Deep technical dives")}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {advanced.map((item) => (
              <div key={item} className="rounded-card border border-line bg-paper p-4 shadow-stamp">
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-gold-deep">{t("visualizer.visualizer", "Visualizer")}</p>
                <h3 className="mt-3 font-display text-xl leading-tight tracking-[-0.03em]">{t(`visualizer.${item}`, item)}</h3>
              </div>
            ))}
          </div>
        </section>

        <p className="text-xs leading-relaxed text-muted">
          {t("visualizer.note", "The original visualizers are interactive. Open them on zechub.wiki. The original page also includes quizzes and additional advanced tools.")}
        </p>
      </div>
    </>
  );
}

export default function VisualizerPage() {
  return <VisualizerPageContent locale={defaultLocale} />;
}
