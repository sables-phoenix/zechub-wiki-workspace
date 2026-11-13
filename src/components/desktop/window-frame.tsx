"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import type { WindowMeta } from "@/lib/apps";
import type { WindowMode } from "@/lib/window";

const subtitleKey: Record<string, string> = {
  Welcome: "subtitles.welcome",
  Overview: "subtitles.overview",
  Article: "subtitles.article",
  Privacy: "subtitles.privacy",
  Developers: "subtitles.developers",
  Visualizers: "subtitles.visualizers",
  Hackathon: "subtitles.hackathon",
  Tutorials: "subtitles.tutorials",
  Ambassadors: "subtitles.ambassadors",
  "Pay with ZEC": "subtitles.payWithZec",
  Brand: "subtitles.brand",
  "Zcash Tech": "subtitles.zcashTech",
  "Use cases": "subtitles.useCases",
  "Privacy tools": "subtitles.privacyTools",
  "Zero to Zero": "subtitles.zeroToZero",
  Glossary: "subtitles.glossary",
  Guides: "subtitles.guides",
  Research: "subtitles.research",
  Community: "subtitles.community",
  Organizations: "subtitles.organizations",
  Organization: "subtitles.organization",
  "ZFAV Club": "subtitles.zfaVClub",
  "Site Navigation": "subtitles.siteNavigation",
  Dashboard: "subtitles.dashboard",
  "Donate to ZecHub": "subtitles.donate",
  "Help Build ZecHub": "subtitles.helpBuild",
  Preferences: "subtitles.preferences",
  Workspace: "subtitles.workspace",
};

const appKey: Record<string, string> = {
  home: "common.home",
  start: "shell.startHere",
  wallets: "shell.wallets",
  use: "shell.usingZcash",
  learn: "shell.learn",
  build: "shell.build",
  ecosystem: "shell.ecosystem",
  library: "shell.library",
  network: "shell.network",
  donate: "shell.donate",
  contribute: "shell.contribute",
  settings: "shell.settings",
};

type WindowFrameProps = {
  meta: WindowMeta;
  mode: WindowMode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  children: ReactNode;
};

export function WindowFrame({ meta, mode, onClose, onMinimize, onMaximize, children }: WindowFrameProps) {
  const pathname = usePathname();
  const { t } = useI18n();
  const label = t(appKey[meta.app.id] ?? "common.home", meta.app.label);
  const subtitle = t(subtitleKey[meta.subtitle] ?? "", meta.subtitle);

  return (
    <div
      className="window-frame flex h-full flex-col overflow-hidden rounded-[13px] border border-vault-line bg-paper text-ink shadow-[0_30px_80px_rgba(0,0,0,.55)]"
      role="region"
      aria-label={`${label} window`}
    >
      <div
        className="flex h-9 shrink-0 items-center gap-3 border-b border-line bg-paper-2 px-3"
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onClose}
            aria-label={t("shell.closeWindow", "Close window")}
            title={t("shell.closeWindow", "Close window")}
            className="flex h-4 w-4 items-center justify-center rounded-full bg-rust transition-opacity hover:opacity-80"
          >
            <span className="sr-only">{t("shell.closeWindow", "Close window")}</span>
          </button>
          <button
            type="button"
            onClick={onMinimize}
            aria-label={t("shell.minimizeWindow", "Minimize window")}
            title={t("shell.minimizeWindow", "Minimize window")}
            className="flex h-4 w-4 items-center justify-center rounded-full bg-gold transition-opacity hover:opacity-80"
          >
            <span className="sr-only">{t("shell.minimizeWindow", "Minimize window")}</span>
          </button>
          <button
            type="button"
            onClick={onMaximize}
            aria-label={mode === "maximized" ? t("shell.restoreWindow", "Restore window") : t("shell.maximizeWindow", "Maximize window")}
            title={mode === "maximized" ? t("shell.restoreWindow", "Restore window") : t("shell.maximizeWindow", "Maximize window")}
            className="flex h-4 w-4 items-center justify-center rounded-full bg-green transition-opacity hover:opacity-80"
          >
            <span className="sr-only">{mode === "maximized" ? t("shell.restoreWindow", "Restore window") : t("shell.maximizeWindow", "Maximize window")}</span>
          </button>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <p className="truncate text-[11px] font-medium capitalize">{label}</p>
          <span className="font-mono text-[8px] capitalize tracking-[0.1em] text-muted">{subtitle}</span>
        </div>
        <span className="ml-auto hidden items-center gap-1.5 rounded-full border border-line px-2 py-0.5 font-mono text-[7px] uppercase tracking-[0.08em] text-muted sm:inline-flex">
          <span className="h-1 w-1 rounded-full bg-green" />
          ZecHub Wiki
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className={cn("h-full min-h-full overflow-y-auto overscroll-contain bg-paper window-scroll")}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
