"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Price = {
  usd: number;
  btc: number;
  marketCap: number;
};

type PriceTickerProps = {
  variant?: "compact" | "card";
  className?: string;
};

const formatUsd = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

export function PriceTicker({ variant = "compact", className }: PriceTickerProps) {
  const [price, setPrice] = useState<Price | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch("/api/price", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as Price;
        if (active) setPrice(data);
      } catch {
        if (active) setPrice(null);
      }
    };

    void load();
    const timer = window.setInterval(() => void load(), 300_000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  if (variant === "compact") {
    return (
      <span className={cn("flex items-center gap-1.5 font-mono text-[9px] text-vault-muted", className)}>
        <span className="h-1 w-1 rounded-full bg-green" />
        ZEC {price ? formatUsd(price.usd) : "---"}
      </span>
    );
  }

  return (
    <div className={cn("rounded-card border border-vault-line bg-vault-2/80 p-4", className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-vault-muted">ZEC / USD</p>
        <span className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.08em] text-vault-muted">
          <span className="h-1 w-1 rounded-full bg-green" />
          Live
        </span>
      </div>
      <p className="mt-2 font-display text-3xl leading-none tracking-[-0.04em] text-vault-text">
        {price ? formatUsd(price.usd) : "---"}
      </p>
      <p className="mt-1 font-mono text-[9px] text-vault-muted">
        {price ? `$${(price.marketCap / 1_000_000_000).toFixed(2)}B market cap` : "Loading network data"}
      </p>
    </div>
  );
}
