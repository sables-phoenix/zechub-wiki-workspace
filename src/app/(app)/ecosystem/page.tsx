import type { Metadata } from "next";
import Link from "next/link";
import { PageCard } from "@/components/page-card";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { getPage, pagesForSection, type PageMeta } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Ecosystem",
  description: "The organizations, communities, and projects around Zcash.",
};

const pick = (paths: readonly string[]): readonly PageMeta[] =>
  paths.map((path) => getPage(path)).filter((page): page is PageMeta => Boolean(page));

const organizationPages = pick([
  "zcash-organizations/ZODL",
  "zcash-organizations/zcash-foundation",
  "zcash-organizations/zcash-community-grants",
  "zcash-organizations/shielded-labs",
  "zcash-organizations/electric-coin-company",
  "zcash-organizations/financial-privacy-foundation",
]);

const communityPages = pick([
  "zcash-community/community-links",
  "zcash-community/community-projects",
  "zcash-community/zcash-global-ambassadors",
  "zcash-community/zcash-media",
  "zcash-community/zcash-podcasts",
  "zcash-community/zcash-governance",
]);

const creatorPages = pick([
  "zfav-club/guides-for-creators",
  "zfav-club/guides-for-creators/ai-tools",
  "zfav-club/guides-for-creators/livestream-setup",
  "zfav-club/guides-for-creators/video-subtitle-generation-with-translation",
]);

export default function EcosystemPage() {
  return (
    <>
      <SectionHero
        eyebrow="Ecosystem"
        title="The people, projects, and places around Zcash."
        description="Who builds the protocol, who funds the work, where the community gathers, and how the stories get told."
        actions={
          <>
            <Button asChild>
              <Link href="/zcash-community/community-links">Community links</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/zcash-organizations/ZODL">Organizations</Link>
            </Button>
          </>
        }
        meta={
          <>
            <span>{pagesForSection("Organizations").length} organizations</span>
            <span>{pagesForSection("Ecosystem").length} community pages</span>
            <span>{pagesForSection("ZFAV Club").length} creator guides</span>
          </>
        }
      />

      <div className="container-page space-y-10 py-8 md:space-y-12 md:py-10">
        <section>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Organizations</p>
              <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">Who builds Zcash.</h2>
            </div>
            <Link
              href="/library"
              className="hidden text-xs text-muted underline underline-offset-4 hover:text-ink sm:block"
            >
              Full library
            </Link>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {organizationPages.map((page) => (
              <PageCard key={page.path} page={page} />
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <p className="eyebrow">Community</p>
            <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">Find your people.</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {communityPages.map((page) => (
                <PageCard key={page.path} page={page} />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-card border border-vault-line bg-vault p-5 text-vault-text">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-vault-muted">Community hubs</p>
              <div className="mt-3 space-y-2">
                {[
                  { label: "Discord", href: "https://discord.gg/zcash" },
                  { label: "Forum", href: "https://forum.zcashcommunity.com" },
                  { label: "ZecHub Social", href: "https://zechub.social" },
                  { label: "GitHub", href: "https://github.com/ZecHub/zechub" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between border-b border-vault-line/70 py-2 text-sm text-vault-muted transition-colors hover:text-vault-text"
                  >
                    {link.label}
                    <span className="font-mono text-[9px]">↗</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="rounded-card border border-line bg-paper-2 p-5">
              <p className="eyebrow">ZFAV Club</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Guides for creators, broadcasters, and archivists who tell the Zcash story.
              </p>
              <div className="mt-3 grid gap-2">
                {creatorPages.map((page) => (
                  <Link
                    key={page.path}
                    href={`/${page.path}`}
                    className="text-xs text-blue underline decoration-line underline-offset-4 hover:decoration-blue"
                  >
                    {page.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
