import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubMark } from "@/components/github-mark";
import { PageCard } from "@/components/page-card";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { pagesForSection } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Contribute",
  description: "Help build ZecHub with writing, review, translation, design, or funding.",
};

const paths: readonly { title: string; copy: string; href: string; external?: boolean }[] = [
  {
    title: "Write",
    copy: "Turn a Zcash topic into a clear, sourced guide.",
    href: "/contribute/contributing-guide",
  },
  {
    title: "Review",
    copy: "Check facts, links, and the reading experience.",
    href: "/contribute/style-guide",
  },
  {
    title: "Translate",
    copy: "Bring the wiki to one of 19 language editions.",
    href: "https://zechub.wiki/contribute/help-build-zechub",
    external: true,
  },
  {
    title: "Fund",
    copy: "Support the writers, reviewers, and infrastructure.",
    href: "/donate",
  },
] as const;

export default function ContributePage() {
  const pages = pagesForSection("Contribute");

  return (
    <>
      <SectionHero
        eyebrow="Contribute"
        title="Write the wiki with us."
        description="ZecHub is built in public by writers, reviewers, translators, designers, and developers. Pick a lane and open a pull request."
        actions={
          <>
            <Button asChild>
              <Link href="/contribute/contributing-guide">Contributing guide</Link>
            </Button>
            <Button asChild variant="secondary">
              <a href="https://github.com/ZecHub/zechub" target="_blank" rel="noreferrer">
                <GithubMark className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </>
        }
        meta={
          <>
            <span>{pages.length} contributor pages</span>
            <span>Open source</span>
            <span>19 languages</span>
          </>
        }
      />

      <div className="container-page space-y-10 py-8 md:space-y-12 md:py-10">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {paths.map((path) =>
            path.external ? (
              <a
                key={path.title}
                href={path.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-card border border-line bg-paper p-5 shadow-stamp transition-[border-color,background-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-gold-deep">Path</span>
                  <ArrowUpRight className="h-4 w-4 text-muted" />
                </div>
                <h2 className="mt-7 font-display text-2xl leading-none tracking-[-0.04em]">{path.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{path.copy}</p>
              </a>
            ) : (
              <Link
                key={path.title}
                href={path.href}
                className="group rounded-card border border-line bg-paper p-5 shadow-stamp transition-[border-color,background-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-gold-deep">Path</span>
                  <ArrowUpRight className="h-4 w-4 text-muted" />
                </div>
                <h2 className="mt-7 font-display text-2xl leading-none tracking-[-0.04em]">{path.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{path.copy}</p>
              </Link>
            ),
          )}
        </div>

        <section>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Contributor library</p>
              <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">How the work gets done.</h2>
            </div>
            <a
              href="https://zechub.wiki/contribute/help-build-zechub"
              target="_blank"
              rel="noreferrer"
              className="hidden text-xs text-muted underline underline-offset-4 hover:text-ink sm:flex sm:items-center sm:gap-1"
            >
              Help build ZecHub
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {pages.map((page) => (
              <PageCard key={page.path} page={page} />
            ))}
          </div>
        </section>

        <section className="rounded-card border border-vault-line bg-vault p-6 text-vault-text shadow-stamp md:p-8">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-vault-muted">The loop</p>
          <h2 className="mt-2 font-display text-3xl leading-none tracking-[-0.04em]">
            Fork. Write. Review. Ship.
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              { title: "Fork the repo", copy: "Clone ZecHub/zechub and make a branch." },
              { title: "Follow the style guide", copy: "Plain language, sourced claims, a clear promise." },
              { title: "Open a pull request", copy: "A reviewer checks facts and links before merge." },
            ].map((step, index) => (
              <div key={step.title} className="rounded-card border border-vault-line bg-vault-2/80 p-4">
                <span className="font-mono text-[9px] text-gold">0{index + 1}</span>
                <p className="mt-2 text-sm font-medium">{step.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-vault-muted">{step.copy}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
