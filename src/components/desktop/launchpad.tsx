"use client";

import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { AppIcon } from "@/components/desktop/app-icon";
import { desktopApps } from "@/lib/apps";

type LaunchpadProps = {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
  onSpotlight: () => void;
};

const pages = [
  { label: "New user guide", href: "/start-here/new-user-guide" },
  { label: "What is Zcash?", href: "/start-here/what-is-zec-and-zcash" },
  { label: "Wallet matrix", href: "/wallets" },
  { label: "Buying ZEC", href: "/using-zcash/buying-zec" },
  { label: "Using ZEC privately", href: "/guides/using-zec-privately" },
  { label: "zk-SNARKs", href: "/zcash-tech/zk-snarks" },
  { label: "Ironwood", href: "/zcash-tech/ironwood" },
  { label: "Zero to Zero", href: "/zero-to-zero-knowledge/zero-to-zero-knowledge" },
  { label: "FAQ", href: "/glossary-and-faqs/faq" },
  { label: "Organizations", href: "/zcash-organizations" },
  { label: "Community links", href: "/zcash-community/community-links" },
  { label: "Contribute", href: "/contribute" },
] as const;

export function Launchpad({ open, onClose, onNavigate, onSpotlight }: LaunchpadProps) {
  const navigate = (href: string) => {
    onClose();
    onNavigate(href);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="launchpad"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] overflow-y-auto bg-vault/90 px-5 py-8 backdrop-blur-2xl md:px-10 md:py-12"
          role="dialog"
          aria-modal="true"
          aria-label="Launchpad"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex min-h-[calc(100dvh-64px)] w-full max-w-5xl flex-col justify-center md:min-h-[calc(100dvh-96px)]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-vault-muted">Launchpad</p>
                <h2 className="mt-1 font-display text-4xl leading-none tracking-[-0.05em] text-vault-text">
                  Every page. One desk.
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onSpotlight}
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-vault-line px-3 text-xs text-vault-muted transition-colors hover:border-vault-text hover:text-vault-text"
                >
                  <Search className="h-3.5 w-3.5" />
                  Search
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close Launchpad"
                  autoFocus
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-vault-line text-vault-muted transition-colors hover:border-vault-text hover:text-vault-text"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-4 gap-x-4 gap-y-7 sm:grid-cols-6">
              {desktopApps.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => navigate(app.href)}
                  className="group flex flex-col items-center gap-2"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-[15px] border border-black/15 bg-[#fffdf7] text-[#14130f] shadow-[0_10px_24px_rgba(0,0,0,.35)] transition-transform duration-150 group-hover:-translate-y-1 md:h-16 md:w-16">
                    <AppIcon kind={app.id} className="h-6 w-6 md:h-7 md:w-7" />
                  </span>
                  <span className="text-center text-[10px] text-vault-muted transition-colors group-hover:text-vault-text">
                    {app.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-12 rounded-card border border-vault-line bg-vault-2/70 p-5 md:p-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-vault-muted">Pages</p>
              <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
                {pages.map((page) => (
                  <button
                    key={page.label}
                    type="button"
                    onClick={() => navigate(page.href)}
                    className="flex items-center justify-between border-b border-vault-line/70 py-2 text-left text-sm text-vault-muted transition-colors hover:text-vault-text"
                  >
                    {page.label}
                    <span className="font-mono text-[9px] text-vault-muted">↗</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
