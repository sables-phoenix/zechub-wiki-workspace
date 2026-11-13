import Link from "next/link";
import { DesktopShell } from "@/components/desktop/desktop-shell";
import { I18nProvider } from "@/components/i18n-provider";
import { defaultLocale } from "@/lib/i18n";
import { getMessages } from "@/lib/messages.server";
import { ZcashMark } from "@/components/zcash-mark";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const english = getMessages(defaultLocale);
  return (
    <I18nProvider locale={defaultLocale} messages={english} english={english}>
      <DesktopShell>
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <ZcashMark className="h-12 w-12 text-gold" />
        <p className="eyebrow mt-6">404</p>
        <h1 className="mt-3 max-w-2xl text-5xl leading-[0.94] tracking-[-0.05em]">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          We could not find the page you were looking for. It may have been moved, renamed, or never
          existed.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/">Back to the wiki</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/library">Browse all pages</Link>
          </Button>
        </div>
        <div className="mt-8 grid w-full max-w-2xl gap-2 text-left sm:grid-cols-2">
          {[
            { label: "Start Here", href: "/start-here", note: "The first pages to read." },
            { label: "Wallet matrix", href: "/wallets", note: "38 active wallets, 41 entries." },
            { label: "Tutorials", href: "/zechub-tutorial", note: "88 video guides." },
            { label: "Dashboard", href: "/network", note: "Live network metrics." },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-line bg-paper px-4 py-3 transition-colors hover:border-ink/25 hover:bg-paper-2"
            >
              <span className="block text-sm text-ink">{item.label}</span>
              <span className="mt-0.5 block text-[11px] text-muted">{item.note}</span>
            </Link>
          ))}
        </div>
        <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
          Press ⌘K to search every page
        </p>
      </div>
      </DesktopShell>
    </I18nProvider>
  );
}
