export type VisualizerKind =
  | "wallets"
  | "pools"
  | "payment"
  | "dex"
  | "hash"
  | "chain"
  | "database"
  | "quiz"
  | "snark"
  | "transaction"
  | "scan"
  | "consensus"
  | "keys"
  | "infrastructure"
  | "mining";

export type VisualizerTool = {
  slug: string;
  titleKey: string;
  title: string;
  description: string;
  category: "basic" | "advanced";
  kind: VisualizerKind;
};

export const visualizerTools: readonly VisualizerTool[] = [
  {
    slug: "zcash-wallets",
    titleKey: "visualizer.t1",
    title: "Introduction to Zcash Wallets",
    description: "See how a wallet stores keys, scans the chain, and builds a private payment.",
    category: "basic",
    kind: "wallets",
  },
  {
    slug: "value-pools",
    titleKey: "visualizer.t2",
    title: "Value Pools & Address Types",
    description: "Compare Sprout, Sapling, Orchard, and Ironwood and the address types that use them.",
    category: "basic",
    kind: "pools",
  },
  {
    slug: "pay-with-zcash",
    titleKey: "visualizer.t3",
    title: "Pay with Zcash",
    description: "Follow a payment from a wallet request to a shielded transaction.",
    category: "basic",
    kind: "payment",
  },
  {
    slug: "zcash-exchanges",
    titleKey: "visualizer.t4",
    title: "Zcash Exchanges (DEX)",
    description: "Trace a swap through a decentralized exchange and see where privacy is preserved.",
    category: "basic",
    kind: "dex",
  },
  {
    slug: "hash-functions",
    titleKey: "visualizer.t5",
    title: "Hash Functions",
    description: "Hash any text and see how a small input becomes a fixed-size digest.",
    category: "basic",
    kind: "hash",
  },
  {
    slug: "blockchain-fundamentals",
    titleKey: "visualizer.t6",
    title: "Zcash Blockchain Fundamentals",
    description: "Add blocks and watch a chain grow, with each block committing to the one before it.",
    category: "basic",
    kind: "chain",
  },
  {
    slug: "distributed-databases",
    titleKey: "visualizer.t7",
    title: "Distributed Databases",
    description: "Toggle nodes and see why agreement needs more than one machine.",
    category: "basic",
    kind: "database",
  },
  {
    slug: "beginner-quiz",
    titleKey: "visualizer.t8",
    title: "Beginner Quiz",
    description: "Check the basics of shielded ZEC, addresses, and privacy.",
    category: "basic",
    kind: "quiz",
  },
  {
    slug: "zk-snarks",
    titleKey: "visualizer.t9",
    title: "zk-SNARKs",
    description: "Step through a proof that reveals validity without revealing the transaction.",
    category: "advanced",
    kind: "snark",
  },
  {
    slug: "shielded-transaction",
    titleKey: "visualizer.t10",
    title: "Build a Shielded Transaction",
    description: "Assemble spends and outputs, then check the balance and the proof.",
    category: "advanced",
    kind: "transaction",
  },
  {
    slug: "wallet-finds-money",
    titleKey: "visualizer.t11",
    title: "How Your Zcash Wallet Finds Your Money",
    description: "Try trial decryption and see how a wallet finds notes that belong to it.",
    category: "advanced",
    kind: "scan",
  },
  {
    slug: "crosslink-protocol",
    titleKey: "visualizer.t12",
    title: "CrossLink Protocol",
    description: "See how finality and validator coordination fit together.",
    category: "advanced",
    kind: "consensus",
  },
  {
    slug: "zcash-keys",
    titleKey: "visualizer.t13",
    title: "Zcash Keys",
    description: "Follow a seed into spending keys, viewing keys, and a shielded address.",
    category: "advanced",
    kind: "keys",
  },
  {
    slug: "zcash-infrastructure",
    titleKey: "visualizer.t14",
    title: "Zcash Infrastructure",
    description: "Separate the node, indexer, wallet, and application layers.",
    category: "advanced",
    kind: "infrastructure",
  },
  {
    slug: "consensus",
    titleKey: "visualizer.t15",
    title: "Consensus",
    description: "Change validator support and see how a network reaches agreement.",
    category: "advanced",
    kind: "consensus",
  },
  {
    slug: "zcash-mining",
    titleKey: "visualizer.t16",
    title: "Zcash Mining",
    description: "Move the block height and watch the block reward change.",
    category: "advanced",
    kind: "mining",
  },
];

export const getVisualizerTool = (slug: string): VisualizerTool | undefined =>
  visualizerTools.find((tool) => tool.slug === slug);
