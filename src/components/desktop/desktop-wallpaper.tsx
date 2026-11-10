"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DesktopClock } from "@/components/desktop/clock";
import { PriceTicker } from "@/components/price-ticker";
import { ZcashMark } from "@/components/zcash-mark";

type DesktopWallpaperProps = {
  onOpen: () => void;
  showWidgets: boolean;
};

export function DesktopWallpaper({ onOpen, showWidgets }: DesktopWallpaperProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-vault">
      <div className="desktop-grid absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_18%,rgba(244,183,40,0.08),transparent_55%)]" />
      <ZcashMark className="absolute -right-[5%] top-[6%] h-[50vw] max-h-[640px] max-w-[640px] text-gold opacity-[0.1]" />
      <div className="absolute -right-[10%] bottom-[-12%] w-[44%] max-w-[560px] opacity-[0.06]">
        <Image
          src="/brand/zechub-logo-white.png"
          alt=""
          width={560}
          height={560}
          className="h-auto w-full"
        />
      </div>

      <div
        className={
          showWidgets
            ? "pointer-events-auto absolute right-[4%] top-[9%] w-[27%] max-w-[370px] max-lg:left-[6%] max-lg:right-[6%] max-lg:top-[10%] max-lg:w-auto max-lg:max-w-none"
            : "hidden"
        }
      >
        <DesktopClock />
        <h1 className="mt-5 max-w-[350px] font-display text-[clamp(2.2rem,3.2vw,3.4rem)] leading-[0.96] tracking-[-0.06em] text-vault-text">
          ZecHub Wiki
        </h1>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {[
            { value: "232", label: "Pages" },
            { value: "38", label: "Wallets" },
            { value: "19", label: "Languages" },
          ].map((item) => (
            <div key={item.label} className="rounded-card border border-vault-line bg-vault-2/80 p-3">
              <p className="font-display text-2xl leading-none tracking-[-0.04em] text-vault-text">{item.value}</p>
              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.1em] text-vault-muted">{item.label}</p>
            </div>
          ))}
        </div>

        <PriceTicker variant="card" className="mt-3" />

        <div className="mt-4 flex items-center gap-3">
          <Button variant="primary" onClick={onOpen}>
            Resume workspace
          </Button>
          <a
            href="https://zechub.wiki"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-vault-muted underline decoration-vault-line underline-offset-4 transition-colors hover:text-vault-text"
          >
            zechub.wiki
          </a>
        </div>
      </div>
    </div>
  );
}
