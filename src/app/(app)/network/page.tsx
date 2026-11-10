import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { formatCompactUsd, formatNumber, formatPercent, formatUsd, formatZec } from "@/lib/format";
import { getNetworkSnapshot } from "@/lib/network";

export const metadata: Metadata = {
  title: "Network",
  description: "Live Zcash network metrics from the ZecHub API.",
};

export const revalidate = 300;

export default async function NetworkPage() {
  const network = await getNetworkSnapshot();

  return (
    <>
      <SectionHero
        eyebrow="Network"
        title="The chain is moving."
        description="Price, supply, shielded value, and block activity. A calm read on the live Zcash network, pulled from the same API behind the ZecHub dashboard."
        actions={
          <Button asChild variant="secondary">
            <a href="https://zechub.wiki/dashboard" target="_blank" rel="noreferrer">
              Full dashboard
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        }
        meta={
          <>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-green" />
              {network.live ? "Live data" : "Cached snapshot"}
            </span>
            <span>Updated every 5 minutes</span>
            <span>Source: zechub.wiki/api</span>
          </>
        }
      />

      <div className="container-page space-y-6 py-8 md:py-10">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {[
            { label: "ZEC price", value: formatUsd(network.priceUsd), detail: `${network.priceBtc.toFixed(8)} BTC` },
            { label: "Market cap", value: formatCompactUsd(network.marketCapUsd), detail: "USD" },
            { label: "Circulating supply", value: `${formatNumber(network.circulation)}`, detail: "ZEC" },
            { label: "Shielded value", value: `${formatNumber(network.shieldedZec)}`, detail: "ZEC" },
            { label: "Block height", value: formatNumber(network.blocks), detail: "mainnet" },
            { label: "Transactions (24h)", value: formatNumber(network.transactions24h), detail: "all pools" },
          ].map((item) => (
            <div key={item.label} className="rounded-card border border-line bg-paper p-5 shadow-stamp">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">{item.label}</p>
              <p className="mt-3 font-display text-4xl leading-none tracking-[-0.05em]">{item.value}</p>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">{item.detail}</p>
            </div>
          ))}
        </div>

        <section className="rounded-card border border-line bg-paper p-6 shadow-stamp md:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Shielded share</p>
              <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">
                {formatPercent(network.shieldedShare)} of circulating ZEC is shielded.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted">
                {formatZec(network.shieldedZec)} sits in shielded pools, out of {formatZec(network.circulation)} in
                circulation.
              </p>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              {network.live ? "Live" : "Cached"}
            </span>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full border border-line bg-paper-2">
            <div
              className="h-full rounded-full bg-gold"
              style={{ width: `${Math.max(1, Math.min(100, network.shieldedShare * 100))}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[8px] uppercase tracking-[0.08em] text-muted">
            <span>0%</span>
            <span>Transparent + shielded</span>
            <span>100%</span>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-card border border-vault-line bg-vault p-6 text-vault-text shadow-stamp">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-vault-muted">Read the source</p>
            <h2 className="mt-2 font-display text-2xl leading-none tracking-[-0.04em]">
              The dashboard has the charts.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-vault-muted">
              Supply history, shielded pools, testnet, and the other ZecHub dashboards live on the original site.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild>
                <a href="https://zechub.wiki/dashboard" target="_blank" rel="noreferrer">
                  Open dashboard
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/library">Read the wiki</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-card border border-line bg-paper-2 p-6 shadow-stamp">
            <p className="eyebrow">Data notes</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
              <li>Price and market cap come from the ZecHub price API.</li>
              <li>Circulation, shielded value, blocks, and 24h transactions come from the ZecHub chain API.</li>
              <li>The shielded share is computed from the latest two values.</li>
              <li>The page revalidates every five minutes.</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
