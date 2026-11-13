"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, RefreshCw } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";
import { localePath } from "@/lib/i18n";
import { getVisualizerTool } from "@/data/visualizers";
import { cn } from "@/lib/utils";

export function VisualizerToolView({ slug }: { slug: string }) {
  const { locale, t } = useI18n();
  const tool = getVisualizerTool(slug);
  if (!tool) return null;

  return (
    <div className="container-page py-7 md:py-9">
      <Link
        href={localePath(locale, "/visualizer")}
        className="inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t("shell.visualizers", "Visualizers")}
      </Link>
      <div className="mt-5 rounded-card border border-line bg-paper p-6 shadow-stamp md:p-8">
        <p className="eyebrow">{t(`visualizer.${tool.category}`, tool.category)}</p>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-4xl leading-[0.98] tracking-[-0.05em] md:text-5xl">
          {t(tool.titleKey, tool.title)}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{tool.description}</p>
      </div>
      <div className="mt-5">
        <Demo kind={tool.kind} />
      </div>
    </div>
  );
}

function Demo({ kind }: { kind: string }) {
  switch (kind) {
    case "hash":
      return <HashDemo />;
    case "pools":
      return <PoolsDemo />;
    case "keys":
      return <KeysDemo />;
    case "transaction":
      return <TransactionDemo />;
    case "scan":
      return <ScanDemo />;
    case "chain":
      return <ChainDemo />;
    case "database":
      return <DatabaseDemo />;
    case "consensus":
      return <ConsensusDemo />;
    case "mining":
      return <MiningDemo />;
    case "quiz":
      return <QuizDemo />;
    case "wallets":
      return <WalletsDemo />;
    case "dex":
      return <DexDemo />;
    case "payment":
      return <PaymentDemo />;
    case "snark":
      return <SnarkDemo />;
    case "infrastructure":
      return <InfrastructureDemo />;
    default:
      return <StepDemo />;
  }
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-card border border-line bg-paper p-5 shadow-stamp md:p-6">
      <p className="eyebrow">{title}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function HashDemo() {
  const [value, setValue] = useState("Zcash");
  const [hash, setHash] = useState("");
  const run = async () => {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    setHash(Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join(""));
  };
  return (
    <Panel title="SHA-256">
      <label className="text-xs text-muted" htmlFor="hash-input">Input</label>
      <input
        id="hash-input"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="mt-2 h-10 w-full rounded-lg border border-line bg-paper-2 px-3 font-mono text-sm text-ink outline-none focus:border-gold"
      />
      <Button onClick={run} className="mt-3">
        <RefreshCw className="h-3.5 w-3.5" />
        Hash
      </Button>
      <p className="mt-4 break-all rounded-lg border border-line bg-paper-2 p-3 font-mono text-[11px] text-muted">
        {hash || "The digest appears here."}
      </p>
    </Panel>
  );
}

const poolData = [
  { name: "Sprout", value: 0 },
  { name: "Sapling", value: 12 },
  { name: "Orchard", value: 31 },
  { name: "Ironwood", value: 57 },
];

function PoolsDemo() {
  const [selected, setSelected] = useState(3);
  const pool = poolData[selected] ?? poolData[0];
  return (
    <Panel title="Value pools">
      <div className="grid gap-2 sm:grid-cols-4">
        {poolData.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setSelected(index)}
            className={cn(
              "rounded-lg border px-3 py-3 text-left transition-colors",
              selected === index ? "border-gold bg-gold/10" : "border-line bg-paper-2 hover:border-ink/25",
            )}
          >
            <span className="block text-sm">{item.name}</span>
            <span className="mt-1 block font-mono text-[10px] text-muted">{item.value}%</span>
          </button>
        ))}
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full border border-line bg-paper-2">
        <div className="h-full rounded-full bg-gold" style={{ width: `${pool?.value ?? 0}%` }} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {pool?.name} is a shielded value pool. Funds in a shielded pool are not visible as a sender, receiver, and amount triple on the public ledger.
      </p>
    </Panel>
  );
}

