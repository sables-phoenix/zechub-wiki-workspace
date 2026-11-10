"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { CopyIcon } from "@/components/animated-icons/copy-icon";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { donationAddresses, donationSourceUrl } from "@/data/donations";

export function DonateView() {
  const [active, setActive] = useState(donationAddresses[0]?.chain ?? "Zcash");
  const selected = donationAddresses.find((item) => item.chain === active) ?? donationAddresses[0];

  const copy = async () => {
    if (!selected) return;
    try {
      await navigator.clipboard.writeText(selected.address);
      toast.success(`${selected.chain} address copied`);
    } catch {
      toast.error("Could not copy the address");
    }
  };

  return (
    <>
      <SectionHero
        eyebrow="Donate to ZecHub"
        title="Donate to ZecHub"
        description="Support ZecHub's open-source mission to provide unbiased, global educational materials and tutorials for the Zcash ecosystem."
        actions={
          <Button asChild variant="secondary">
            <a href={donationSourceUrl} target="_blank" rel="noreferrer">
              Original donation page
            </a>
          </Button>
        }
        meta={
          <>
            <span>Zcash, Ycash, Namada, Penumbra, Dash</span>
            <span>Unified address</span>
            <span>Community funded</span>
          </>
        }
      />

      <div className="container-page grid gap-6 py-8 md:py-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <section className="rounded-card border border-line bg-paper p-5 shadow-stamp md:p-6">
          <p className="eyebrow">Choose a chain</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {donationAddresses.map((item) => (
              <button
                key={item.chain}
                type="button"
                onClick={() => setActive(item.chain)}
                className={cn(
                  "h-8 rounded-pill border px-3 text-[11px] transition-colors",
                  active === item.chain
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-paper text-muted hover:border-ink/30 hover:text-ink",
                )}
              >
                {item.chain}
              </button>
            ))}
          </div>

          {selected ? (
            <>
              <div className="mt-5 rounded-card border border-line bg-paper-2 p-4 md:p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">{selected.label}</p>
                  <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.08em] text-green">
                    <ShieldCheck className="h-3 w-3" />
                    Verify before sending
                  </span>
                </div>
                <p className="mt-3 break-all font-mono text-[11px] leading-relaxed text-ink">{selected.address}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Button onClick={copy}>
                    <CopyIcon size={14} className="h-4 w-4" />
                    Copy address
                  </Button>
                  <span className="text-xs text-muted">{selected.note}</span>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted">
                Only send {selected.chain} to this address. Sending another asset can result in permanent loss.
                Always confirm the first and last characters before you send.
              </p>
            </>
          ) : null}
        </section>

        <aside className="space-y-4">
          <div className="rounded-card border border-vault-line bg-vault p-6 text-vault-text shadow-stamp">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-vault-muted">Contribute</p>
            <h2 className="mt-2 font-display text-2xl leading-none tracking-[-0.04em]">Help Build ZecHub</h2>
            <p className="mt-3 text-sm leading-relaxed text-vault-muted">Write · Translate · Design · Develop</p>
            <Button asChild variant="secondary" className="mt-4 w-full">
              <Link href="/contribute">Contribute to ZecHub</Link>
            </Button>
          </div>
        </aside>
      </div>
    </>
  );
}
