"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";
import { localePath } from "@/lib/i18n";
import { getVisualizerTool, type VisualizerSlide, type VisualizerTool } from "@/data/visualizers";
import { cn } from "@/lib/utils";

export function VisualizerToolView({ slug }: { slug: string }) {
  const { locale, t } = useI18n();
  const tool = getVisualizerTool(slug);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!tool) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setDirection(1);
        setIndex((current) => Math.min(current + 1, tool.slides.length - 1));
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setDirection(-1);
        setIndex((current) => Math.max(current - 1, 0));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [tool]);

  if (!tool) return null;
  const slide = tool.slides[index];
  if (!slide) return null;
  const progress = ((index + 1) / tool.slides.length) * 100;

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex(Math.max(0, Math.min(next, tool.slides.length - 1)));
  };

  return (
    <div className="container-page py-7 md:py-9">
      <Link
        href={localePath(locale, "/visualizer")}
        className="inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t("shell.visualizers", "Visualizers")}
      </Link>

      <header className="mt-5 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-3xl">
          <p className="eyebrow">
            {t("visualizer.visualizer", "Visualizer")} / {tool.category}
          </p>
          <h1 className="mt-3 text-balance font-display text-4xl leading-[0.98] tracking-[-0.05em] md:text-5xl">
            {t(tool.titleKey, tool.title)}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{tool.description}</p>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          {index + 1} / {tool.slides.length}
        </span>
      </header>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-paper-2">
        <motion.div
          className="h-full rounded-full bg-gold"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="min-h-[360px] rounded-card border border-line bg-paper p-5 shadow-stamp md:p-7">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${tool.slug}-${index}`}
              initial={{ opacity: 0, x: direction * 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -18 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <Stage tool={tool} index={index} slide={slide} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col rounded-card border border-line bg-paper-2 p-5 shadow-stamp md:p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`copy-${tool.slug}-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-gold-deep">
                {String(index + 1).padStart(2, "0")} / {String(tool.slides.length).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-display text-3xl leading-none tracking-[-0.04em]">
                {slide.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{slide.body}</p>
              {slide.points?.length ? (
                <ul className="mt-4 space-y-2">
                  {slide.points.map((point) => (
                    <li key={point} className="flex gap-2 text-xs leading-relaxed text-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between gap-2 border-t border-line pt-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label={t("visualizer.previous", "Previous slide")}
            >
              <ChevronLeft className="h-4 w-4" />
              {t("visualizer.previous", "Back")}
            </Button>
            <div className="flex items-center gap-1">
              {tool.slides.map((_, dot) => (
                <button
                  key={dot}
                  type="button"
                  onClick={() => go(dot)}
                  aria-label={`${t("visualizer.slide", "Slide")} ${dot + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    dot === index ? "w-5 bg-gold" : "w-1.5 bg-line hover:bg-ink/30",
                  )}
                />
              ))}
            </div>
            {index === tool.slides.length - 1 ? (
              <Button size="sm" onClick={() => go(0)}>
                <RefreshCw className="h-3.5 w-3.5" />
                {t("visualizer.restart", "Restart")}
              </Button>
            ) : (
              <Button size="sm" onClick={() => go(index + 1)} aria-label={t("visualizer.next", "Next slide")}>
                {t("visualizer.next", "Next")}
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stage({
  tool,
  index,
  slide,
}: {
  tool: VisualizerTool;
  index: number;
  slide: VisualizerSlide;
}) {
  switch (tool.kind) {
    case "pools":
      return <PoolsStage index={index} />;
    case "hash":
      return <HashStage />;
    case "chain":
      return <ChainStage index={index} />;
    case "database":
    case "consensus":
    case "crosslink":
      return <NodesStage index={index} kind={tool.kind} />;
    case "keys":
      return <KeysStage index={index} />;
    case "infrastructure":
      return <InfrastructureStage index={index} />;
    case "mining":
      return <MiningStage index={index} />;
    case "quiz":
      return <QuizStage slide={slide} />;
    case "privacy":
      return <PrivacyStage index={index} />;
    case "frost":
      return <FrostStage index={index} />;
    case "wallets":
      return <FlowStage index={index} steps={["Keys", "Scan", "Notes", "Build", "Broadcast"]} accent="gold" />;
    case "payment":
      return <FlowStage index={index} steps={["Request", "Build", "Prove", "Broadcast", "Confirm"]} accent="green" />;
    case "dex":
      return <FlowStage index={index} steps={["Choose", "Lock", "Reveal", "Claim", "Shield"]} accent="rust" />;
    case "transaction":
      return <FlowStage index={index} steps={["Select notes", "Outputs", "Balance", "Proof", "Broadcast"]} accent="gold" />;
    case "scan":
      return <ScanStage index={index} />;
    case "snark":
      return <FlowStage index={index} steps={["Claim", "Witness", "Proof", "Verify", "Zero knowledge"]} accent="gold" />;
    case "governance":
      return <FlowStage index={index} steps={["Reward", "ZCG", "Foundation", "Coinholder", "Delivery"]} accent="green" />;
    case "bounties":
      return <FlowStage index={index} steps={["Find", "Claim", "Build", "Submit", "Paid"]} accent="green" />;
    case "dao":
      return <FlowStage index={index} steps={["Idea", "Discuss", "Draft", "Vote", "Execute"]} accent="gold" />;
    default:
      return <FlowStage index={index} steps={["Start", "Explore", "Verify", "Finish"]} />;
  }
}

function StageTitle({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">{label}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function FlowStage({
  index,
  steps,
  accent = "gold",
}: {
  index: number;
  steps: readonly string[];
  accent?: "gold" | "green" | "rust";
}) {
  const color = accent === "green" ? "bg-green" : accent === "rust" ? "bg-rust" : "bg-gold";
  return (
    <StageTitle label="Flow">
      <div className="space-y-2">
        {steps.map((step, stepIndex) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: stepIndex * 3 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: stepIndex * 0.04 }}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors",
              stepIndex <= index ? "border-line bg-paper-2 text-ink" : "border-line/60 text-muted",
            )}
          >
            <span className={cn("h-2 w-2 rounded-full", stepIndex <= index ? color : "bg-line")} />
            {step}
            {stepIndex < index ? <Check className="ml-auto h-3.5 w-3.5 text-green" /> : null}
          </motion.div>
        ))}
      </div>
    </StageTitle>
  );
}

function PoolsStage({ index }: { index: number }) {
  const pools = [
    { name: "Sprout", value: 0 },
    { name: "Sapling", value: 16 },
    { name: "Orchard", value: 37 },
    { name: "Ironwood", value: 61 },
  ];
  return (
    <StageTitle label="Value pools">
      <div className="space-y-4">
        {pools.map((pool, poolIndex) => (
          <div key={pool.name}>
            <div className="flex justify-between font-mono text-[10px] text-muted">
              <span>{pool.name}</span>
              <span>{pool.value}%</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-paper-2">
              <motion.div
                className={cn("h-full rounded-full", poolIndex === index ? "bg-gold" : "bg-gold/35")}
                animate={{ width: `${Math.max(pool.value, 2)}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 rounded-lg border border-line bg-paper-2 p-3 text-xs leading-relaxed text-muted">
        {index < 2
          ? "A shielded pool stores notes, not account balances. The pool accounting is public; the notes are private."
          : "Sapling, Orchard, and Ironwood use different circuits and address formats. A wallet picks a compatible receiver."}
      </p>
    </StageTitle>
  );
}

function HashStage() {
  const [value, setValue] = useState("Zcash");
  const [hash, setHash] = useState("");
  const run = async () => {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
    setHash(Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join(""));
  };
  return (
    <StageTitle label="Cryptographic fingerprints">
      <label className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted" htmlFor="visualizer-hash">
        SHA-256 input
      </label>
      <input
        id="visualizer-hash"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="mt-2 h-10 w-full rounded-lg border border-line bg-paper-2 px-3 font-mono text-sm outline-none focus:border-gold"
      />
      <Button onClick={run} className="mt-3" size="sm">
        <RefreshCw className="h-3.5 w-3.5" />
        Hash
      </Button>
      <div className="mt-4 min-h-20 break-all rounded-lg border border-line bg-paper-2 p-3 font-mono text-[10px] leading-relaxed text-muted">
        {hash || "The 256-bit digest appears here."}
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {["Deterministic", "One-way", "Avalanche"].map((item) => (
          <div key={item} className="rounded-lg border border-line bg-paper-2 px-2 py-2 text-center font-mono text-[9px] text-muted">
            {item}
          </div>
        ))}
      </div>
    </StageTitle>
  );
}

function ChainStage({ index }: { index: number }) {
  const [blocks, setBlocks] = useState(3);
  const count = Math.max(blocks, index + 2);
  return (
    <StageTitle label="Linked blocks">
      <div className="flex flex-wrap items-center gap-2">
        {Array.from({ length: Math.min(count, 7) }).map((_, block) => (
          <motion.div
            key={block}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2"
          >
            <div className={cn("rounded-lg border px-3 py-2 font-mono text-[9px]", block <= index + 2 ? "border-gold/40 bg-gold/10 text-gold-deep" : "border-line bg-paper-2 text-muted")}>
              block {block + 1}
              <span className="mt-1 block text-[7px] opacity-60">hash</span>
            </div>
            {block < count - 1 ? <ArrowRight className="h-3 w-3 text-muted" /> : null}
          </motion.div>
        ))}
      </div>
      <Button size="sm" className="mt-4" onClick={() => setBlocks((current) => Math.min(current + 1, 5))}>
        Add block
      </Button>
      <p className="mt-3 text-xs leading-relaxed text-muted">Each block header commits to the previous block, so the chain is ordered and tamper-evident.</p>
    </StageTitle>
  );
}

function NodesStage({ index, kind }: { index: number; kind: string }) {
  const total = kind === "database" ? 7 : 9;
  const active = Math.min(total, 3 + index);
  const label = kind === "database" ? "Replicas" : "Validators";
  return (
    <StageTitle label={label}>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {Array.from({ length: total }).map((_, node) => (
          <motion.div
            key={node}
            animate={{ opacity: node < active ? 1 : 0.35, y: node < active ? 0 : 3 }}
            className={cn("flex h-12 items-center justify-center rounded-lg border font-mono text-[9px]", node < active ? "border-gold/40 bg-gold/10 text-gold-deep" : "border-line bg-paper-2 text-muted")}
          >
            {kind === "consensus" ? "node" : "copy"} {node + 1}
          </motion.div>
        ))}
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-paper-2">
        <motion.div className="h-full rounded-full bg-gold" animate={{ width: `${(active / total) * 100}%` }} />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted">
        {active} of {total} {label.toLowerCase()} are participating. Agreement needs enough participants to make a conflicting history impractical.
      </p>
    </StageTitle>
  );
}

function KeysStage({ index }: { index: number }) {
  const steps = ["Seed", "Spending key", "Full viewing key", "Unified address", "Backup"];
  return (
    <StageTitle label="Key derivation">
      <div className="flex flex-wrap items-center gap-2">
        {steps.map((step, stepIndex) => (
          <div key={step} className="flex items-center gap-2">
            <motion.div
              animate={{ scale: stepIndex <= index ? 1 : 0.96, opacity: stepIndex <= index ? 1 : 0.45 }}
              className={cn("rounded-lg border px-3 py-2 font-mono text-[9px]", stepIndex <= index ? "border-gold/40 bg-gold/10 text-gold-deep" : "border-line bg-paper-2 text-muted")}
            >
              {step}
            </motion.div>
            {stepIndex < steps.length - 1 ? <ArrowRight className="h-3 w-3 text-muted" /> : null}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">The spending key authorizes spending. The viewing key reads notes without spending. A unified address carries receiver types.</p>
    </StageTitle>
  );
}

function InfrastructureStage({ index }: { index: number }) {
  const layers = ["Network", "Full node", "Indexer", "Wallet", "Application"];
  return (
    <StageTitle label="Stack">
      <div className="space-y-2">
        {layers.map((layer, layerIndex) => (
          <motion.div
            key={layer}
            animate={{ x: layerIndex <= index ? 0 : 8, opacity: layerIndex <= index ? 1 : 0.4 }}
            className={cn("rounded-lg border px-3 py-2 font-mono text-[10px]", layerIndex <= index ? "border-gold/40 bg-gold/10 text-gold-deep" : "border-line bg-paper-2 text-muted")}
          >
            {layer}
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">A full node validates. An indexer serves compact data. A wallet holds keys. An application sits on top.</p>
    </StageTitle>
  );
}

function MiningStage({ index }: { index: number }) {
  const [height, setHeight] = useState(3_500_000 + index * 100_000);
  const halvings = Math.floor(height / 1_680_000);
  const reward = 50 / 2 ** halvings;
  return (
    <StageTitle label="Block reward">
      <input
        type="range"
        min={0}
        max={12_000_000}
        step={10_000}
        value={height}
        onChange={(event) => setHeight(Number(event.target.value))}
        className="w-full accent-[var(--gold)]"
        aria-label="Block height"
      />
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <Metric label="Height" value={height.toLocaleString()} />
        <Metric label="Halvings" value={String(halvings)} />
        <Metric label="Reward" value={`${reward.toFixed(3)} ZEC`} />
      </div>
    </StageTitle>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-paper-2 p-3">
      <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">{label}</p>
      <p className="mt-1 font-display text-xl tracking-[-0.03em]">{value}</p>
    </div>
  );
}

function ScanStage({ index }: { index: number }) {
  return (
    <StageTitle label="Trial decryption">
      <div className="space-y-2">
        {[0, 1, 2, 3].map((note) => {
          const matched = note === 1 && index >= 2;
          return (
            <motion.div
              key={note}
              animate={{ borderColor: matched ? "var(--green)" : "var(--line)" }}
              className={cn("flex items-center justify-between rounded-lg border px-3 py-2 font-mono text-[10px]", matched ? "bg-green/10 text-green" : "bg-paper-2 text-muted")}
            >
              <span>note {note + 1}</span>
              <span>{index < 2 ? "encrypted" : matched ? "match: spendable" : "no match"}</span>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">The wallet scans locally. Failed decryptions look like random data. A successful match reveals a note only to that wallet.</p>
    </StageTitle>
  );
}

function QuizStage({ slide }: { slide: VisualizerSlide }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  return (
    <StageTitle label="Quiz">
      <p className="text-base font-medium">{slide.question}</p>
      <div className="mt-4 grid gap-2">
        {slide.options?.map((option, optionIndex) => (
          <button
            key={option}
            type="button"
            onClick={() => setSelected(optionIndex)}
            className={cn(
              "rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
              answered
                ? optionIndex === slide.answer
                  ? "border-green bg-green/10 text-green"
                  : optionIndex === selected
                    ? "border-rust bg-rust/10 text-rust"
                    : "border-line bg-paper-2 text-muted"
                : "border-line bg-paper-2 text-ink hover:border-ink/25",
            )}
          >
            {option}
          </button>
        ))}
      </div>
      {answered ? (
        <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-lg border border-line bg-paper-2 p-3 text-xs leading-relaxed text-muted">
          {slide.explanation}
        </motion.p>
      ) : null}
    </StageTitle>
  );
}

function PrivacyStage({ index }: { index: number }) {
  const cases = ["Payments", "Donations", "Treasury", "Disclosure", "Access"];
  return (
    <StageTitle label="Use cases">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {cases.map((item, itemIndex) => (
          <motion.div
            key={item}
            animate={{ y: itemIndex === index ? -2 : 0, opacity: itemIndex <= index ? 1 : 0.45 }}
            className={cn("rounded-lg border p-3 text-center font-mono text-[9px]", itemIndex <= index ? "border-gold/40 bg-gold/10 text-gold-deep" : "border-line bg-paper-2 text-muted")}
          >
            {item}
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">Privacy is useful for payments, donations, business treasuries, selective disclosure, and access flows.</p>
    </StageTitle>
  );
}

function FrostStage({ index }: { index: number }) {
  const shares = [0, 1, 2, 3, 4];
  const threshold = 3;
  return (
    <StageTitle label="Threshold signing">
      <div className="flex gap-2">
        {shares.map((share) => (
          <motion.div
            key={share}
            animate={{ opacity: share < threshold + Math.min(index, 2) ? 1 : 0.35, scale: share === index ? 1.06 : 1 }}
            className={cn("flex h-12 flex-1 items-center justify-center rounded-lg border font-mono text-[9px]", share < threshold ? "border-gold/40 bg-gold/10 text-gold-deep" : "border-line bg-paper-2 text-muted")}
          >
            share {share + 1}
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">A threshold of shares produces one signature. The full private key never needs to exist in one place.</p>
    </StageTitle>
  );
}
