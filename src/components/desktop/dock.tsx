"use client";

import { useRouter } from "next/navigation";
import { AppIcon } from "@/components/desktop/app-icon";
import { cn } from "@/lib/utils";
import { dockApps, getActiveApp } from "@/lib/apps";

type DockProps = {
  pathname: string;
  onOpen: () => void;
  onLaunchpad: () => void;
};

const mobileAppIds = new Set(["home", "start", "wallets", "library"]);

export function Dock({ pathname, onOpen, onLaunchpad }: DockProps) {
  const router = useRouter();
  const activeId = getActiveApp(pathname)?.id;
  const mobileApps = dockApps.filter((app) => mobileAppIds.has(app.id));

  const openApp = (href: string) => {
    onOpen();
    router.push(href);
  };

  return (
    <>
      <nav
        aria-label="Dock"
        className="absolute bottom-3 left-1/2 z-40 hidden -translate-x-1/2 md:block"
      >
        <div className="flex items-end gap-1.5 rounded-[18px] border border-vault-line bg-vault-2/90 p-2 shadow-[0_18px_50px_rgba(0,0,0,.55)] backdrop-blur-xl">
          {dockApps.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => openApp(app.href)}
              className="group flex w-12 flex-col items-center gap-1"
              aria-label={`Open ${app.label}`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-black/15 bg-[#fffdf7] text-[#14130f] transition-transform duration-150 group-hover:-translate-y-1 group-hover:shadow-[0_8px_18px_rgba(0,0,0,.35)]">
                <AppIcon kind={app.id} className="h-4 w-4" />
              </span>
              <span className="text-[7px] text-vault-muted transition-colors group-hover:text-vault-text">
                {app.dockLabel}
              </span>
              <span
                className={cn(
                  "h-1 w-1 rounded-full",
                  activeId === app.id ? "bg-gold" : "bg-transparent",
                )}
              />
            </button>
          ))}
          <div className="mx-1 mb-3 h-8 w-px bg-vault-line" />
          <button
            type="button"
            onClick={onLaunchpad}
            className="group flex w-12 flex-col items-center gap-1"
            aria-label="Open Launchpad"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-black/15 bg-[#fffdf7] text-[#14130f] transition-transform duration-150 group-hover:-translate-y-1 group-hover:shadow-[0_8px_18px_rgba(0,0,0,.35)]">
              <AppIcon kind="launchpad" className="h-4 w-4" />
            </span>
            <span className="text-[7px] text-vault-muted transition-colors group-hover:text-vault-text">
              Launchpad
            </span>
            <span className="h-1 w-1 rounded-full bg-transparent" />
          </button>
        </div>
      </nav>

      <nav
        aria-label="Mobile dock"
        className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-around border-t border-vault-line bg-vault/95 px-3 backdrop-blur-xl md:hidden"
      >
        {mobileApps.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={() => openApp(app.href)}
            className="flex w-14 flex-col items-center gap-1"
            aria-label={`Open ${app.label}`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/15 bg-[#fffdf7] text-[#14130f]">
              <AppIcon kind={app.id} className="h-4 w-4" />
            </span>
            <span className={cn("text-[9px]", activeId === app.id ? "text-vault-text" : "text-vault-muted")}>
              {app.dockLabel}
            </span>
            <span className={cn("h-1 w-1 rounded-full", activeId === app.id ? "bg-gold" : "bg-transparent")} />
          </button>
        ))}
        <button
          type="button"
          onClick={onLaunchpad}
          className="flex w-14 flex-col items-center gap-1"
          aria-label="Open Launchpad"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/15 bg-[#fffdf7] text-[#14130f]">
            <AppIcon kind="launchpad" className="h-4 w-4" />
          </span>
          <span className="text-[9px] text-vault-muted">More</span>
          <span className="h-1 w-1 rounded-full bg-transparent" />
        </button>
      </nav>
    </>
  );
}
