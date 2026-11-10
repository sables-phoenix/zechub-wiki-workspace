import Image from "next/image";
import Link from "next/link";
import { DesktopClock } from "@/components/desktop/clock";
import { Button } from "@/components/ui/button";

export function HomeView() {
  return (
    <div className="container-page flex min-h-full items-center py-8 md:py-10">
      <section className="relative w-full overflow-hidden rounded-card border border-vault-line bg-vault p-7 text-vault-text shadow-stamp-lg md:p-10">
        <div className="relative z-10">
          <div className="border-b border-vault-line pb-6 text-center">
            <p className="flex items-center justify-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-vault-muted">
              <span className="h-1 w-1 rounded-full bg-green" />
              Local time
            </p>
            <DesktopClock className="text-center" />
          </div>

          <div className="mx-auto mt-7 max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3">
              <Image
                src="/brand/zechub-logo-white.png"
                alt="ZecHub"
                width={38}
                height={38}
                className="h-[38px] w-[38px]"
              />
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-vault-muted">
                An open source education hub for Zcash
              </p>
            </div>

            <h1 className="mt-5 font-display text-4xl leading-[0.96] tracking-[-0.06em] md:text-5xl">
              Welcome to ZecHub
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-vault-muted md:text-base">
              ZecHub is the community-driven education hub for Zcash (ZEC), a decentralized digital currency
              built for censorship-resistant, secure and private payments. Zcash uses advanced zero-knowledge
              cryptography to enable transactions whose validity can be verified without revealing sensitive
              financial information.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link href="/start-here">Start here</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/library">All pages</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
