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
  | "crosslink"
  | "keys"
  | "infrastructure"
  | "consensus"
  | "mining"
  | "privacy"
  | "governance"
  | "frost"
  | "bounties"
  | "dao";

export type VisualizerSlide = {
  title: string;
  body: string;
  points?: readonly string[];
  question?: string;
  options?: readonly string[];
  answer?: number;
  explanation?: string;
};

export type VisualizerTool = {
  slug: string;
  titleKey: string;
  title: string;
  description: string;
  category: "basic" | "advanced" | "contributors";
  kind: VisualizerKind;
  slides: readonly VisualizerSlide[];
};

export const visualizerTools: readonly VisualizerTool[] = [
  {
    slug: "zcash-wallets",
    titleKey: "visualizer.t1",
    title: "Introduction to Zcash Wallets",
    description: "Providing shielded functionality.",
    category: "basic",
    kind: "wallets",
    slides: [
      {
        title: "A wallet is a key holder",
        body: "A Zcash wallet does not store coins. It stores keys and scans the chain for notes that those keys can spend.",
        points: ["Keys stay on your device", "The chain holds encrypted notes", "A wallet turns notes into spendable balance"],
      },
      {
        title: "Spending and viewing keys",
        body: "The spending key controls funds. A full viewing key can see incoming and outgoing notes without spending them.",
        points: ["Spending key: authority to spend", "Viewing key: read-only visibility", "Unified address: multiple receiver types"],
      },
      {
        title: "Scanning for your notes",
        body: "The wallet tries its viewing key against new shielded notes. Most attempts fail. A successful match belongs to you.",
        points: ["Trial decryption is local", "Matches become spendable notes", "Wrong keys reveal nothing"],
      },
      {
        title: "Building a private payment",
        body: "The wallet selects notes, creates shielded outputs, balances the transaction, and generates a proof.",
        points: ["Select notes", "Create outputs", "Prove and broadcast"],
      },
      {
        title: "Choose the device that fits",
        body: "Mobile wallets are convenient. Desktop wallets can run alongside a full node. Hardware wallets keep keys offline.",
        points: ["Mobile for everyday use", "Desktop for node users", "Hardware for cold storage"],
      },
    ],
  },
  {
    slug: "value-pools",
    titleKey: "visualizer.t2",
    title: "Value Pools & Address Types",
    description: "Explore Zcash privacy pools and address types.",
    category: "basic",
    kind: "pools",
    slides: [
      {
        title: "Value lives in pools",
        body: "Zcash tracks shielded value in protocol pools. Each pool has its own circuit, address format, and privacy properties.",
        points: ["Sprout: the original pool", "Sapling: faster proofs", "Orchard and Ironwood: newer shielded designs"],
      },
      {
        title: "What a shielded pool hides",
        body: "A shielded transaction does not reveal sender, receiver, or amount on the public ledger.",
        points: ["Encrypted notes", "Nullifiers prevent double spends", "Commitments bind value"],
      },
      {
        title: "Address types",
        body: "Transparent addresses expose balances and history. Sapling addresses are shielded. Unified addresses can carry multiple receivers.",
        points: ["t-address: transparent", "z-address: shielded", "u-address: unified"],
      },
      {
        title: "Choosing a receiver",
        body: "A unified address lets the sender choose a compatible receiver while the wallet preserves the user's privacy preference.",
        points: ["Receiver selection", "Pool compatibility", "Wallet policy"],
      },
      {
        title: "Privacy is more than an address",
        body: "The pool, the wallet, the memo, and the way you fund the wallet all affect the privacy you get.",
        points: ["Shield before spending", "Avoid linking identities", "Use the newest pool where appropriate"],
      },
    ],
  },
  {
    slug: "pay-with-zcash",
    titleKey: "visualizer.t3",
    title: "Pay with Zcash",
    description: "Discover where and how to use ZEC for private payments.",
    category: "basic",
    kind: "payment",
    slides: [
      {
        title: "A payment starts with a request",
        body: "The receiver shares an address or a payment URI with an amount and an optional encrypted memo.",
        points: ["Address or URI", "Amount", "Memo"],
      },
      {
        title: "The wallet builds the transaction",
        body: "The sender's wallet selects notes and creates outputs for the receiver and for change.",
        points: ["Inputs", "Outputs", "Change"],
      },
      {
        title: "The proof does the work",
        body: "A zero-knowledge proof shows that the transaction balances without exposing the private values.",
        points: ["No visible amounts", "No visible parties", "Validity still checked"],
      },
      {
        title: "Broadcast and confirm",
        body: "The transaction goes to a node, then to peers. The receiver's wallet scans for the note.",
        points: ["Node accepts", "Peers relay", "Receiver decrypts"],
      },
      {
        title: "Pay in the real world",
        body: "Merchants can accept ZEC through wallets, payment processors, or in-store networks such as Flexa.",
        points: ["Online checkout", "In-store", "Peer to peer"],
      },
    ],
  },
  {
    slug: "zcash-exchanges",
    titleKey: "visualizer.t4",
    title: "Zcash Exchanges (DEX)",
    description: "Permissionless, censorship-resistant access to ZEC using decentralized exchanges.",
    category: "basic",
    kind: "dex",
    slides: [
      {
        title: "Custodial or non-custodial",
        body: "A centralized exchange holds your keys. A decentralized exchange lets you keep control while you swap.",
        points: ["Custodial: account and withdrawal", "Non-custodial: wallet to wallet", "Know who holds the keys"],
      },
      {
        title: "An atomic swap",
        body: "Two parties lock assets and reveal a secret that lets each side claim the other asset. Either the swap completes or both refund.",
        points: ["Hash lock", "Time lock", "No middleman"],
      },
      {
        title: "Routing a trade",
        body: "A DEX router finds a path between assets. ZEC can move through a bridge, a pool, or a native pair.",
        points: ["Asset pair", "Liquidity", "Slippage"],
      },
      {
        title: "Shield the result",
        body: "The swap may happen on a transparent chain. The privacy step comes when you move the result into a shielded Zcash address.",
        points: ["Swap output", "Shielded withdrawal", "Fresh address"],
      },
      {
        title: "The tradeoffs",
        body: "DEXs remove custody risk but add smart-contract, bridge, liquidity, and user-interface risk.",
        points: ["Contract risk", "Bridge risk", "Verify the route"],
      },
    ],
  },
  {
    slug: "hash-functions",
    titleKey: "visualizer.t5",
    title: "Hash Functions",
    description: "What is a hash function?",
    category: "basic",
    kind: "hash",
    slides: [
      {
        title: "A digital fingerprint",
        body: "A hash function turns any input into a fixed-size output. The output is a fingerprint of the data.",
        points: ["Any input", "Fixed output", "64 hex characters for SHA-256"],
      },
      {
        title: "Deterministic",
        body: "The same input always produces the same hash. Change one character and the output changes completely.",
        points: ["Same input, same output", "Tiny change, new digest", "No guessing the input"],
      },
      {
        title: "One-way",
        body: "Hashing is easy. Reversing a hash is impractical. That is why hashes can protect passwords and commitments.",
        points: ["Fast forward", "Hard reverse", "Collision resistance"],
      },
      {
        title: "The avalanche effect",
        body: "A one-character edit should produce an unrelated-looking digest. This property makes hashes useful for integrity checks.",
        points: ["Type a word", "Hash it", "Edit one letter"],
      },
      {
        title: "Hashes in a chain",
        body: "Merkle trees combine hashes so a whole block of transactions can be committed to with one root.",
        points: ["Leaves", "Branches", "Root"],
      },
    ],
  },
  {
    slug: "blockchain-fundamentals",
    titleKey: "visualizer.t6",
    title: "Zcash Blockchain Fundamentals",
    description: "Understanding the Zcash blockchain foundation.",
    category: "basic",
    kind: "chain",
    slides: [
      {
        title: "Blocks are batches",
        body: "A block groups transactions and a header. The header commits to the previous block and to the transactions in this block.",
        points: ["Transactions", "Header", "Previous hash"],
      },
      {
        title: "The chain is linked",
        body: "Each block includes the hash of the block before it. Changing an old block changes every later hash.",
        points: ["Hash links", "Ordered history", "Tamper evidence"],
      },
      {
        title: "Headers carry commitments",
        body: "The header commits to the transaction root, the state of the shielded pools, and the consensus rules in use.",
        points: ["Transaction root", "Pool commitments", "Network upgrade"],
      },
      {
        title: "Nodes validate",
        body: "Full nodes check every transaction and block against the consensus rules. A valid-looking block is not enough.",
        points: ["Check signatures", "Check proofs", "Check supply"],
      },
      {
        title: "Why it matters",
        body: "A chain is useful because every participant can verify the same ordered history without trusting a single server.",
        points: ["Shared history", "Independent verification", "No central ledger keeper"],
      },
    ],
  },
  {
    slug: "distributed-databases",
    titleKey: "visualizer.t7",
    title: "Distributed Databases",
    description: "Compare centralized databases with blockchains.",
    category: "basic",
    kind: "database",
    slides: [
      {
        title: "One database, one controller",
        body: "A centralized database is fast and simple, but the operator can change the record.",
        points: ["Single writer", "Trusted operator", "Easy updates"],
      },
      {
        title: "Copies across machines",
        body: "A distributed database keeps replicas. If one machine fails, another can answer.",
        points: ["Replication", "Failover", "Consistency"],
      },
      {
        title: "Quorum",
        body: "Many systems require a majority of nodes to agree before a write is accepted.",
        points: ["Majority", "Conflict resolution", "Availability tradeoff"],
      },
      {
        title: "What a blockchain adds",
        body: "A blockchain adds cryptographic commitments and consensus rules so unrelated parties can share a history.",
        points: ["Hashes", "Signatures", "Shared rules"],
      },
      {
        title: "Choose the right tool",
        body: "Not every problem needs a blockchain. Use one when shared verification matters more than raw speed.",
        points: ["Trust model", "Coordination", "Cost"],
      },
    ],
  },
  {
    slug: "beginner-quiz",
    titleKey: "visualizer.t8",
    title: "Beginner Quiz",
    description: "Test your knowledge with a short quiz.",
    category: "basic",
    kind: "quiz",
    slides: [
      {
        title: "Question 1",
        body: "What does a shielded transaction hide?",
        question: "What does a shielded transaction hide?",
        options: ["Only the amount", "The sender, receiver, and amount", "Nothing"],
        answer: 1,
        explanation: "Shielded transactions hide the parties and the amount while the network still verifies validity.",
      },
      {
        title: "Question 2",
        body: "What does a viewing key do?",
        question: "What does a viewing key do?",
        options: ["Spends notes", "Reads notes without spending", "Mines blocks"],
        answer: 1,
        explanation: "A viewing key gives visibility without spending authority.",
      },
      {
        title: "Question 3",
        body: "Which address type is transparent?",
        question: "Which address type is transparent?",
        options: ["u1...", "zs1...", "t1..."],
        answer: 2,
        explanation: "Transparent addresses begin with t and expose activity on the public ledger.",
      },
      {
        title: "Question 4",
        body: "What is a note?",
        question: "What is a note?",
        options: ["A shielded payment record", "A block header", "A mining pool"],
        answer: 0,
        explanation: "A note is an encrypted record of value that a wallet can decrypt and spend.",
      },
      {
        title: "Question 5",
        body: "Why shield before spending?",
        question: "Why shield before spending?",
        options: ["It increases the block size", "It breaks the link to your transparent funding history", "It lowers the fee"],
        answer: 1,
        explanation: "Shielding first makes it harder to link later payments back to the address that funded the wallet.",
      },
    ],
  },
  {
    slug: "zk-snarks",
    titleKey: "visualizer.t9",
    title: "zk-SNARKs",
    description: "Interactive demonstration of shielded transactions.",
    category: "advanced",
    kind: "snark",
    slides: [
      {
        title: "The claim",
        body: "A prover claims that a transaction is valid without revealing the private inputs.",
        points: ["Balanced inputs and outputs", "Authorized spends", "No double spend"],
      },
      {
        title: "The witness",
        body: "The witness is the secret data: keys, note values, and randomness. It stays with the prover.",
        points: ["Private inputs", "Never broadcast", "Used to build the proof"],
      },
      {
        title: "The proof",
        body: "The proof is a small object that a verifier can check. It reveals no private values.",
        points: ["Succinct", "Non-interactive", "Bound to the statement"],
      },
      {
        title: "The verifier",
        body: "The verifier checks the proof against public inputs such as the transaction and the pool state.",
        points: ["Public statement", "Proof check", "Accept or reject"],
      },
      {
        title: "Zero knowledge",
        body: "The verifier learns that the statement is true and nothing else.",
        points: ["Validity", "Privacy", "No witness leak"],
      },
    ],
  },
  {
    slug: "build-shielded-transaction",
    titleKey: "visualizer.t10",
    title: "Build a Shielded Transaction",
    description: "Step-by-step construction of a shielded transaction.",
    category: "advanced",
    kind: "transaction",
    slides: [
      {
        title: "Select notes",
        body: "The wallet chooses spendable notes that cover the payment and the fee.",
        points: ["Spendable notes", "Enough value", "Avoid unnecessary inputs"],
      },
      {
        title: "Create outputs",
        body: "The receiver gets a note. The sender gets a change note. Both are encrypted to the right keys.",
        points: ["Receiver", "Change", "Memo"],
      },
      {
        title: "Balance the value",
        body: "The public value balance must balance. Shielded inputs and outputs stay hidden inside the proof.",
        points: ["Inputs", "Outputs", "Fee"],
      },
      {
        title: "Prove the spend",
        body: "The proof shows ownership, no double spend, and correct value conservation.",
        points: ["Spend authority", "Nullifier", "Balance"],
      },
      {
        title: "Broadcast",
        body: "The node checks the proof and the public fields, then relays the transaction.",
        points: ["Proof check", "Consensus", "Propagation"],
      },
    ],
  },
  {
    slug: "wallet-finds-money",
    titleKey: "visualizer.t11",
    title: "How Your Zcash Wallet Finds Your Money",
    description: "Watch a wallet scan blocks, decrypt its notes and spot its own spends.",
    category: "advanced",
    kind: "scan",
    slides: [
      {
        title: "New blocks arrive",
        body: "The wallet receives compact block data and looks for shielded outputs.",
        points: ["Compact blocks", "Chain sync", "Local scan"],
      },
      {
        title: "Trial decryption",
        body: "The wallet tries its keys against each output. A failed attempt looks like random data.",
        points: ["Try the key", "Fail quietly", "No privacy leak"],
      },
      {
        title: "A match",
        body: "When decryption succeeds, the wallet learns the note value, memo, and spend condition.",
        points: ["Value", "Memo", "Spend key"],
      },
      {
        title: "Watch for spends",
        body: "The wallet also scans for nullifiers that reveal when its notes have been spent.",
        points: ["Nullifier", "Spent note", "Update balance"],
      },
      {
        title: "The result",
        body: "The wallet builds a private balance from notes only it can read.",
        points: ["No account server", "Local keys", "Private scan"],
      },
    ],
  },
  {
    slug: "crosslink-protocol",
    titleKey: "visualizer.t12",
    title: "CrossLink Protocol",
    description: "Hybrid PoW + BFT finality: how CrossLink seals Zcash blocks.",
    category: "advanced",
    kind: "crosslink",
    slides: [
      {
        title: "Two layers",
        body: "CrossLink combines proof of work with a Byzantine fault tolerant finality layer.",
        points: ["PoW ordering", "BFT voting", "Hybrid security"],
      },
      {
        title: "Blocks are proposed",
        body: "Producers extend the chain. Validators observe the block and prepare to vote.",
        points: ["Proposal", "Validation", "Vote"],
      },
      {
        title: "Validators vote",
        body: "A supermajority of validators can finalize a block. PoW still provides the base chain.",
        points: ["Supermajority", "Finality", "No reorg after finality"],
      },
      {
        title: "Why finality matters",
        body: "Finality gives users and bridges a clear point where a transaction cannot be reverted by a longer chain.",
        points: ["Exchange deposits", "Bridges", "Settlement"],
      },
      {
        title: "The tradeoff",
        body: "Finality adds coordination. The design keeps PoW as the base and uses the finality layer to seal history.",
        points: ["Liveness", "Safety", "Validator set"],
      },
    ],
  },
  {
    slug: "zcash-keys",
    titleKey: "visualizer.t13",
    title: "Zcash Keys",
    description: "Understanding Zcash keys.",
    category: "advanced",
    kind: "keys",
    slides: [
      {
        title: "Start with a seed",
        body: "A seed phrase backs up a whole wallet. Treat it like the wallet itself.",
        points: ["Seed phrase", "Backup", "Never share"],
      },
      {
        title: "Derive the spending key",
        body: "The spending key is the authority to spend notes in an account.",
        points: ["Spending key", "Account", "Spend authority"],
      },
      {
        title: "Separate viewing",
        body: "A full viewing key can read notes and history without spending. It is useful for accounting and audits.",
        points: ["Full viewing key", "Incoming view", "Outgoing view"],
      },
      {
        title: "Build the address",
        body: "An address encodes the receiver types a wallet can use. A unified address can carry more than one receiver.",
        points: ["Sapling receiver", "Orchard receiver", "Unified address"],
      },
      {
        title: "Backup and recovery",
        body: "Without the seed or keys, a wallet cannot recover shielded notes. Back up before you fund.",
        points: ["Seed", "Backup", "Recovery"],
      },
    ],
  },
  {
    slug: "zcash-infrastructure",
    titleKey: "visualizer.t14",
    title: "Zcash Infrastructure",
    description: "How Zcash components work together.",
    category: "advanced",
    kind: "infrastructure",
    slides: [
      {
        title: "The network",
        body: "Nodes validate blocks and relay transactions. The network is the shared source of chain state.",
        points: ["Peers", "Blocks", "Consensus"],
      },
      {
        title: "The full node",
        body: "A full node checks every rule. Zebra and Zallet are the current stack; zcashd is retired.",
        points: ["Zebra", "Zallet", "Validation"],
      },
      {
        title: "The indexer",
        body: "An indexer such as Zaino serves compact chain data to wallets without making every wallet run a full node.",
        points: ["Zaino", "Compact blocks", "Wallet queries"],
      },
      {
        title: "The wallet",
        body: "The wallet holds keys, scans notes, and builds transactions. It depends on the node and indexer for chain data.",
        points: ["Keys", "Scanning", "Transactions"],
      },
      {
        title: "The application",
        body: "Apps, exchanges, and payment processors sit above the wallet and node. Each layer has a different trust boundary.",
        points: ["Applications", "APIs", "Users"],
      },
    ],
  },
  {
    slug: "consensus",
    titleKey: "visualizer.t15",
    title: "Consensus",
    description: "How do hundreds of nodes agree on chain state?",
    category: "advanced",
    kind: "consensus",
    slides: [
      {
        title: "Rules first",
        body: "Every node runs the same consensus rules. A block that breaks them is rejected no matter who produced it.",
        points: ["Validation", "Deterministic rules", "No central authority"],
      },
      {
        title: "Many peers",
        body: "Nodes gossip blocks and transactions. Different nodes may see different blocks at the same time.",
        points: ["Gossip", "Latency", "Competing tips"],
      },
      {
        title: "Choose a chain",
        body: "Nodes follow the valid chain with the most work. Difficulty makes history expensive to rewrite.",
        points: ["Most work", "Difficulty", "Reorg"],
      },
      {
        title: "Agreement",
        body: "When the network converges on one valid chain, nodes share the same state.",
        points: ["Convergence", "Finality", "Confirmations"],
      },
      {
        title: "Why it holds",
        body: "Consensus is a mix of cryptographic verification, economic cost, and network coordination.",
        points: ["Cryptography", "Cost", "Coordination"],
      },
    ],
  },
  {
    slug: "zcash-mining",
    titleKey: "visualizer.t16",
    title: "Zcash Mining",
    description: "Understanding Equihash mining and recursive zero-knowledge proofs.",
    category: "advanced",
    kind: "mining",
    slides: [
      {
        title: "Equihash",
        body: "Zcash uses Equihash, a memory-hard proof of work designed to resist specialized hardware advantages.",
        points: ["Memory hard", "Proof of work", "Block security"],
      },
      {
        title: "Build a block",
        body: "Miners select transactions, build a block template, and search for a valid header.",
        points: ["Transactions", "Header", "Nonce"],
      },
      {
        title: "The reward",
        body: "The block reward pays the miner and the protocol's funding streams. It halves on a schedule.",
        points: ["Block subsidy", "Fees", "Halving"],
      },
      {
        title: "Recursive proofs",
        body: "Recursive zero-knowledge proofs can compress verification of earlier blocks into a small proof.",
        points: ["Proof composition", "Chain compression", "Verification"],
      },
      {
        title: "The miner's tradeoff",
        body: "Mining spends energy for a chance at the reward. Pool selection affects variance and decentralization.",
        points: ["Energy", "Variance", "Pools"],
      },
    ],
  },
  {
    slug: "privacy-use-cases",
    titleKey: "visualizer.t17",
    title: "Privacy Use Cases",
    description: "Real-world applications of privacy technology on Zcash.",
    category: "advanced",
    kind: "privacy",
    slides: [
      {
        title: "Private payments",
        body: "Pay a person or merchant without publishing the relationship on a public ledger.",
        points: ["Payroll", "Remittances", "Everyday spending"],
      },
      {
        title: "Private donations",
        body: "Donors can support a cause without exposing their identity or the size of the gift to the public.",
        points: ["Charity", "Community funds", "Recipients"],
      },
      {
        title: "Business treasury",
        body: "A business can hold and move funds without revealing every counterparty to competitors.",
        points: ["Treasury", "Vendors", "Payroll"],
      },
      {
        title: "Selective disclosure",
        body: "Viewing keys let a user share transaction visibility with an auditor or accountant without handing over spending authority.",
        points: ["Auditor", "Accountant", "Regulator"],
      },
      {
        title: "Identity and access",
        body: "A payment or signature can prove access without linking the action to a public identity.",
        points: ["Sign-in", "Membership", "Access"],
      },
    ],
  },
  {
    slug: "governance-dev-fund",
    titleKey: "visualizer.t18",
    title: "Governance & Dev Fund",
    description: "Community-driven development and decentralized decision making.",
    category: "advanced",
    kind: "governance",
    slides: [
      {
        title: "The dev fund",
        body: "A share of block rewards supports Zcash development. The community decides how the fund is allocated.",
        points: ["Block rewards", "Funding", "Accountability"],
      },
      {
        title: "ZCG",
        body: "Zcash Community Grants reviews proposals and funds work that benefits the ecosystem.",
        points: ["Proposals", "Milestones", "Grants"],
      },
      {
        title: "Zcash Foundation",
        body: "The Foundation supports the protocol, community, and infrastructure without controlling the chain.",
        points: ["Stewardship", "Research", "Community"],
      },
      {
        title: "Coinholder signals",
        body: "Coinholder-directed grants let shielded ZEC holders signal priorities for retroactive funding.",
        points: ["Coinholder vote", "Retroactive grants", "Signals"],
      },
      {
        title: "The process",
        body: "Ideas become proposals, proposals get review, and funded work reports milestones back to the community.",
        points: ["Idea", "Proposal", "Review", "Delivery"],
      },
    ],
  },
  {
    slug: "frost-private-multisig",
    titleKey: "visualizer.t19",
    title: "FROST & Private Multi Signatures",
    description: "Secure multisig without a single point of failure.",
    category: "advanced",
    kind: "frost",
    slides: [
      {
        title: "One key is a single point",
        body: "A normal wallet key can be lost or stolen. Multisig splits authority across participants.",
        points: ["Key risk", "Shared control", "Recovery"],
      },
      {
        title: "Threshold signing",
        body: "FROST lets a threshold of key shares produce one signature without reconstructing the full private key.",
        points: ["t of n", "Key shares", "No full key"],
      },
      {
        title: "Signing round",
        body: "Participants commit to a nonce, then combine partial signatures into a valid Schnorr signature.",
        points: ["Commit", "Sign", "Aggregate"],
      },
      {
        title: "Private by design",
        body: "The final signature looks like a normal single-key signature. The chain does not reveal the signer set.",
        points: ["No signer list", "On-chain privacy", "Threshold control"],
      },
      {
        title: "Use cases",
        body: "FROST fits treasury custody, shared wallets, and recovery setups where no one person should hold the key.",
        points: ["Treasury", "Joint custody", "Recovery"],
      },
    ],
  },
  {
    slug: "intermediate-quiz",
    titleKey: "visualizer.t20",
    title: "Intermediate Quiz",
    description: "Test your knowledge with a short quiz.",
    category: "advanced",
    kind: "quiz",
    slides: [
      {
        title: "Question 1",
        body: "Which component prevents double spends?",
        question: "Which component prevents double spends?",
        options: ["The memo", "The nullifier", "The block reward"],
        answer: 1,
        explanation: "A nullifier is derived from a spent note and is published once. Reusing it is rejected.",
      },
      {
        title: "Question 2",
        body: "What does a Merkle root commit to?",
        question: "What does a Merkle root commit to?",
        options: ["A set of transactions", "A wallet password", "A mining pool"],
        answer: 0,
        explanation: "The Merkle root commits to the transactions in a block.",
      },
      {
        title: "Question 3",
        body: "Why can a viewing key be safer to share than a spending key?",
        question: "Why can a viewing key be safer to share than a spending key?",
        options: ["It cannot spend funds", "It mines blocks", "It hides the chain"],
        answer: 0,
        explanation: "A viewing key reveals notes and history but does not authorize spending.",
      },
      {
        title: "Question 4",
        body: "What is finality?",
        question: "What is finality?",
        options: ["A block that cannot be reverted", "A wallet backup", "A fee estimate"],
        answer: 0,
        explanation: "Finality is the point where a block is considered irreversible by the protocol.",
      },
      {
        title: "Question 5",
        body: "What does FROST produce?",
        question: "What does FROST produce?",
        options: ["One signature from a threshold of shares", "A new consensus rule", "A transparent address"],
        answer: 0,
        explanation: "FROST aggregates partial signatures into one valid signature without rebuilding the key.",
      },
    ],
  },
  {
    slug: "zechub-bounties",
    titleKey: "visualizer.t21",
    title: "ZecHub Bounties",
    description: "Contribute to ZecHub and earn ZEC.",
    category: "contributors",
    kind: "bounties",
    slides: [
      {
        title: "What ZecHub does",
        body: "ZecHub is a community education hub for Zcash. Contributors write, translate, design, and build.",
        points: ["Open source", "Community led", "Education"],
      },
      {
        title: "Find a bounty",
        body: "Bounties are scoped tasks with a reward. Read the brief and check the acceptance criteria before starting.",
        points: ["Task", "Reward", "Scope"],
      },
      {
        title: "Do the work",
        body: "Claim the task, ask questions early, and submit the artifact in the requested format.",
        points: ["Claim", "Build", "Submit"],
      },
      {
        title: "Review and payout",
        body: "A maintainer reviews the work. Accepted work is paid in ZEC, usually to a shielded address.",
        points: ["Review", "Feedback", "Payout"],
      },
      {
        title: "Start small",
        body: "Pick a small bounty first. A clean submission and clear communication build trust for larger work.",
        points: ["Small task", "Clear docs", "Repeat"],
      },
    ],
  },
  {
    slug: "dao-proposals",
    titleKey: "visualizer.t22",
    title: "DAO Proposals",
    description: "Step-by-step guide to creating a ZecHub DAO governance proposal.",
    category: "contributors",
    kind: "dao",
    slides: [
      {
        title: "Start with an idea",
        body: "Write the problem, the proposed work, the budget, and the outcome you want.",
        points: ["Problem", "Scope", "Budget"],
      },
      {
        title: "Discuss first",
        body: "Share the draft in the community before submitting. Early feedback saves a failed vote.",
        points: ["Forum", "Discord", "Feedback"],
      },
      {
        title: "Write the proposal",
        body: "Use a clear title, milestones, deliverables, and a payment schedule.",
        points: ["Title", "Milestones", "Payment"],
      },
      {
        title: "Vote",
        body: "Token or coin holders vote during the proposal window. A quorum and threshold decide the result.",
        points: ["Voting window", "Quorum", "Threshold"],
      },
      {
        title: "Execute and report",
        body: "If it passes, deliver the work and report progress. Accountability keeps the DAO healthy.",
        points: ["Deliver", "Report", "Treasury"],
      },
    ],
  },
];

export const getVisualizerTool = (slug: string): VisualizerTool | undefined =>
  visualizerTools.find((tool) => tool.slug === slug);
