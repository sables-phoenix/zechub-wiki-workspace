import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Developer Resources",
  description:
    "Comprehensive developer documentation, SDKs, light client libraries, node software, and API resources for building on Zcash.",
};

const starts = [
  {
    title: "Learn Zcash Development",
    body: "Explore the official documentation and learn the basics of Zcash technology.",
    label: "Read the Docs",
    href: "https://zcash.readthedocs.io/",
    external: true,
  },
  {
    title: "Learn Through Tutorials",
    body: "Follow step-by-step tutorials to build on Zcash, from creating wallets to integrating Zcash into your applications.",
    label: "View Tutorials",
    href: "/zechub-tutorial",
    external: false,
  },
  {
    title: "Quick Start Guide",
    body: "Get up and running with Zcash development quickly. Learn installation, configuration, and basic operations.",
    label: "Quick Start Guide",
    href: "https://zechub.wiki/developers/quick-start",
    external: true,
  },
] as const;

type Resource = {
  label: string;
  href: string;
  external?: boolean;
};

const groups: readonly { title: string; resources: readonly Resource[] }[] = [
  {
    title: "Introductions",
    resources: [
      { label: "Intro to Zcash", href: "/start-here/what-is-zec-and-zcash" },
      { label: "Intro to ZEC", href: "/start-here/zec-use-cases" },
      { label: "Intro to the Stack", href: "https://zcash.readthedocs.io/en/latest/rtd_pages/librustzcash_arch.html", external: true },
      { label: "Intro to Zebra", href: "https://zebra.zfnd.org/", external: true },
      { label: "zecd", href: "https://github.com/zecrocks/zecd", external: true },
      { label: "The zecd Book", href: "https://zecd.org/introduction.html", external: true },
      { label: "Intro to Lightwalletd", href: "https://github.com/zcash/lightwalletd", external: true },
      { label: "The Zallet Book", href: "https://zcash.github.io/zallet/", external: true },
      { label: "Address Encoding", href: "https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys", external: true },
      { label: "Transactions", href: "/using-zcash/transactions" },
      { label: "Fees", href: "https://zips.z.cash/zip-0317", external: true },
      { label: "Nodes (zcashd)", href: "https://zcash.github.io/zcash/", external: true },
      { label: "Nodes (zebrad)", href: "https://zebra.zfnd.org/", external: true },
    ],
  },
  {
    title: "SDKs and libraries",
    resources: [
      { label: "Intro to Zingolib", href: "https://github.com/zingolabs/zingolib", external: true },
      { label: "WebZjs", href: "https://github.com/ChainSafe/WebZjs", external: true },
      { label: "Noir Wallet SDK", href: "https://github.com/NoirWallet/noir-wallet-sdk", external: true },
      { label: "Zcash Android Wallet SDK", href: "https://github.com/zcash/zcash-android-wallet-sdk", external: true },
      { label: "Zcash JS", href: "https://zcashlabs.github.io/zcashjs/", external: true },
      { label: "Zcash Swift Wallet SDK", href: "https://github.com/zcash/zcash-swift-wallet-sdk", external: true },
      { label: "librustzcash", href: "https://github.com/zcash/librustzcash", external: true },
      { label: "Zcash Router SDK", href: "https://github.com/nufi-official/zcash-router-sdk", external: true },
      { label: "zaddr-wasm-parser", href: "https://github.com/ruzcash/zaddr-wasm-parser", external: true },
      { label: "Zodl Android Reference Wallet", href: "https://github.com/zodl-inc/zodl-android", external: true },
      { label: "Zodl iOS Reference Wallet", href: "https://github.com/zodl-inc/zodl-ios", external: true },
      { label: "Nym Zcash SDK", href: "https://zcash-sdk.nym.com/", external: true },
      { label: "ZecDev", href: "https://zecdev.github.io/", external: true },
      { label: "zcash-ika", href: "https://github.com/Frontier-Compute/zcash-ika", external: true },
      { label: "Shade Agents", href: "https://fringe-brow-647.notion.site/Shade-Agents-19a09959836d8091bb8febb318cc09fd", external: true },
    ],
  },
  {
    title: "Infrastructure and guidance",
    resources: [
      { label: "Lightwallet Servers", href: "https://zcash.readthedocs.io/en/latest/lightwalletd/index.html", external: true },
      { label: "Block Explorers", href: "https://github.com/nighthawk-apps/zcash-explorer", external: true },
      { label: "Developer Resources", href: "/start-here/developer-resources" },
      { label: "Development Guidelines", href: "https://zcash.readthedocs.io/en/latest/rtd_pages/development_guidelines.html", external: true },
      { label: "Arborist Calls", href: "https://github.com/ZcashCommunityGrants/arboretum-notes", external: true },
      { label: "Zcash Improvement Proposals", href: "/guides/zcash-improvement-proposals" },
      { label: "Zaino Indexer", href: "/zcash-tech/zaino" },
      { label: "Zallet", href: "/zcash-tech/zallet" },
    ],
  },
];

export default function DevelopersPage() {
  return (
    <>
      <SectionHero
        eyebrow="Developers"
        title="Developer Resources"
        description="Comprehensive developer documentation, SDKs, light client libraries, node software, and API resources for building on Zcash."
        actions={
          <Button asChild variant="secondary">
            <a href="https://zechub.wiki/developers" target="_blank" rel="noreferrer">
              Original page
            </a>
          </Button>
        }
        meta={<span>Source: zechub.wiki/developers</span>}
      />

      <div className="container-page space-y-10 py-8 md:py-10">
        <section>
          <p className="eyebrow">Start</p>
          <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">How would you like to get started?</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {starts.map((item) => (
              <div key={item.title} className="flex flex-col rounded-card border border-line bg-paper p-5 shadow-stamp">
                <h3 className="font-display text-2xl leading-tight tracking-[-0.04em]">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.body}</p>
                <Button asChild variant={item.external ? "secondary" : "primary"} className="mt-5 w-full">
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.label}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <Link href={item.href}>{item.label}</Link>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {groups.map((group) => (
          <section key={group.title}>
            <p className="eyebrow">Documentation</p>
            <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">{group.title}</h2>
            <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
              {group.resources.map((resource) =>
                resource.external ? (
                  <a
                    key={resource.label}
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-3 rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink transition-colors hover:border-ink/25 hover:bg-paper-2"
                  >
                    {resource.label}
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted" />
                  </a>
                ) : (
                  <Link
                    key={resource.label}
                    href={resource.href}
                    className="flex items-center justify-between gap-3 rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink transition-colors hover:border-ink/25 hover:bg-paper-2"
                  >
                    {resource.label}
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted" />
                  </Link>
                ),
              )}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
