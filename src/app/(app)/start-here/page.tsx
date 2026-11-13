import Link from "next/link";
import { PageCard } from "@/components/page-card";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { getPage, pagesForSection } from "@/lib/pages";

export default function StartHerePage() {
  const startPages = pagesForSection("Start Here");
  const guide = getPage("start-here/new-user-guide");

  return (
    <>
      <SectionHero
        eyebrow="Begin your Zcash learning journey"
        title="Start Here"
        description="Start your journey with Zcash. Essential guides, core concepts, and introductory resources for beginners."
        actions={
          <>
            {guide ? (
              <Button asChild>
                <Link href={`/${guide.path}`}>Open the new user guide</Link>
              </Button>
            ) : null}
            <Button asChild variant="secondary">
              <Link href="/wallets">Pick a wallet</Link>
            </Button>
          </>
        }
        meta={
          <>
            <span>{startPages.length} pages</span>
          </>
        }
      />

      <div className="container-page py-8 md:py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">The reading list</p>
            <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">All {startPages.length} pages.</h2>
          </div>
          <Link href="/library" className="hidden text-xs text-muted underline underline-offset-4 hover:text-ink sm:block">
            Full library
          </Link>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {startPages.map((page) => (
            <PageCard key={page.path} page={page} />
          ))}
        </div>
      </div>
    </>
  );
}