const keySteps = ["Seed phrase", "Spending key", "Full viewing key", "Incoming viewing key", "Unified address"];

function KeysDemo() {
  const [step, setStep] = useState(0);
  return (
    <Panel title="Key derivation">
      <div className="flex flex-wrap items-center gap-2">
        {keySteps.map((item, index) => (
          <div key={item} className="flex items-center gap-2">
            <span className={cn("rounded-pill border px-3 py-1.5 text-[10px]", index <= step ? "border-gold bg-gold/10 text-gold-deep" : "border-line text-muted")}>
              {item}
            </span>
            {index < keySteps.length - 1 ? <ArrowRight className="h-3 w-3 text-muted" /> : null}
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        A spending key controls funds. A viewing key can see notes without spending them. A unified address carries multiple receiver types.
      </p>
      <Button onClick={() => setStep((current) => Math.min(current + 1, keySteps.length - 1))} className="mt-4">
        Reveal next step
      </Button>
    </Panel>
  );
}

const transactionSteps = [
  "Select notes to spend",
  "Create shielded outputs",
  "Bind the balance",
  "Prove the statement",
  "Broadcast the transaction",
];

function TransactionDemo() {
  const [step, setStep] = useState(0);
  return (
    <Panel title="Shielded transaction">
      <ol className="space-y-2">
        {transactionSteps.map((item, index) => (
          <li key={item} className={cn("flex items-center gap-3 rounded-lg border px-3 py-2 text-sm", index <= step ? "border-gold/40 bg-gold/10 text-ink" : "border-line text-muted")}>
            <span className="font-mono text-[10px]">{index + 1}</span>
            {item}
            {index < step ? <Check className="ml-auto h-3.5 w-3.5 text-green" /> : null}
          </li>
        ))}
      </ol>
      <Button onClick={() => setStep((current) => (current + 1) % transactionSteps.length)} className="mt-4">
        {step === transactionSteps.length - 1 ? "Restart" : "Next step"}
      </Button>
    </Panel>
  );
}

function ScanDemo() {
  const [scanned, setScanned] = useState(false);
  return (
    <Panel title="Trial decryption">
      <p className="text-sm leading-relaxed text-muted">
        A wallet tries its viewing key against every shielded note. Most attempts fail. A match is a note the wallet can spend.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <div key={index} className={cn("rounded-lg border p-3 font-mono text-[10px]", scanned && index === 1 ? "border-green bg-green/10 text-green" : "border-line bg-paper-2 text-muted")}>
            {scanned ? (index === 1 ? "match: spendable note" : "no match") : `note ${index + 1}`}
          </div>
        ))}
      </div>
      <Button onClick={() => setScanned(true)} className="mt-4">Scan notes</Button>
    </Panel>
  );
}

function ChainDemo() {
  const [blocks, setBlocks] = useState(3);
  return (
    <Panel title="Chain growth">
      <div className="flex flex-wrap items-center gap-2">
        {Array.from({ length: blocks }).map((_, index) => (
          <div key={index} className="rounded-lg border border-line bg-paper-2 px-3 py-2 font-mono text-[10px] text-muted">
            block {index + 1}
          </div>
        ))}
      </div>
      <Button onClick={() => setBlocks((current) => Math.min(current + 1, 8))} className="mt-4">Add block</Button>
      <p className="mt-3 text-xs leading-relaxed text-muted">Each block commits to the previous block header. Changing history changes every later hash.</p>
    </Panel>
  );
}

function DatabaseDemo() {
  const [nodes, setNodes] = useState(5);
  const quorum = Math.floor(nodes / 2) + 1;
  return (
    <Panel title="Distributed database">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 7 }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setNodes(index + 1)}
            className={cn("h-10 w-10 rounded-full border font-mono text-[10px]", index < nodes ? "border-green bg-green/10 text-green" : "border-line bg-paper-2 text-muted")}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">Active nodes: {nodes}. Quorum: {quorum}. A distributed database keeps copies so one failed machine does not erase the record.</p>
    </Panel>
  );
}

