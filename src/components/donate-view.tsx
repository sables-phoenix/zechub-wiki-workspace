"use client";

import { useState } from "react";
import Link from "next/link";
import { QrCode as QrIcon, ShieldCheck } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { CopyIcon } from "@/components/animated-icons/copy-icon";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  allDonationAddresses,
  donationSourceUrl,
  donationV0Address,
  donationV1Addresses,
  type DonationAddress,
  type DonationVersion,
} from "@/data/donations";

export function DonateView() {
  const [version, setVersion] = useState<DonationVersion>("v1");
  const [active, setActive] = useState("Zcash");
  const selected =
    version === "v0"
      ? donationV0Address
      : (donationV1Addresses.find((item) => item.chain === active) ?? donationV1Addresses[0]);

  const copy = async (address: string, chain: string) => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success(`${chain} address copied`);
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
            <span>v0 and v1</span>
            <span>Zcash, Ycash, Namada, Penumbra, Dash</span>
            <span>Community funded</span>
          </>
        }
      />

      <div className="container-page space-y-10 py-8 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <section className="rounded-card border border-line bg-paper p-5 shadow-stamp md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Choose a version</p>
                <p className="mt-1 text-sm text-muted">
                  v0 is the original Zcash address. v1 adds the other chains.
                </p>
              </div>
              <div
                role="tablist"
                aria-label="Donation address version"
                className="flex rounded-pill border border-line bg-paper-2 p-1"
              >
                {(["v0", "v1"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    role="tab"
                    aria-selected={version === item}
                    onClick={() => setVersion(item)}
                    className={cn(
                      "h-7 rounded-pill px-4 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors",
                      version === item ? "bg-ink text-paper" : "text-muted hover:text-ink",
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">Choose a chain</p>
              {version === "v1" ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {donationV1Addresses.map((item) => (
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
              ) : (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="inline-flex h-8 items-center rounded-pill border border-ink bg-ink px-3 text-[11px] text-paper">
                    Zcash
                  </span>
                </div>
              )}
            </div>

            {selected ? (
              <>
                <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto]">
                  <div className="rounded-card border border-line bg-paper-2 p-4 md:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                        {selected.label}
                      </p>
                      <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.08em] text-green">
                        <ShieldCheck className="h-3 w-3" />
                        Verify before sending
                      </span>
                    </div>
                    <p className="mt-3 break-all font-mono text-[11px] leading-relaxed text-ink">
                      {selected.address}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <Button onClick={() => copy(selected.address, selected.chain)}>
                        <CopyIcon size={14} className="h-4 w-4" />
                        Copy address
                      </Button>
                      <span className="text-xs text-muted">{selected.note}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-card border border-line bg-paper-2 p-4">
                    <AddressQr
                      value={selected.address}
                      size={176}
                      title={`${selected.chain} donation address QR code`}
                    />
                    <p className="mt-2 text-center font-mono text-[8px] uppercase tracking-[0.08em] text-muted">
                      Scan with a compatible wallet
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted">
                  Only send {selected.chain} to this address. Sending another asset can result in permanent
                  loss. Always confirm the first and last characters before you send.
                </p>
              </>
            ) : null}
          </section>

          <aside className="space-y-4">
            <div className="rounded-card border border-vault-line bg-vault p-6 text-vault-text shadow-stamp">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-vault-muted">Contribute</p>
              <h2 className="mt-2 font-display text-2xl leading-none tracking-[-0.04em]">
                Help Build ZecHub
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-vault-muted">
                Write · Translate · Design · Develop
              </p>
              <Button asChild variant="secondary" className="mt-4 w-full">
                <Link href="/contribute">Contribute to ZecHub</Link>
              </Button>
            </div>
            <div className="rounded-card border border-line bg-paper-2 p-5 shadow-stamp">
              <div className="flex items-center gap-2">
                <QrIcon className="h-4 w-4 text-gold-deep" />
                <p className="eyebrow">QR codes</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Every address has a QR code below. The code encodes the plain address, so you can scan it with
                a wallet that supports the chain.
              </p>
            </div>
          </aside>
        </div>

        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Scan or copy</p>
              <h2 className="mt-1 text-3xl leading-none tracking-[-0.04em]">Every address.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                Six QR codes across v0 and v1. Confirm the chain and the first characters in your wallet before
                you send.
              </p>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
              {allDonationAddresses.length} codes
            </span>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {allDonationAddresses.map((address) => (
              <QrCard key={`${address.version}-${address.chain}`} address={address} onCopy={copy} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function AddressQr({ value, size, title }: { value: string; size: number; title: string }) {
  return (
    <div className="w-fit rounded-lg bg-[#fffdf7] p-2.5">
      <QRCodeSVG
        value={value}
        size={size}
        level="M"
        bgColor="#fffdf7"
        fgColor="#14130f"
        marginSize={0}
        title={title}
      />
    </div>
  );
}

function QrCard({
  address,
  onCopy,
}: {
  address: DonationAddress;
  onCopy: (address: string, chain: string) => void;
}) {
  return (
    <article className="flex h-full flex-col rounded-card border border-line bg-paper p-4 shadow-stamp">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-gold-deep">
            {address.version} · {address.chain}
          </p>
          <h3 className="mt-1 font-display text-xl leading-tight tracking-[-0.03em]">{address.label}</h3>
        </div>
        <QrIcon className="h-4 w-4 shrink-0 text-muted" />
      </div>
      <div className="mt-4 flex justify-center">
        <AddressQr value={address.address} size={132} title={`${address.chain} donation address QR code`} />
      </div>
      <p className="mt-3 line-clamp-2 break-all font-mono text-[9px] leading-relaxed text-muted">
        {address.address}
      </p>
      <div className="mt-auto flex items-center justify-between gap-2 pt-4">
        <span className="text-[10px] text-muted">{address.note}</span>
        <button
          type="button"
          onClick={() => onCopy(address.address, address.chain)}
          className="inline-flex h-7 items-center gap-1 rounded-pill border border-line px-3 text-[9px] text-muted transition-colors hover:border-ink/30 hover:text-ink"
        >
          <CopyIcon size={12} className="h-3 w-3" />
          Copy
        </button>
      </div>
    </article>
  );
}
