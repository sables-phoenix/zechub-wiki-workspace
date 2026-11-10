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
  description:
    "If you're a member of the Zcash community, and want to contribute to building ZecHub, there are a few things that are super helpful.",
};

const ways = [
  "Curate links for the newsletter and add them to the newsletter's GitHub page.",
  "Fact check the wiki docs, suggest edits, and propose new pages in GitHub.",
  "Create video content in the following categories: Zcash explainer videos, Zcash wallet guide/tutorials, third-party application demos.",
  "Produce designs such as posters/graphics/animations for Zcash & Privacy ecosystem.",
  "Translate any of the existing wiki pages.",
] as const;

export default function ContributePage() {
  const pages = pagesForSection("Contribute");

  return (
    <>
      <SectionHero
        eyebrow="Write · Translate · Design · Develop"
        title="Contribute"
        description="If you're a member of the Zcash community, and want to contribute to building ZecHub, there are a few things that are super helpful."
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
        <section>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Ways to help</p>
              <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">Help Build ZecHub</h2>
            </div>
            <a
              href="https://zechub.wiki/contribute/help-build-zechub"
              target="_blank"
              rel="noreferrer"
              className="hidden text-xs text-muted underline underline-offset-4 hover:text-ink sm:flex sm:items-center sm:gap-1"
            >
              Open the source page
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {ways.map((way, index) => (
              <div
                key={way}
                className="rounded-card border border-line bg-paper p-5 shadow-stamp transition-[border-color,background-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2"
              >
                <span className="font-mono text-[10px] tracking-[0.12em] text-gold-deep">
                  0{index + 1}
                </span>
                <p className="mt-5 text-sm leading-relaxed text-muted">{way}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Contributor pages</p>
              <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">Contribute</h2>
            </div>
            <Link
              href="/library"
              className="hidden text-xs text-muted underline underline-offset-4 hover:text-ink sm:block"
            >
              Full library
            </Link>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {pages.map((page) => (
              <PageCard key={page.path} page={page} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