function ConsensusDemo() {
  const [support, setSupport] = useState(4);
  const total = 7;
  return (
    <Panel title="Consensus">
      <input
        type="range"
        min={1}
        max={total}
        value={support}
        onChange={(event) => setSupport(Number(event.target.value))}
        className="w-full accent-[var(--gold)]"
        aria-label="Validator support"
      />
      <div className="mt-3 flex gap-1">
        {Array.from({ length: total }).map((_, index) => (
          <span key={index} className={cn("h-3 flex-1 rounded-full", index < support ? "bg-gold" : "bg-paper-3")} />
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">
        {support} of {total} validators support the block. A chain needs enough support to make a competing history impractical.
      </p>
    </Panel>
  );
}

function MiningDemo() {
  const [height, setHeight] = useState(3_500_000);
  const halvings = Math.floor(height / 1_680_000);
  const reward = 50 / 2 ** halvings;
  return (
    <Panel title="Block reward">
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
        <Stat label="Block height" value={height.toLocaleString()} />
        <Stat label="Halvings" value={String(halvings)} />
        <Stat label="Block reward" value={`${reward.toFixed(3)} ZEC`} />
      </div>
    </Panel>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-paper-2 p-3">
      <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">{label}</p>
      <p className="mt-1 font-display text-xl tracking-[-0.03em]">{value}</p>
    </div>
  );
}

function QuizDemo() {
  const [answer, setAnswer] = useState<number | null>(null);
  return (
    <Panel title="Beginner quiz">
      <p className="text-sm font-medium">Which transaction type hides the sender, receiver, and amount?</p>
      <div className="mt-3 grid gap-2">
        {["Transparent", "Shielded", "A block header"].map((option, index) => (
          <button
            key={option}
            type="button"
            onClick={() => setAnswer(index)}
            className={cn("rounded-lg border px-3 py-2 text-left text-sm transition-colors", answer === index ? (index === 1 ? "border-green bg-green/10 text-green" : "border-rust bg-rust/10 text-rust") : "border-line bg-paper-2 hover:border-ink/25")}
          >
            {option}
          </button>
        ))}
      </div>
      {answer !== null ? (
        <p className="mt-3 text-xs text-muted">{answer === 1 ? "Correct. Shielded transactions hide sender, receiver, and amount." : "Not quite. Shielded transactions are the private option."}</p>
      ) : null}
    </Panel>
  );
}

const walletOptions = [
  { name: "ZODL", device: "Mobile", pools: "Transparent, Sapling, Ironwood" },
  { name: "Zingo!", device: "Mobile, Desktop", pools: "Sapling, Orchard, Ironwood" },
  { name: "Zkool", device: "Mobile, Desktop", pools: "Sapling, Orchard, Ironwood" },
  { name: "Keystone", device: "Hardware", pools: "Transparent, Sapling" },
];

function WalletsDemo() {
  const [device, setDevice] = useState("Mobile");
  const options = walletOptions.filter((wallet) => wallet.device.includes(device));
  return (
    <Panel title="Wallet anatomy">
      <div className="flex flex-wrap gap-2">
        {["Mobile", "Desktop", "Hardware"].map((item) => (
          <button key={item} type="button" onClick={() => setDevice(item)} className={cn("h-8 rounded-pill border px-3 text-[10px]", device === item ? "border-gold bg-gold/10 text-gold-deep" : "border-line text-muted")}>
            {item}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-2">
        {options.map((wallet) => (
          <div key={wallet.name} className="flex items-center justify-between rounded-lg border border-line bg-paper-2 px-3 py-2 text-sm">
            <span>{wallet.name}</span>
            <span className="font-mono text-[9px] text-muted">{wallet.pools}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function DexDemo() {
  const [amount, setAmount] = useState(1);
  const [rate, setRate] = useState(0.42);
  return (
    <Panel title="Swap">
      <label className="text-xs text-muted" htmlFor="dex-amount">ZEC in</label>
      <input id="dex-amount" type="number" min={0} value={amount} onChange={(event) => setAmount(Number(event.target.value))} className="mt-2 h-10 w-full rounded-lg border border-line bg-paper-2 px-3 font-mono text-sm outline-none focus:border-gold" />
      <label className="mt-3 block text-xs text-muted" htmlFor="dex-rate">Rate</label>
      <input id="dex-rate" type="number" min={0} step={0.01} value={rate} onChange={(event) => setRate(Number(event.target.value))} className="mt-2 h-10 w-full rounded-lg border border-line bg-paper-2 px-3 font-mono text-sm outline-none focus:border-gold" />
      <p className="mt-4 text-sm text-muted">You receive about <strong className="text-ink">{(amount * rate).toFixed(2)}</strong> on the other side.</p>
    </Panel>
  );
}

function PaymentDemo() {
  const [amount, setAmount] = useState("0.10");
  return (
    <Panel title="Payment request">
      <label className="text-xs text-muted" htmlFor="payment-amount">Amount</label>
      <div className="mt-2 flex items-center gap-2">
        <input id="payment-amount" value={amount} onChange={(event) => setAmount(event.target.value)} className="h-10 w-32 rounded-lg border border-line bg-paper-2 px-3 font-mono text-sm outline-none focus:border-gold" />
        <span className="font-mono text-xs text-muted">ZEC</span>
      </div>
      <p className="mt-4 break-all rounded-lg border border-line bg-paper-2 p-3 font-mono text-[10px] text-muted">
        zcash:u1...?amount={amount || "0"}&memo=ZecHub
      </p>
      <p className="mt-3 text-xs leading-relaxed text-muted">A payment request can carry an amount and an encrypted memo. The wallet builds the shielded transaction.</p>
    </Panel>
  );
}

function SnarkDemo() {
  const [proved, setProved] = useState(false);
  return (
    <Panel title="Proof flow">
      <div className="grid gap-2 sm:grid-cols-3">
        {["Witness", "Proof", "Verification"].map((item, index) => (
          <div key={item} className={cn("rounded-lg border p-3", proved || index < 1 ? "border-gold/40 bg-gold/10" : "border-line bg-paper-2")}>
            <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">0{index + 1}</p>
            <p className="mt-1 text-sm">{item}</p>
          </div>
        ))}
      </div>
      <Button onClick={() => setProved((current) => !current)} className="mt-4">
        {proved ? "Reset" : "Generate proof"}
      </Button>
      <p className="mt-3 text-xs leading-relaxed text-muted">
        {proved ? "The verifier accepts the proof without learning the private inputs." : "The prover knows a witness. The verifier only sees the proof."}
      </p>
    </Panel>
  );
}

function InfrastructureDemo() {
  const [layer, setLayer] = useState(0);
  const layers = ["Application", "Wallet", "Indexer", "Full node", "Network"];
  return (
    <Panel title="Zcash stack">
      <div className="space-y-2">
        {layers.map((item, index) => (
          <button key={item} type="button" onClick={() => setLayer(index)} className={cn("w-full rounded-lg border px-3 py-2 text-left text-sm", layer === index ? "border-gold bg-gold/10 text-ink" : "border-line bg-paper-2 text-muted")}>
            {item}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted">
        {layer === 0 ? "The application asks a wallet for an address or a payment." : layer === 1 ? "The wallet holds keys and builds transactions." : layer === 2 ? "The indexer serves compact chain data to the wallet." : layer === 3 ? "The full node validates consensus rules." : "Peers propagate blocks and transactions."}
      </p>
    </Panel>
  );
}

function StepDemo() {
  const [step, setStep] = useState(0);
  return (
    <Panel title="Try it">
      <p className="text-sm text-muted">Advance through the concept one step at a time.</p>
      <div className="mt-3 flex gap-1">
        {[0, 1, 2, 3].map((index) => (
          <span key={index} className={cn("h-2 flex-1 rounded-full", index <= step ? "bg-gold" : "bg-paper-3")} />
        ))}
      </div>
      <Button onClick={() => setStep((current) => (current + 1) % 4)} className="mt-4">Next</Button>
    </Panel>
  );
}
