import type { Metadata } from "next";
import Link from "next/link";
import { PageCard } from "@/components/page-card";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { getPage, pagesForSection, type PageMeta } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Using Zcash",
  description: "Buy, send, shield, and spend ZEC with the ZecHub wiki.",
};

const pick = (paths: readonly string[]): readonly PageMeta[] =>
  paths.map((path) => getPage(path)).filter((page): page is PageMeta => Boolean(page));

const groups = [
  {
    id: "get",
    title: "Get ZEC",
    copy: "Exchanges, swaps, faucets, and mining.",
    pages: pick([
      "using-zcash/buying-zec",
      "using-zcash/custodial-exchanges",
      "using-zcash/non-custodial-exchanges",
      "using-zcash/decentralized-exchanges",
      "using-zcash/faucets",
      "using-zcash/zcash-mining-guide",
    ]),
  },
  {
    id: "transact",
    title: "Transact",
    copy: "Addresses, memos, transactions, and recovery.",
    pages: pick([
      "using-zcash/transactions",
      "using-zcash/memos",
      "using-zcash/unified-addresses",
      "using-zcash/payment-request-uris",
      "using-zcash/recovering-funds",
      "using-zcash/shielded-pools",
    ]),
  },
  {
    id: "protect",
    title: "Protect",
    copy: "The privacy tools around the payment.",
    pages: pick([
      "privacy-tools/why-privacy-matters",
      "privacy-tools/web-browsers",
      "privacy-tools/secure-messengers",
      "privacy-tools/vpn-and-dvpn",
      "privacy-tools/pgp-encryption",
      "privacy-tools/2fa-hardware-devices",
    ]),
  },
  {
    id: "real-world",
    title: "Real-world setups",
    copy: "Merchants, journalists, freelancers, and communities.",
    pages: pick([
      "zcash-use-cases/accept-payments-as-a-merchant",
      "zcash-use-cases/freelance-privacy-setup",
      "zcash-use-cases/journalist-privacy-setup",
      "zcash-use-cases/receive-donations-privately",
      "zcash-use-cases/send-money-without-linking-identity",
      "zcash-use-cases/sign-in-with-zcash",
    ]),
  },
] as const;

export default function UsingZcashPage() {
  const useCount = pagesForSection("Use Zcash").length;
  const caseCount = pagesForSection("Use Cases").length;
  const privacyCount = pagesForSection("Privacy Tools").length;

  return (
    <>
      <SectionHero
        eyebrow="Using Zcash"
        title="Use Zcash without giving up your privacy."
        description="From your first purchase to a private payment, a shielded pool, and the tools around it. Start with the task in front of you."
        actions={
          <>
            <Button asChild>
              <Link href="/using-zcash/buying-zec">Buying ZEC</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/wallets">Wallet matrix</Link>
            </Button>
          </>
        }
        meta={
          <>
            <span>{useCount + caseCount + privacyCount} pages</span>
            <span>{useCount} using Zcash</span>
            <span>{caseCount} use cases</span>
            <span>{privacyCount} privacy tools</span>
          </>
        }
      />

      <div className="container-page space-y-10 py-8 md:space-y-12 md:py-10">
        {groups.map((group) => (
          <section key={group.id}>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">{group.copy}</p>
                <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">{group.title}</h2>
              </div>
              <Link
                href="/library"
                className="hidden text-xs text-muted underline underline-offset-4 hover:text-ink sm:block"
              >
                All pages
              </Link>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {group.pages.map((page) => (
                <PageCard key={page.path} page={page} />
              ))}
            </div>
          </section>
        ))}

        <section className="flex flex-col gap-5 rounded-card border border-line bg-paper-2 p-6 shadow-stamp sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">Need the whole shelf?</p>
            <h2 className="mt-1 text-2xl leading-tight tracking-[-0.04em]">
              Every Zcash page in one library.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted">
              Filter by section, search by title, or open the original page.
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link href="/library">Open the library</Link>
          </Button>
        </section>
      </div>
    </>
  );
}
