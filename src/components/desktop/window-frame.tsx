"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { WindowMeta } from "@/lib/apps";
import type { WindowMode } from "@/lib/window";

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

  return (
    <div
      className="window-frame flex h-full flex-col overflow-hidden rounded-[13px] border border-vault-line bg-paper text-ink shadow-[0_30px_80px_rgba(0,0,0,.55)]"
      role="region"
      aria-label={`${meta.app.label} window`}
    >
      <div
        className="flex h-9 shrink-0 items-center gap-3 border-b border-line bg-paper-2 px-3"
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close window"
            title="Close window"
            className="flex h-4 w-4 items-center justify-center rounded-full bg-rust transition-opacity hover:opacity-80"
          >
            <span className="sr-only">Close window</span>
          </button>
          <button
            type="button"
            onClick={onMinimize}
            aria-label="Minimize window"
            title="Minimize window"
            className="flex h-4 w-4 items-center justify-center rounded-full bg-gold transition-opacity hover:opacity-80"
          >
            <span className="sr-only">Minimize window</span>
          </button>
          <button
            type="button"
            onClick={onMaximize}
            aria-label={mode === "maximized" ? "Restore window" : "Maximize window"}
            title={mode === "maximized" ? "Restore window" : "Maximize window"}
            className="flex h-4 w-4 items-center justify-center rounded-full bg-green transition-opacity hover:opacity-80"
          >
            <span className="sr-only">{mode === "maximized" ? "Restore window" : "Maximize window"}</span>
          </button>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <p className="truncate text-[11px] font-medium">{meta.app.label}</p>
          <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">{meta.subtitle}</span>
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
