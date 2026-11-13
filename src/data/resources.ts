export type ResourceLink = {
  label: string;
  href: string;
  note: string;
  external?: boolean;
};

export const specialPages: readonly ResourceLink[] = [
  {
    label: "Start Here",
    href: "/start-here",
    note: "New to Zcash? Start with the basics.",
  },
  {
    label: "Wallet matrix",
    href: "/wallets",
    note: "Compare wallets by device, pool, system, support, and features.",
  },
  {
    label: "Dashboard",
    href: "/network",
    note: "Live price, supply, shielded value, and pool activity.",
  },
  {
    label: "Tutorials",
    href: "/zechub-tutorial",
    note: "88 video guides from the ZecHub library.",
  },
  {
    label: "Visualizers",
    href: "/visualizer",
    note: "Interactive Zcash explainers and quizzes.",
  },
  {
    label: "Hackathon",
    href: "/hackathon",
    note: "The 2026 ZecHub project archive.",
  },
  {
    label: "Ambassadors",
    href: "/zcash-global-ambassadors",
    note: "Zcash communities around the world.",
  },
  {
    label: "Developers",
    href: "/developers",
    note: "SDKs, docs, nodes, and libraries.",
  },
  {
    label: "Brand",
    href: "/zcash-organizations/brand",
    note: "Logos, icons, and brand folders.",
  },
  {
    label: "SPEDN map",
    href: "/map",
    note: "Find physical stores that accept ZEC.",
  },
  {
    label: "Merchant map",
    href: "/map",
    note: "The in-store map and the ZecMap launch.",
  },
  {
    label: "Donate",
    href: "/donate",
    note: "Addresses and QR codes for five chains.",
  },
  {
    label: "Privacy",
    href: "/privacy",
    note: "How this workspace handles data.",
  },
  {
    label: "Site Navigation",
    href: "/library",
    note: "The full page hierarchy.",
  },
  {
    label: "Contribute",
    href: "/contribute",
    note: "Write, translate, design, or develop.",
  },
];

export const externalResources: readonly ResourceLink[] = [
  {
    label: "Bounties",
    href: "https://bounties.zechub.wiki/",
    note: "Earn ZEC for ZecHub work.",
    external: true,
  },
  {
    label: "Shop",
    href: "https://zechub.store",
    note: "The ZecHub store.",
    external: true,
  },
  {
    label: "ZKAV Club",
    href: "https://zkav.club",
    note: "Zcash audio and video club.",
    external: true,
  },
  {
    label: "Zcash.Me",
    href: "https://zcash.me",
    note: "Zcash links and resources.",
    external: true,
  },
  {
    label: "Free2Z",
    href: "https://free2z.cash",
    note: "Private content and funding for creators.",
    external: true,
  },
  {
    label: "Pay with Zcash",
    href: "https://paywithz.cash",
    note: "Places that accept ZEC.",
    external: true,
  },
  {
    label: "ZecMap",
    href: "https://zecmap.com",
    note: "Global Zcash merchant map.",
    external: true,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UC3-KM00kjCUheRzO5cq3PAA",
    note: "The ZecHub video channel.",
    external: true,
  },
  {
    label: "X",
    href: "https://x.com/zechub",
    note: "ZecHub on X.",
    external: true,
  },
  {
    label: "ZecHub Social",
    href: "https://zechub.social/@Zechub",
    note: "ZecHub on the fediverse.",
    external: true,
  },
  {
    label: "Discord",
    href: "https://discord.gg/zcash",
    note: "The Zcash community Discord.",
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/ZecHub/zechub",
    note: "The source wiki repository.",
    external: true,
  },
  {
    label: "zechub.wiki",
    href: "https://zechub.wiki",
    note: "The original site.",
    external: true,
  },
];
