import type { Metadata } from "next";
import Link from "next/link";
import { PageCard } from "@/components/page-card";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { getPage, pagesForSection, type PageMeta } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Learn",
  description: "Zcash technology, zero-knowledge proofs, and the ideas behind private cash.",
};

const pick = (paths: readonly string[]): readonly PageMeta[] =>
  paths.map((path) => getPage(path)).filter((page): page is PageMeta => Boolean(page));

const techPages = pick([
  "zcash-tech/zk-snarks",
  "zcash-tech/ironwood",
  "zcash-tech/project-tachyon",
  "zcash-tech/halo",
  "zcash-tech/sapling",
  "zcash-tech/unified-addresses",
  "zcash-tech/viewing-keys",
  "zcash-tech/frost",
]);

const zeroPages = pick([
  "zero-to-zero-knowledge/zero-to-zero-knowledge",
  "zero-to-zero-knowledge/hash-functions",
  "zero-to-zero-knowledge/mnemonic-seed-phrases",
  "zero-to-zero-knowledge/zcash-addresses",
]);

const referencePages = pick(["glossary-and-faqs/faq", "glossary-and-faqs/zcash-library"]);

const tracks = [
  {
    title: "Zcash Tech",
    copy: "Proofs, pools, upgrades, nodes, and the protocol.",
    count: pagesForSection("Zcash Tech").length,
    href: "/learn",
  },
  {
    title: "Zero to Zero Knowledge",
    copy: "A short series on the ideas behind private digital cash.",
    count: pagesForSection("Zero to Zero Knowledge").length,
    href: "/zero-to-zero-knowledge/zero-to-zero-knowledge",
  },
  {
    title: "Glossary & FAQs",
    copy: "Definitions, common questions, and straight answers.",
    count: pagesForSection("Glossary & FAQs").length,
    href: "/glossary-and-faqs/faq",
  },
] as const;

export default function LearnPage() {
  return (
    <>
      <SectionHero
        eyebrow="Learn"
        title="Understand the machine behind private cash."
        description="Start with a proof, a pool, or a plain-language definition. The tech track goes deep without leaving the reader behind."
        actions={
          <>
            <Button asChild>
              <Link href="/zcash-tech/zk-snarks">Start with zk-SNARKs</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/zero-to-zero-knowledge/zero-to-zero-knowledge">Zero to Zero</Link>
            </Button>
          </>
        }
        meta={
          <>
            <span>{pagesForSection("Zcash Tech").length} tech pages</span>
            <span>{pagesForSection("Zero to Zero Knowledge").length} Z2Z pages</span>
            <span>{pagesForSection("Glossary & FAQs").length} reference pages</span>
          </>
        }
      />

      <div className="container-page space-y-10 py-8 md:space-y-12 md:py-10">
        <div className="grid gap-3 sm:grid-cols-3">
          {tracks.map((track) => (
            <Link
              key={track.title}
              href={track.href}
              className="group rounded-card border border-line bg-paper p-5 transition-[border-color,background-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-gold-deep">Track</span>
                <span className="font-mono text-[9px] text-muted">{track.count} pages</span>
              </div>
              <h2 className="mt-7 font-display text-2xl leading-none tracking-[-0.04em]">{track.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{track.copy}</p>
            </Link>
          ))}
        </div>

        <section>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Zcash Tech</p>
              <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">Inside the protocol.</h2>
            </div>
            <Link
              href="/library"
              className="hidden text-xs text-muted underline underline-offset-4 hover:text-ink sm:block"
            >
              Full library
            </Link>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {techPages.map((page) => (
              <PageCard key={page.path} page={page} />
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Zero to Zero Knowledge</p>
            <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">Start from zero.</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {zeroPages.map((page) => (
                <PageCard key={page.path} page={page} />
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">Reference</p>
            <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">Look it up.</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {referencePages.map((page) => (
                <PageCard key={page.path} page={page} />
              ))}
            </div>
            <div className="mt-3 rounded-card border border-line bg-paper-2 p-4">
              <p className="text-sm text-muted">
                The full glossary, FAQs, and every tech page live in the library.
              </p>
              <Link
                href="/library"
                className="mt-2 inline-flex text-xs text-blue underline underline-offset-4"
              >
                Browse all pages
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
