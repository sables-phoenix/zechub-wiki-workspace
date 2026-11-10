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
};

export const wallets = data as readonly Wallet[];

export const activeWallets = wallets.filter((wallet) => !wallet.deprecated);
export const deprecatedWallets = wallets.filter((wallet) => wallet.deprecated);

export const deviceOptions = ["All", "Mobile", "Desktop", "Web", "Hardware", "Browser"] as const;
export const poolOptions = ["All", "Shielded", "Ironwood", "Sapling", "Transparent"] as const;
export const nu7Options = ["All", "Compatible", "Not Ready", "Not Verified"] as const;

export type DeviceFilter = (typeof deviceOptions)[number];
export type PoolFilter = (typeof poolOptions)[number];
export type Nu7Filter = (typeof nu7Options)[number];

export const matchesDevice = (wallet: Wallet, device: DeviceFilter): boolean => {
  if (device === "All") return true;
  if (device === "Browser") return wallet.devices.some((item) => item.includes("Browser"));
  return wallet.devices.includes(device);
};

export const matchesPool = (wallet: Wallet, pool: PoolFilter): boolean => {
  if (pool === "All") return true;
  if (pool === "Shielded") return wallet.pools.some((item) => item !== "Transparent");
  return wallet.pools.some((item) => item.includes(pool));
};

export const matchesNu7 = (wallet: Wallet, nu7: Nu7Filter): boolean => {
  if (nu7 === "All") return true;
  return wallet.nu7.toLowerCase().includes(nu7.toLowerCase());
};

export const walletSourceUrl = "https://zechub.wiki/wallets";
