"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { DesktopWallpaper } from "@/components/desktop/desktop-wallpaper";
import { Dock } from "@/components/desktop/dock";
import { Launchpad } from "@/components/desktop/launchpad";
import { MenuBar } from "@/components/desktop/menu-bar";
import { Spotlight } from "@/components/desktop/spotlight";
import { WindowFrame } from "@/components/desktop/window-frame";
import { getWindowMeta } from "@/lib/apps";
import { cn } from "@/lib/utils";
import type { WindowMode } from "@/lib/window";

export function DesktopShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [windowMode, setWindowMode] = useState<WindowMode>("open");
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [launchpadOpen, setLaunchpadOpen] = useState(false);
  const meta = getWindowMeta(pathname);
  const hidden = windowMode === "minimized" || windowMode === "closed";

  const openWindow = useCallback(() => setWindowMode("open"), []);

  const closePopovers = useCallback(() => {
    window.dispatchEvent(new Event("zec:close-popovers"));
  }, []);

  const openSpotlight = useCallback(() => {
    closePopovers();
    setSpotlightOpen(true);
  }, [closePopovers]);

  const openLaunchpad = useCallback(() => {
    closePopovers();
    setLaunchpadOpen(true);
  }, [closePopovers]);

  const navigate = useCallback(
    (href: string) => {
      closePopovers();
      setWindowMode("open");
      setSpotlightOpen(false);
      setLaunchpadOpen(false);
      router.push(href);
    },
    [closePopovers, router],
  );

  const toggleMaximize = useCallback(() => {
    setWindowMode((current) => (current === "maximized" ? "open" : "maximized"));
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        closePopovers();
        setSpotlightOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closePopovers]);

  return (
    <div className="desktop-root relative h-dvh overflow-hidden bg-vault text-vault-text">
      <DesktopWallpaper onOpen={openWindow} showWidgets={hidden} />
      <MenuBar
        meta={meta}
        onSpotlight={openSpotlight}
        onLaunchpad={openLaunchpad}
        onNavigate={navigate}
      />
      <motion.div
        className={cn("desktop-window", windowMode === "maximized" && "is-maximized")}
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={hidden ? { opacity: 0, scale: 0.95, y: 18 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: hidden ? "none" : "auto" }}
      >
        <WindowFrame
          meta={meta}
          mode={windowMode}
          onClose={() => setWindowMode("closed")}
          onMinimize={() => setWindowMode("minimized")}
          onMaximize={toggleMaximize}
        >
          {children}
        </WindowFrame>
      </motion.div>
      <Dock pathname={pathname} onOpen={openWindow} onLaunchpad={openLaunchpad} />
      <Spotlight open={spotlightOpen} onOpenChange={setSpotlightOpen} onNavigate={navigate} />
      <Launchpad
        open={launchpadOpen}
        onClose={() => setLaunchpadOpen(false)}
        onNavigate={navigate}
        onSpotlight={() => {
          setLaunchpadOpen(false);
          openSpotlight();
        }}
      />
    </div>
  );
}
