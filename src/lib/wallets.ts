import data from "@/data/wallets.json";

export type Wallet = {
  name: string;
  href: string | null;
  image: string | null;
  nu7: string;
  rating: number | null;
  devices: string[];
  pools: string[];
  beta: boolean;
  deprecated: boolean;
  note: string | null;
  operatingSystem: string[];
  walletSupport: string[];
  features: string[];
};

export const wallets = data as readonly Wallet[];

export const activeWallets = wallets.filter((wallet) => !wallet.deprecated);
export const deprecatedWallets = wallets.filter((wallet) => wallet.deprecated);

const unique = (values: readonly string[]): string[] => [...new Set(values)].filter(Boolean);

const poolOrder = [
  "Ironwood",
  "Orchard",
  "Orchard (Legacy)",
  "Penumbra Shielded",
  "RAILGUN (0zkUSDC)",
  "Sapling",
  "Sprout",
  "Transparent",
];

const existingPools = unique(wallets.flatMap((wallet) => wallet.pools));
const otherPools = existingPools.filter((pool) => !poolOrder.includes(pool));

export const deviceOptions = ["All", "Mobile", "Desktop", "Web", "Hardware", "Browser"] as const;
export const poolOptions = ["All", "Shielded", ...poolOrder.filter((pool) => existingPools.includes(pool)), ...otherPools] as const;
export const operatingSystemOptions = [
  "All",
  ...["Android", "iOS", "Linux", "macOS", "Windows", "Browser"].filter((item) =>
    wallets.some((wallet) => wallet.operatingSystem.includes(item)),
  ),
] as const;
export const supportOptions = ["All", ...unique(wallets.flatMap((wallet) => wallet.walletSupport)).sort()] as const;
export const featureOptions = ["All", ...unique(wallets.flatMap((wallet) => wallet.features)).sort()] as const;
export const nu7Options = [
  "All",
  ...unique(wallets.map((wallet) => wallet.nu7.replace("NU7: ", ""))).sort(),
] as const;

export type DeviceFilter = (typeof deviceOptions)[number];
export type PoolFilter = (typeof poolOptions)[number];
export type OperatingSystemFilter = (typeof operatingSystemOptions)[number];
export type SupportFilter = (typeof supportOptions)[number];
export type FeatureFilter = (typeof featureOptions)[number];
export type Nu7Filter = (typeof nu7Options)[number];

export const matchesDevice = (wallet: Wallet, device: string): boolean => {
  if (device === "All") return true;
  if (device === "Browser") return wallet.devices.some((item) => item.includes("Browser"));
  return wallet.devices.includes(device);
};

export const matchesPool = (wallet: Wallet, pool: string): boolean => {
  if (pool === "All") return true;
  if (pool === "Shielded") return wallet.pools.some((item) => item !== "Transparent");
  return wallet.pools.includes(pool);
};

export const matchesNu7 = (wallet: Wallet, nu7: string): boolean => {
  if (nu7 === "All") return true;
  return wallet.nu7.toLowerCase().includes(nu7.toLowerCase());
};

export const matchesOperatingSystem = (wallet: Wallet, operatingSystem: string): boolean =>
  operatingSystem === "All" || wallet.operatingSystem.includes(operatingSystem);

export const matchesSupport = (wallet: Wallet, support: string): boolean =>
  support === "All" || wallet.walletSupport.includes(support);

export const matchesFeature = (wallet: Wallet, feature: string): boolean =>
  feature === "All" || wallet.features.includes(feature);

export const walletSourceUrl = "https://zechub.wiki/wallets";
