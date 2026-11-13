"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatCompactUsd, formatNumber, formatPercent, formatUsd, formatZec } from "@/lib/format";
import type { NetworkSnapshot } from "@/lib/network";

type NetworkTabsProps = {
  network: NetworkSnapshot;
};

const dashboards = [
  {
    id: "zechub",
    label: "ZecHub Dashboard",
    copy: "Analyze Zcash network metrics and trends.",
    href: null,
  },
  {
    id: "governance",
    label: "Governance Dashboard",
    copy: "ZecHub DAO proposals, members, and voting.",
    href: "https://zechub.wiki/dashboard?tab=proposals",
  },
  {
    id: "zcg",
    label: "ZCG Dashboard",
    copy: "Zcash Community Grants tracking and grant activity.",
    href: "https://zechub.wiki/dashboard",
  },
  {
    id: "youtube",
    label: "YouTube Dashboard",
    copy: "Current channel, total videos, and total views.",
    href: "https://zechub.wiki/dashboard",
  },
  {
    id: "code",
    label: "Code Pulse",
    copy: "Code activity across the Zcash ecosystem.",
    href: "https://zechub.wiki/dashboard",
  },
] as const;

const shieldedTransactions = [
  { pool: "Sprout", count: 0 },
  { pool: "Sapling", count: 90 },
  { pool: "Orchard", count: 5 },
  { pool: "Ironwood", count: 788 },
] as const;

export function NetworkTabs({ network }: NetworkTabsProps) {
  const [active, setActive] = useState<string>("zechub");
  const current = dashboards.find((dashboard) => dashboard.id === active) ?? dashboards[0];
  const shieldedPercent = Math.max(0, Math.min(100, network.shieldedShare * 100));
  const transparentPercent = 100 - shieldedPercent;
  const poolTotal = shieldedTransactions.reduce((total, pool) => total + pool.count, 0);

  return (
    <div className="container-page py-8 md:py-10">
      <div
        role="tablist"
        aria-label="ZecHub dashboards"
        className="flex gap-1 overflow-x-auto rounded-pill border border-line bg-paper p-1 window-scroll"
      >
        {dashboards.map((dashboard) => (
          <button
            key={dashboard.id}
            type="button"
            role="tab"
            aria-selected={active === dashboard.id}
            onClick={() => setActive(dashboard.id)}
            className={cn(
              "h-9 shrink-0 rounded-pill px-4 text-xs transition-colors",
              active === dashboard.id
                ? "bg-ink text-paper"
                : "text-muted hover:bg-paper-2 hover:text-ink",
            )}
          >
            {dashboard.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-6">
        {active === "zechub" ? (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {[
                { label: "ZEC price", value: formatUsd(network.priceUsd), detail: `${network.priceBtc.toFixed(8)} BTC` },
                { label: "Market cap", value: formatCompactUsd(network.marketCapUsd), detail: "USD" },
                { label: "Circulating supply", value: formatNumber(network.circulation), detail: "ZEC" },
                { label: "Shielded value", value: formatNumber(network.shieldedZec), detail: "ZEC" },
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

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
              <section className="rounded-card border border-line bg-paper p-6 shadow-stamp md:p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="eyebrow">Supply</p>
                    <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">
                      Shielded and transparent ZEC.
                    </h2>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                    {formatPercent(network.shieldedShare)} shielded
                  </span>
                </div>
                <div className="mt-5 flex h-4 overflow-hidden rounded-full border border-line bg-paper-2">
                  <div className="h-full bg-gold" style={{ width: `${shieldedPercent}%` }} />
                  <div className="h-full bg-slate/40" style={{ width: `${transparentPercent}%` }} />
                </div>
                <div className="mt-3 flex flex-wrap justify-between gap-2 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    Shielded {formatZec(network.shieldedZec)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate/40" />
                    Transparent {formatZec(network.circulation - network.shieldedZec)}
                  </span>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted">
                  The headline values are live. The historical supply chart, year filters, testnet switch, and
                  PNG export live on the original dashboard.
                </p>
              </section>

              <section className="rounded-card border border-line bg-paper p-6 shadow-stamp md:p-8">
                <p className="eyebrow">Shielded TX (24h)</p>
                <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">Pool activity.</h2>
                <div className="mt-5 space-y-3">
                  {shieldedTransactions.map((pool) => {
                    const share = poolTotal > 0 ? (pool.count / poolTotal) * 100 : 0;
                    return (
                      <div key={pool.pool}>
                        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                          <span>{pool.pool}</span>
                          <span>{formatNumber(pool.count)}</span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-paper-2">
                          <div className="h-full rounded-full bg-gold" style={{ width: `${Math.max(share, 0.5)}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted">
                  A snapshot of the shielded transaction split. The live source is the ZecHub dashboard.
                </p>
              </section>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-card border border-vault-line bg-vault p-6 text-vault-text shadow-stamp">
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-vault-muted">Dashboard</p>
                <h2 className="mt-2 font-display text-2xl leading-none tracking-[-0.04em]">ZecHub Dashboard</h2>
                <p className="mt-3 text-sm leading-relaxed text-vault-muted">
                  Live analytics, metrics, shielded pool statistics, DAO treasury status, YouTube stats, and
                  ZCG grants tracking for the Zcash ecosystem.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild>
                    <a href="https://zechub.wiki/dashboard" target="_blank" rel="noreferrer">
                      Open full dashboard
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
                  <li>The shielded share and supply split are computed from the latest values.</li>
                  <li>The pool split is a snapshot. The page revalidates every five minutes.</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-card border border-line bg-paper p-8 shadow-stamp md:p-10">
            <p className="eyebrow">{current.label}</p>
            <h2 className="mt-2 font-display text-4xl leading-none tracking-[-0.04em]">{current.label}</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{current.copy}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              This dashboard lives on zechub.wiki and includes the full interactive data. Open it there and
              choose this tab.
            </p>
            {current.href ? (
              <Button asChild className="mt-5">
                <a href={current.href} target="_blank" rel="noreferrer">
                  Open {current.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
