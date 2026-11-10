export const formatUsd = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

export const formatCompactUsd = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);

export const formatNumber = (value: number): string =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);

export const formatZec = (value: number): string =>
  `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value)} ZEC`;

export const formatPercent = (value: number): string =>
  `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(value * 100)}%`;

export const initials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
