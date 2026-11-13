import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Zcash Visualizers",
  description:
    "Interactive cryptographic and blockchain visualizers for Zcash: zk-SNARKs, key derivation, consensus, hash functions, and shielded pools.",
};

const basic = [
  "Introduction to Zcash Wallets",
  "Value Pools & Address Types",
  "Pay with Zcash",
  "Zcash Exchanges (DEX)",
  "Hash Functions",
  "Zcash Blockchain Fundamentals",
  "Distributed Databases",
  "Beginner Quiz",
] as const;

const advanced = [
  "zk-SNARKs",
  "Build a Shielded Transaction",
  "How Your Zcash Wallet Finds Your Money",
  "CrossLink Protocol",
  "Zcash Keys",
  "Zcash Infrastructure",
  "Consensus",
  "Zcash Mining",
] as const;

export default function VisualizerPage() {
  return (
    <>
      <SectionHero
        eyebrow="Interactive"
        title="Zcash Visualizers"
        description="Interactive educational tools to understand Zcash privacy technology, infrastructure, and zero-knowledge proofs."
        actions={
          <Button asChild>
            <a href="https://zechub.wiki/visualizer" target="_blank" rel="noreferrer">
              Open the visualizer
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        }
        meta={
          <>
            <span>{basic.length + advanced.length} tools</span>
            <span>Interactive tools open on zechub.wiki</span>
          </>
        }
      />

      <div className="container-page space-y-8 py-8 md:py-10">
        <section>
          <p className="eyebrow">Basic</p>
          <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">Foundational concepts</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {basic.map((item) => (
              <div key={item} className="rounded-card border border-line bg-paper p-4 shadow-stamp">
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-gold-deep">Visualizer</p>
                <h3 className="mt-3 font-display text-xl leading-tight tracking-[-0.03em]">{item}</h3>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="eyebrow">Advanced</p>
          <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">Deep technical dives</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {advanced.map((item) => (
              <div key={item} className="rounded-card border border-line bg-paper p-4 shadow-stamp">
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-gold-deep">Visualizer</p>
                <h3 className="mt-3 font-display text-xl leading-tight tracking-[-0.03em]">{item}</h3>
              </div>
            ))}
          </div>
        </section>

        <p className="text-xs leading-relaxed text-muted">
          The original visualizers are interactive. Open them on zechub.wiki. The original page also includes
          quizzes and additional advanced tools.
        </p>
      </div>
    </>
  );
}
