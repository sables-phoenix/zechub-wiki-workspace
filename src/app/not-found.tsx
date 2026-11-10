import Link from "next/link";
import { DesktopShell } from "@/components/desktop/desktop-shell";
import { ZcashMark } from "@/components/zcash-mark";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
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
      </div>
    </DesktopShell>
  );
}
