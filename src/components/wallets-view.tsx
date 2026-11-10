"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { MagnifierIcon } from "@/components/animated-icons/magnifier-icon";
import { SectionHero } from "@/components/section-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  activeWallets,
  deprecatedWallets,
  deviceOptions,
  matchesDevice,
  matchesNu7,
  matchesPool,
  nu7Options,
  poolOptions,
  walletSourceUrl,
  type DeviceFilter,
  type Nu7Filter,
  type PoolFilter,
  type Wallet,
} from "@/lib/wallets";

type SortMode = "rating" | "name";

const nu7Tone = (nu7: string): "green" | "gold" | "muted" => {
  if (nu7.includes("Compatible")) return "green";
  if (nu7.includes("Not Ready")) return "gold";
  return "muted";
};

const ratingLabel = (rating: number | null): string => {
  if (rating === null) return "—";
  return String(rating);
};

export function WalletsView() {
  const [query, setQuery] = useState("");
  const [device, setDevice] = useState<DeviceFilter>("All");
  const [pool, setPool] = useState<PoolFilter>("All");
  const [nu7, setNu7] = useState<Nu7Filter>("All");
  const [sort, setSort] = useState<SortMode>("rating");

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    return activeWallets
      .filter((wallet) => {
        if (!matchesDevice(wallet, device)) return false;
        if (!matchesPool(wallet, pool)) return false;
        if (!matchesNu7(wallet, nu7)) return false;
        if (!value) return true;
        return [wallet.name, wallet.devices.join(" "), wallet.pools.join(" "), wallet.nu7]
          .join(" ")
          .toLowerCase()
          .includes(value);
      })
      .slice()
      .sort((a, b) =>
        sort === "name"
          ? a.name.localeCompare(b.name)
          : (b.rating ?? -100) - (a.rating ?? -100),
      );
  }, [query, device, pool, nu7, sort]);

  const shieldedCount = activeWallets.filter((wallet) =>
    wallet.pools.some((item) => item !== "Transparent"),
  ).length;
  const hardwareCount = activeWallets.filter((wallet) => wallet.devices.includes("Hardware")).length;

  const reset = () => {
    setQuery("");
    setDevice("All");
    setPool("All");
    setNu7("All");
  };

  return (
    <>
      <SectionHero
        eyebrow="Wallets"
        title="Pick a wallet that matches your privacy."
        description="Thirty-eight wallets, compared by device, shielded pool, and NU7 readiness. The matrix is compiled from the ZecHub wallet page."
        actions={
          <Button asChild variant="secondary">
            <a href={walletSourceUrl} target="_blank" rel="noreferrer">
              Full matrix
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        }
        meta={
          <>
            <span>{activeWallets.length} active wallets</span>
            <span>{shieldedCount} shielded-capable</span>
            <span>{hardwareCount} hardware</span>
            <span>{deprecatedWallets.length} deprecated</span>
          </>
        }
      />

      <div className="container-page py-8 md:py-10">
        <div className="rounded-card border border-line bg-paper p-4 shadow-stamp md:p-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="relative flex-1">
                <MagnifierIcon
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search wallets, devices, pools..."
                  className="h-10 pl-9"
                  aria-label="Search wallets"
                />
              </div>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortMode)}
                aria-label="Sort wallets"
                className="h-10 rounded-pill border border-line bg-paper px-4 text-xs text-ink outline-none focus:border-gold"
              >
                <option value="rating">Top rated</option>
                <option value="name">A to Z</option>
              </select>
            </div>

            <FilterRow label="Devices">
              {deviceOptions.map((option) => (
                <FilterChip key={option} active={device === option} onClick={() => setDevice(option)}>
                  {option}
                </FilterChip>
              ))}
            </FilterRow>

            <FilterRow label="Pools">
              {poolOptions.map((option) => (
                <FilterChip key={option} active={pool === option} onClick={() => setPool(option)}>
                  {option}
                </FilterChip>
              ))}
            </FilterRow>

            <FilterRow label="NU7">
              {nu7Options.map((option) => (
                <FilterChip key={option} active={nu7 === option} onClick={() => setNu7(option)}>
                  {option}
                </FilterChip>
              ))}
            </FilterRow>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            {results.length} {results.length === 1 ? "wallet" : "wallets"}
          </p>
          <button
            type="button"
            onClick={reset}
            className="text-xs text-muted underline underline-offset-4 transition-colors hover:text-ink"
          >
            Reset filters
          </button>
        </div>

        {results.length > 0 ? (
          <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {results.map((wallet) => (
              <WalletCard key={wallet.name} wallet={wallet} />
            ))}
          </div>
        ) : (
          <div className="mt-3 rounded-card border border-dashed border-line p-10 text-center">
            <p className="font-display text-2xl tracking-[-0.03em]">No wallets match those filters.</p>
            <p className="mt-2 text-sm text-muted">Try a different device or pool.</p>
          </div>
        )}

        <section className="mt-10 rounded-card border border-rust/40 bg-rust/5 p-5 shadow-stamp">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-rust">Do not use</p>
              <h2 className="mt-1 text-2xl leading-none tracking-[-0.04em]">Deprecated wallets</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                Kept for reference only. Do not send new funds to these wallets.
              </p>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
              {deprecatedWallets.length} entries
            </span>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {deprecatedWallets.map((wallet) => (
              <WalletCard key={wallet.name} wallet={wallet} deprecated />
            ))}
          </div>
        </section>

        <p className="mt-6 text-xs leading-relaxed text-muted">
          Device, pool, NU7, and rating data from{" "}
          <a
            href={walletSourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-gold-deep underline underline-offset-4"
          >
            zechub.wiki/wallets
          </a>
          . Feature-level details live in the source matrix. Always verify a wallet before sending funds.
        </p>
      </div>
    </>
  );
}

function FilterRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-16 shrink-0 font-mono text-[8px] uppercase tracking-[0.1em] text-muted">{label}</span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-7 rounded-pill border px-3 text-[10px] transition-colors",
        active
          ? "border-ink bg-ink text-paper"
          : "border-line bg-paper text-muted hover:border-ink/30 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function WalletCard({ wallet, deprecated = false }: { wallet: Wallet; deprecated?: boolean }) {
  const nu7 = wallet.nu7.replace("NU7: ", "");

  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-card border border-line bg-paper shadow-stamp",
        deprecated && "opacity-80",
      )}
    >
      <div className="flex h-32 items-center justify-center bg-[#fffdf7] p-5">
        {wallet.image ? (
          <img
            src={wallet.image}
            alt={`${wallet.name} logo`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="max-h-20 w-full object-contain"
          />
        ) : (
          <span className="font-display text-3xl text-[#14130f]">{wallet.name.slice(0, 1)}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl leading-tight tracking-[-0.03em]">{wallet.name}</h3>
          <span className="flex shrink-0 items-center gap-1 font-mono text-[9px] text-gold-deep">
            <Star className="h-3 w-3 fill-gold text-gold" />
            {ratingLabel(wallet.rating)}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {deprecated ? (
            <Badge tone="rust">Deprecated</Badge>
          ) : nu7 ? (
            <Badge tone={nu7Tone(wallet.nu7)}>{nu7}</Badge>
          ) : null}
          {wallet.beta ? <Badge tone="slate">Beta</Badge> : null}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {wallet.devices.map((item) => (
            <span key={item} className="rounded-pill border border-line bg-paper-2 px-2 py-0.5 text-[9px] text-muted">
              {item}
            </span>
          ))}
        </div>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {wallet.pools.map((item) => (
            <span
              key={item}
              className={cn(
                "rounded-pill border px-2 py-0.5 text-[9px]",
                item === "Transparent"
                  ? "border-line bg-paper-2 text-muted"
                  : "border-gold/40 bg-gold/10 text-gold-deep",
              )}
            >
              {item}
            </span>
          ))}
        </div>

        {wallet.note ? <p className="mt-3 text-[11px] leading-relaxed text-muted">{wallet.note}</p> : null}

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <a
            href={walletSourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[10px] text-muted underline underline-offset-4 transition-colors hover:text-ink"
          >
            Details
          </a>
          {wallet.href ? (
            <a
              href={wallet.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-pill border border-line px-3 text-[10px] text-ink transition-colors hover:border-ink/30 hover:bg-paper-2"
            >
              Open
              <ArrowUpRight className="h-3 w-3" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
