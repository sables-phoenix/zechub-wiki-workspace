import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageCard } from "@/components/page-card";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { getPage, pagesForSection } from "@/lib/pages";

const steps = [
  {
    number: "01",
    title: "Learn the basics",
    copy: "What ZEC is, how shielded transactions work, and who can see a payment.",
    href: "/start-here/what-is-zec-and-zcash",
  },
  {
    number: "02",
    title: "Get some ZEC",
    copy: "Buy on an exchange that supports shielded withdrawals, or start with a small amount.",
    href: "/using-zcash/buying-zec",
  },
  {
    number: "03",
    title: "Set up a wallet",
    copy: "Pick a shielded wallet for your phone, desktop, or hardware.",
    href: "/wallets",
  },
  {
    number: "04",
    title: "Make a private payment",
    copy: "Send, receive, and use memos without exposing the details.",
    href: "/guides/using-zec-privately",
  },
] as const;

export default function StartHerePage() {
  const startPages = pagesForSection("Start Here");
  const guide = getPage("start-here/new-user-guide");

  return (
    <>
      <SectionHero
        eyebrow="Start Here"
        title="A clear path into Zcash."
        description="Twelve pages, in the order that makes sense. Learn what ZEC is, pick a wallet, and make your first shielded payment without the noise."
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
            <span>12 pages</span>
            <span>About 1 hour</span>
            <span>Source: zechub.wiki/start-here</span>
          </>
        }
      />

      <div className="container-page py-8 md:py-10">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <Link
              key={step.number}
              href={step.href}
              className="group rounded-card border border-line bg-paper p-5 shadow-stamp transition-[border-color,background-color,transform] duration-150 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-paper-2"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[10px] tracking-[0.12em] text-gold-deep">{step.number}</span>
                <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
              </div>
              <h2 className="mt-6 font-display text-2xl leading-none tracking-[-0.04em]">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.copy}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">The reading list</p>
            <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">All 12 pages.</h2>
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
