import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookMarked, Building2, LockKeyhole, type LucideIcon } from "lucide-react";
import { GithubMark } from "@/components/github-mark";
import { AppIcon } from "@/components/desktop/app-icon";
import { PageCard } from "@/components/page-card";
import { Button } from "@/components/ui/button";
import { featuredPages, sectionCount, sections } from "@/lib/pages";
import { formatCompactUsd, formatNumber, formatPercent, formatUsd, formatZec } from "@/lib/format";
import type { NetworkSnapshot } from "@/lib/network";

type HomeViewProps = {
  network: NetworkSnapshot;
};

const sectionIconMap: Partial<Record<string, LucideIcon>> = {
  Organizations: Building2,
  "Privacy Tools": LockKeyhole,
  "Glossary & FAQs": BookMarked,
};

const sectionIds = [
  "Start Here",
  "Use Zcash",
  "Zcash Tech",
  "Guides",
  "Ecosystem",
  "Organizations",
  "Privacy Tools",
  "Glossary & FAQs",
] as const;

const startCards = [
  {
    number: "01",
    title: "New to Zcash",
    copy: "Start with the plain-language guide to ZEC, wallets, and your first shielded payment.",
    href: "/start-here/new-user-guide",
  },
  {
    number: "02",
    title: "Pick a wallet",
    copy: "Compare 38 wallets by device, shielded pool, and NU7 readiness.",
    href: "/wallets",
  },
  {
    number: "03",
    title: "Use ZEC privately",
    copy: "The practical habits that keep a payment private from end to end.",
    href: "/guides/using-zec-privately",
  },
] as const;

export function HomeView({ network }: HomeViewProps) {
  return (
    <div className="container-page space-y-10 pb-12 pt-6 md:space-y-12 md:pt-8">
      <section className="relative overflow-hidden rounded-[18px] border border-vault-line bg-vault px-6 py-8 text-vault-text md:px-10 md:py-12">
        <div className="absolute -right-16 bottom-0 w-[64%] max-w-[760px] opacity-80 mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_76%)]">
          <Image
            src="/brand/hero-dark.png"
            alt=""
            width={1600}
            height={400}
            className="h-auto w-full"
            priority
          />
        </div>
        <div className="relative z-10 max-w-[650px]">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-vault-muted">
            ZecHub Wiki / Field Guide
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[0.92] tracking-[-0.06em] md:text-6xl">
            The Zcash wiki,
            <br />
            <span className="text-gold">rebuilt as a workspace.</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-vault-muted md:text-base">
            232 human-reviewed pages, 38 wallets, and live network data. A quieter way to learn Zcash,
            compare tools, and read the ecosystem.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href="/start-here">Start here</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/library">Browse the library</Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[9px] uppercase tracking-[0.1em] text-vault-muted">
            <span>232 pages</span>
            <span>38 wallets</span>
            <span>19 languages</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-green" />
              {network.live ? "Live network" : "Cached network"}
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {startCards.map((card) => (
          <Link
            key={card.number}
            href={card.href}
            className="group rounded-card border border-line bg-paper p-5 transition-[border-color,background-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="font-mono text-[10px] tracking-[0.12em] text-gold-deep">{card.number}</span>
              <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
            </div>
            <h2 className="mt-6 font-display text-2xl leading-none tracking-[-0.04em]">{card.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{card.copy}</p>
          </Link>
        ))}
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Browse by section</p>
            <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">The whole wiki, in eight doors.</h2>
          </div>
          <Link href="/library" className="hidden text-xs text-muted underline underline-offset-4 hover:text-ink sm:block">
            All pages
          </Link>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {sectionIds.map((id) => {
            const section = sections.find((item) => item.id === id);
            if (!section) return null;
            const SectionIcon = sectionIconMap[id];
            return (
              <Link
                key={id}
                href={section.href}
                className="group rounded-card border border-line bg-paper p-4 transition-[border-color,background-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-paper-2">
                    {SectionIcon ? (
                      <SectionIcon className="h-4 w-4" strokeWidth={1.7} />
                    ) : (
                      <AppIcon kind={section.app} className="h-4 w-4" />
                    )}
                  </span>
                  <span className="font-mono text-[9px] text-muted">{sectionCount(id)} pages</span>
                </div>
                <p className="mt-4 font-display text-xl leading-tight tracking-[-0.03em]">{section.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{section.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Featured reading</p>
            <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">Start with something good.</h2>
          </div>
          <Link href="/library" className="hidden text-xs text-muted underline underline-offset-4 hover:text-ink sm:block">
            All pages
          </Link>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {featuredPages.slice(0, 6).map((page) => (
            <PageCard key={page.path} page={page} />
          ))}
        </div>
      </section>

      <section className="rounded-card border border-vault-line bg-vault p-6 text-vault-text md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-vault-muted">Live network</p>
            <h2 className="mt-2 font-display text-3xl leading-none tracking-[-0.04em]">
              The chain is moving. <span className="text-gold">Read the numbers.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-vault-muted">
              Price, supply, shielded value, and block activity from the ZecHub network API.
            </p>
          </div>
          <Button asChild>
            <Link href="/network">Open network</Link>
          </Button>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "ZEC price", value: formatUsd(network.priceUsd) },
            { label: "Market cap", value: formatCompactUsd(network.marketCapUsd) },
            { label: "Circulating", value: `${formatNumber(network.circulation)} ZEC` },
            { label: "Shielded", value: formatPercent(network.shieldedShare) },
          ].map((item) => (
            <div key={item.label} className="rounded-card border border-vault-line bg-vault-2/80 p-4">
              <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-vault-muted">{item.label}</p>
              <p className="mt-2 font-display text-2xl leading-none tracking-[-0.04em]">{item.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.1em] text-vault-muted">
          {network.live ? "Live from zechub.wiki" : "Cached snapshot"} / {formatZec(network.shieldedZec)} shielded
        </p>
      </section>

      <section className="flex flex-col gap-5 rounded-card border border-line bg-paper-2 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Keep it open</p>
          <h2 className="mt-1 text-2xl leading-tight tracking-[-0.04em]">This wiki is a living thing.</h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Write a guide, fix a typo, translate a page, or fund the work.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="secondary">
            <Link href="/contribute">Contribute</Link>
          </Button>
          <Button asChild variant="ghost">
            <a href="https://github.com/ZecHub/zechub" target="_blank" rel="noreferrer">
              <GithubMark className="h-4 w-4" />
              GitHub
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
