"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { MagnifierIcon } from "@/components/animated-icons/magnifier-icon";
import { useI18n } from "@/components/i18n-provider";
import { SectionHero } from "@/components/section-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  activeWallets,
  deprecatedWallets,
  deviceOptions,
  featureOptions,
  matchesDevice,
  matchesFeature,
  matchesNu7,
  matchesOperatingSystem,
  matchesPool,
  matchesSupport,
  nu7Options,
  operatingSystemOptions,
  poolOptions,
  supportOptions,
  walletSourceUrl,
  type Wallet,
} from "@/lib/wallets";

type SortMode = "rating" | "name";

const nu7Tone = (nu7: string): "green" | "gold" | "muted" => {
  if (nu7.includes("Compatible")) return "green";
  if (nu7.includes("Not Ready")) return "gold";
  return "muted";
};

const ratingLabel = (rating: number | null): string => (rating === null ? "—" : String(rating));

export function WalletsView() {
  const { t } = useI18n();
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [query, setQuery] = useState("");
  const [devices, setDevices] = useState<string[]>([]);
  const [pools, setPools] = useState<string[]>([]);
  const [systems, setSystems] = useState<string[]>([]);
  const [supports, setSupports] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [nu7s, setNu7s] = useState<string[]>([]);
  const [sort, setSort] = useState<SortMode>("rating");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/wallet-ratings")
      .then((response) => response.json())
      .then((data: Record<string, number>) => {
        if (!cancelled) setRatings(data);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  const ratedActive = useMemo(
    () => activeWallets.map((wallet) => ({ ...wallet, rating: ratings[wallet.name] ?? wallet.rating })),
    [ratings],
  );
  const ratedDeprecated = useMemo(
    () =>
      deprecatedWallets.map((wallet) => ({
        ...wallet,
        rating: ratings[wallet.name] ?? wallet.rating,
      })),
    [ratings],
  );

  const toggle = (setter: (updater: (current: string[]) => string[]) => void) => (value: string) => {
    setter((current) => {
      if (value === "All") return [];
      return current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
    });
  };

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    return ratedActive
      .filter((wallet) => {
        if (devices.length && !devices.every((device) => matchesDevice(wallet, device))) return false;
        if (pools.length && !pools.every((pool) => matchesPool(wallet, pool))) return false;
        if (systems.length && !systems.every((system) => matchesOperatingSystem(wallet, system))) return false;
        if (supports.length && !supports.every((support) => matchesSupport(wallet, support))) return false;
        if (features.length && !features.every((feature) => matchesFeature(wallet, feature))) return false;
        if (nu7s.length && !nu7s.every((nu7) => matchesNu7(wallet, nu7))) return false;
        if (!value) return true;
        return [
          wallet.name,
          wallet.devices.join(" "),
          wallet.pools.join(" "),
          wallet.operatingSystem.join(" "),
          wallet.walletSupport.join(" "),
          wallet.features.join(" "),
          wallet.nu7,
        ]
          .join(" ")
          .toLowerCase()
          .includes(value);
      })
      .slice()
      .sort((a, b) =>
        sort === "name" ? a.name.localeCompare(b.name) : (b.rating ?? -100) - (a.rating ?? -100),
      );
  }, [query, devices, pools, systems, supports, features, nu7s, sort, ratedActive]);

  const shieldedCount = ratedActive.filter((wallet) =>
    wallet.pools.some((item) => item !== "Transparent"),
  ).length;
  const hardwareCount = ratedActive.filter((wallet) => wallet.devices.includes("Hardware")).length;

  const reset = () => {
    setQuery("");
    setDevices([]);
    setPools([]);
    setSystems([]);
    setSupports([]);
    setFeatures([]);
    setNu7s([]);
  };

  const activeFilterCount =
    devices.length + pools.length + systems.length + supports.length + features.length + nu7s.length;

  return (
    <>
      <SectionHero
        eyebrow={t("shell.wallets", "Wallets")}
        title={t("wallets.title", "Wallets")}
        description={t("wallets.description", "Find and compare secure Zcash wallets supporting shielded addresses, unified addresses, and privacy features on mobile, desktop, and hardware devices.")}
        actions={
          <Button asChild variant="secondary">
            <a href={walletSourceUrl} target="_blank" rel="noreferrer">
              {t("wallets.fullMatrix", "Full matrix")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        }
        meta={
          <>
            <span>{ratedActive.length} {t("wallets.activeWallets", "active wallets")}</span>
            <span>{shieldedCount} {t("wallets.shieldedCapable", "shielded-capable")}</span>
            <span>{hardwareCount} {t("wallets.hardware", "hardware")}</span>
            <span>{deprecatedWallets.length} {t("wallets.deprecated", "deprecated")}</span>
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
                  placeholder={t("wallets.searchPlaceholder", "Search wallets, platforms, features...")}
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
                <option value="rating">{t("wallets.topRated", "Top rated")}</option>
                <option value="name">{t("wallets.aToZ", "A to Z")}</option>
              </select>
            </div>

            <FilterRow
              label={t("wallets.devices", "Devices")}
              options={deviceOptions}
              selected={devices}
              onToggle={toggle(setDevices)}
            />
            <FilterRow label={t("wallets.pools", "Pools")} options={poolOptions} selected={pools} onToggle={toggle(setPools)} />
            <FilterRow
              label={t("wallets.system", "System")}
              options={operatingSystemOptions}
              selected={systems}
              onToggle={toggle(setSystems)}
            />
            <FilterRow label={t("wallets.nu7", "NU7")} options={nu7Options} selected={nu7s} onToggle={toggle(setNu7s)} />

            <details className="border-t border-line pt-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
                  {t("wallets.walletSupport", "Wallet support")}
                </span>
                <span className="font-mono text-[9px] text-muted">
                  {supports.length ? `${supports.length} selected` : "Any"}
                </span>
              </summary>
              <div className="mt-2 max-h-44 overflow-y-auto pr-1 window-scroll">
                <div className="flex flex-wrap gap-1.5">
                  {supportOptions.map((option) => (
                    <FilterChip
                      key={option}
                      active={option === "All" ? supports.length === 0 : supports.includes(option)}
                      onClick={() => toggle(setSupports)(option)}
                    >
                      {option}
                    </FilterChip>
                  ))}
                </div>
              </div>
            </details>

            <details className="border-t border-line pt-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">{t("wallets.features", "Features")}</span>
                <span className="font-mono text-[9px] text-muted">
                  {features.length ? `${features.length} selected` : "Any"}
                </span>
              </summary>
              <div className="mt-2 max-h-56 overflow-y-auto pr-1 window-scroll">
                <div className="flex flex-wrap gap-1.5">
                  {featureOptions.map((option) => (
                    <FilterChip
                      key={option}
                      active={option === "All" ? features.length === 0 : features.includes(option)}
                      onClick={() => toggle(setFeatures)(option)}
                    >
                      {option}
                    </FilterChip>
                  ))}
                </div>
              </div>
            </details>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
            {results.length} {results.length === 1 ? t("wallets.wallet", "wallet") : t("wallets.wallets", "wallets")}
            {activeFilterCount ? ` / ${activeFilterCount} ${t("wallets.filters", "filters")}` : ""}
          </p>
          <button
            type="button"
            onClick={reset}
            className="text-xs text-muted underline underline-offset-4 transition-colors hover:text-ink"
          >
            {t("common.resetFilters", "Reset filters")}
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
            <p className="font-display text-2xl tracking-[-0.03em]">{t("wallets.noMatches", "No wallets match those filters.")}</p>
            <p className="mt-2 text-sm text-muted">{t("wallets.noMatchesCopy", "Try a different device, pool, or feature.")}</p>
          </div>
        )}

        <section className="mt-10 rounded-card border border-rust/40 bg-rust/5 p-5 shadow-stamp">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-rust">{t("wallets.doNotUse", "Do not use")}</p>
              <h2 className="mt-1 text-2xl leading-none tracking-[-0.04em]">{t("wallets.deprecatedTitle", "Deprecated wallets")}</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                {t("wallets.deprecatedCopy", "Kept for reference only. Do not send new funds to these wallets.")}
              </p>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
              {deprecatedWallets.length} {t("wallets.deprecatedEntries", "entries")}
            </span>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {ratedDeprecated.map((wallet) => (
              <WalletCard key={wallet.name} wallet={wallet} deprecated />
            ))}
          </div>
        </section>

        <p className="mt-6 text-xs leading-relaxed text-muted">
          {t(
            "wallets.sourceNote",
            "Ratings are a snapshot. Feature chips open the wallet details in each card. Always verify a wallet before sending funds.",
          )}{" "}
          <a
            href={walletSourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-gold-deep underline underline-offset-4"
          >
            zechub.wiki/wallets
          </a>
        </p>
      </div>
    </>
  );
}

function FilterRow({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: readonly string[];
  selected: readonly string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-start gap-2">
      <span className="w-20 shrink-0 pt-1 font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
        {label}
      </span>
      <div className="flex flex-1 flex-wrap gap-1.5">
        {options.map((option) => (
          <FilterChip
            key={option}
            active={option === "All" ? selected.length === 0 : selected.includes(option)}
            onClick={() => onToggle(option)}
          >
            {option}
          </FilterChip>
        ))}
      </div>
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
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const nu7 = wallet.nu7.replace("NU7: ", "");
  const detailCount = wallet.features.length + wallet.walletSupport.length + wallet.operatingSystem.length;

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
            <Badge tone="rust">{t("wallets.deprecated", "Deprecated")}</Badge>
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

        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          aria-expanded={expanded}
          className="mt-3 flex items-center justify-between border-t border-line pt-3 text-left text-[10px] text-muted transition-colors hover:text-ink"
        >
          <span className="font-mono uppercase tracking-[0.08em]">
            {expanded ? t("wallets.hideDetails", "Hide details") : t("wallets.featureDetails", "Feature details")}
          </span>
          <span className="font-mono">{detailCount}</span>
        </button>

        {expanded ? (
          <div className="mt-3 space-y-3 border-t border-line pt-3">
            <DetailGroup label={t("wallets.walletSupport", "Wallet support")} values={wallet.walletSupport} />
            <DetailGroup label={t("wallets.system", "System")} values={wallet.operatingSystem} />
            <DetailGroup label={t("wallets.features", "Features")} values={wallet.features} />
          </div>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <a
            href={walletSourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[10px] text-muted underline underline-offset-4 transition-colors hover:text-ink"
          >
            {t("common.source", "Source")}
          </a>
          {wallet.href ? (
            <a
              href={wallet.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-pill border border-line px-3 text-[10px] text-ink transition-colors hover:border-ink/30 hover:bg-paper-2"
            >
              {t("common.open", "Open")}
              <ArrowUpRight className="h-3 w-3" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function DetailGroup({ label, values }: { label: string; values: readonly string[] }) {
  if (values.length === 0) return null;
  return (
    <div>
      <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">{label}</p>
      <div className="mt-1.5 flex flex-wrap gap-1">
        {values.map((value) => (
          <span key={value} className="rounded-pill border border-line bg-paper-2 px-2 py-0.5 text-[9px] text-muted">
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}
