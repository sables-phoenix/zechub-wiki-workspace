import type { Metadata } from "next";
import Link from "next/link";
import { PageCard } from "@/components/page-card";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { getPage, pagesForSection, type PageMeta } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Using Zcash",
  description: "Learn how to use Zcash for private digital payments, explore wallets, exchanges, and shielded transactions.",
};

const pick = (paths: readonly string[]): readonly PageMeta[] =>
  paths.map((path) => getPage(path)).filter((page): page is PageMeta => Boolean(page));

const groups = [
  {
    id: "using-zcash",
    title: "Using Zcash",
    copy: "Learn how to use Zcash for private digital payments, explore wallets, exchanges, and shielded transactions.",
    pages: pick([
      "using-zcash/buying-zec",
      "using-zcash/custodial-exchanges",
      "using-zcash/non-custodial-exchanges",
      "using-zcash/dex",
      "using-zcash/faucets",
      "using-zcash/zcash-mining-guide",
    ]),
  },
  {
    id: "use-cases",
    title: "Use Cases",
    copy: "Explore zcash use cases educational resources, guides, and documentation on ZecHub.",
    pages: pick([
      "zcash-use-cases/accept-payments-as-a-merchant",
      "zcash-use-cases/freelance-privacy-setup",
      "zcash-use-cases/journalist-privacy-setup",
      "zcash-use-cases/receive-donations-privately",
      "zcash-use-cases/send-money-without-linking-identity",
      "zcash-use-cases/sign-in-with-zcash",
    ]),
  },
  {
    id: "privacy-tools",
    title: "Privacy Tools",
    copy: "Curated privacy-preserving tools, secure operating systems, VPNs, and communications software.",
    pages: pick([
      "privacy-tools/tor-and-i2p",
      "privacy-tools/web-browsers",
      "privacy-tools/secure-messengers",
      "privacy-tools/vpn-and-dvpn",
      "privacy-tools/pgp-encryption",
      "privacy-tools/2fa-hardware-devices",
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
        title="Using Zcash"
        description="Learn how to use Zcash for private digital payments, explore wallets, exchanges, and shielded transactions."
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
                <p className="eyebrow">Section</p>
                <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">{group.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{group.copy}</p>
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
      </div>
    </>
  );
}
