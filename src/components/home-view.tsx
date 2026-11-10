import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeView() {
  return (
    <div className="container-page flex min-h-full items-center py-8 md:py-10">
      <section className="relative w-full overflow-hidden rounded-card border border-vault-line bg-vault p-7 text-vault-text shadow-stamp-lg md:p-12">
        <div className="absolute -right-16 top-1/2 hidden w-[380px] -translate-y-1/2 opacity-10 md:block">
          <Image
            src="/brand/zechub-logo-white.png"
            alt=""
            width={380}
            height={380}
            className="h-auto w-full"
          />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/zechub-logo-white.png"
              alt="ZecHub"
              width={44}
              height={44}
              className="h-11 w-11"
            />
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-vault-muted">
              ZecHub Wiki / Field Guide
            </p>
          </div>

          <h1 className="mt-8 font-display text-5xl leading-[0.92] tracking-[-0.06em] md:text-6xl">
            The Zcash wiki,
            <br />
            <span className="text-gold">in one workspace.</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-vault-muted md:text-base">
            232 reviewed pages, 38 wallets, live network data. Use the dock below to open an app, or
            search the whole wiki.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/start-here">Start here</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/library">Browse the library</Link>
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[9px] uppercase tracking-[0.1em] text-vault-muted">
            <span>232 pages</span>
            <span>38 wallets</span>
            <span>19 languages</span>
            <span>⌘K to search</span>
          </div>
        </div>
      </section>
    </div>
  );
}
