"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Check, Globe2, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MagnifierIcon } from "@/components/animated-icons/magnifier-icon";
import { MoonIcon } from "@/components/animated-icons/moon-icon";
import { PaintIcon } from "@/components/animated-icons/paint-icon";
import { SunIcon } from "@/components/animated-icons/sun-icon";
import { PriceTicker } from "@/components/price-ticker";
import { useLocalNow } from "@/hooks/use-local-now";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import type { WindowMeta } from "@/lib/apps";

type MenuBarProps = {
  meta: WindowMeta;
  onSpotlight: () => void;
  onLaunchpad: () => void;
  onNavigate: (href: string) => void;
};

type MenuItem = {
  label: string;
  href?: string;
  external?: boolean;
  action?: () => void;
};

const languages = [
  { code: "", label: "English" },
  { code: "it", label: "Italiano" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "pt", label: "Português" },
  { code: "ar", label: "العربية" },
  { code: "zh", label: "中文" },
  { code: "hi", label: "हिन्दी" },
  { code: "ru", label: "Русский" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "tr", label: "Türkçe" },
  { code: "uk", label: "Українська" },
  { code: "sw", label: "Kiswahili" },
  { code: "yo", label: "Yorùbá" },
  { code: "ig", label: "Igbo" },
  { code: "ak", label: "Akan" },
  { code: "ee", label: "Eʋegbe" },
  { code: "id", label: "Indonesia" },
  { code: "el", label: "Ελληνικά" },
] as const;

export function MenuBar({ meta, onSpotlight, onLaunchpad, onNavigate }: MenuBarProps) {
  const menus: readonly { label: string; items: readonly MenuItem[] }[] = [
    {
      label: "Wiki",
      items: [
        { label: "Home", href: "/" },
        { label: "Start Here", href: "/start-here" },
        { label: "Wallets", href: "/wallets" },
        { label: "Library", href: "/library" },
      ],
    },
    {
      label: "Sections",
      items: [
        { label: "Using Zcash", href: "/using-zcash" },
        { label: "Learn", href: "/learn" },
        { label: "Build", href: "/build" },
        { label: "Ecosystem", href: "/ecosystem" },
      ],
    },
    {
      label: "Go",
      items: [
        { label: "Spotlight", action: onSpotlight },
        { label: "Launchpad", action: onLaunchpad },
        { label: "Network", href: "/network" },
        { label: "Donate", href: "/donate" },
      ],
    },
    {
      label: "Help",
      items: [
        { label: "Open zechub.wiki", href: "https://zechub.wiki", external: true },
        { label: "Contribute", href: "/contribute" },
        { label: "GitHub", href: "https://github.com/ZecHub/zechub", external: true },
        { label: "Report a correction", href: "https://github.com/ZecHub/zechub", external: true },
      ],
    },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50 flex h-[30px] items-center gap-3 border-b border-vault-line bg-vault/95 px-3 text-[11px] text-vault-text backdrop-blur-xl">
      <button
        type="button"
        onClick={() => onNavigate("/")}
        className="flex shrink-0 items-center gap-2 font-semibold tracking-[-0.01em] transition-opacity hover:opacity-80"
      >
        <Image
          src="/brand/zechub-logo-white.png"
          alt=""
          width={18}
          height={18}
          className="h-[18px] w-[18px] rounded-full"
        />
        ZecHub
      </button>

      <div className="hidden items-center gap-0.5 lg:flex">
        {menus.map((menu) => (
          <MenuButton key={menu.label} label={menu.label} items={menu.items} onNavigate={onNavigate} />
        ))}
      </div>

      <span className="hidden text-vault-muted lg:inline">/</span>
      <span className="hidden font-mono text-[9px] uppercase tracking-[0.1em] text-vault-muted lg:inline">
        {meta.app.label}
      </span>

      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          onClick={onSpotlight}
          className="flex h-6 items-center gap-1.5 rounded-md px-2 text-vault-muted transition-colors hover:bg-white/10 hover:text-vault-text"
        >
          <MagnifierIcon size={12} />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden rounded border border-vault-line px-1 py-0.5 font-mono text-[8px] sm:inline">⌘K</kbd>
        </button>
        <PriceTicker variant="compact" className="hidden xl:flex" />
        <LanguageMenu />
        <ControlCenter onNavigate={onNavigate} />
        <button
          type="button"
          onClick={() => onNavigate("/donate")}
          className="hidden h-6 items-center rounded-full bg-gold px-2.5 text-[9px] font-medium text-gold-ink transition-opacity hover:opacity-90 sm:flex"
        >
          Donate
        </button>
        <MenuBarClock />
      </div>
    </header>
  );
}

function MenuBarClock() {
  const now = useLocalNow();

  const date = now
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(now)
    : "--";

  const time = now
    ? new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now)
    : "--:--";

  const zone = now
    ? new Intl.DateTimeFormat("en-US", { timeZoneName: "short" })
        .formatToParts(now)
        .find((part) => part.type === "timeZoneName")?.value
    : undefined;

  return (
    <span
      className="flex items-center gap-2 border-l border-vault-line pl-2"
      title={now ? `${date} ${time} ${zone ?? ""}` : undefined}
    >
      <span className="hidden font-mono text-[8px] uppercase tracking-[0.08em] text-vault-muted lg:inline">
        {date}
      </span>
      <span className="font-mono text-[9px] text-vault-muted">{time}</span>
    </span>
  );
}

function MenuButton({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: readonly MenuItem[];
  onNavigate: (href: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="rounded px-1.5 py-1 text-vault-muted transition-colors hover:bg-white/10 hover:text-vault-text data-[state=open]:bg-white/10 data-[state=open]:text-vault-text"
        >
          {label}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onSelect={() => {
              if (item.action) item.action();
              else if (item.href && item.external) window.open(item.href, "_blank", "noreferrer");
              else if (item.href) onNavigate(item.href);
            }}
            className="text-xs"
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LanguageMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Language"
          className="hidden h-6 items-center gap-1.5 rounded-md px-1.5 text-vault-muted transition-colors hover:bg-white/10 hover:text-vault-text data-[state=open]:bg-white/10 data-[state=open]:text-vault-text sm:flex"
        >
          <Globe2 className="h-3.5 w-3.5" />
          <span className="font-mono text-[8px] uppercase tracking-[0.08em]">EN</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-[70vh] w-52 overflow-y-auto">
        <DropdownMenuLabel>Read in another language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map((language) => (
          <DropdownMenuItem key={language.code || "en"} asChild className="text-xs">
            <a
              href={language.code ? `https://zechub.wiki/${language.code}` : "https://zechub.wiki"}
              target="_blank"
              rel="noreferrer"
            >
              {language.label}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ControlCenter({ onNavigate }: { onNavigate: (href: string) => void }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("zec:close-popovers", close);
    return () => window.removeEventListener("zec:close-popovers", close);
  }, []);

  const options = [
    { value: "light", label: "Day", icon: SunIcon },
    { value: "dark", label: "Night", icon: MoonIcon },
    { value: "system", label: "System", icon: Monitor },
  ] as const;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Control Center"
          className="flex h-6 w-6 items-center justify-center rounded-md text-vault-muted transition-colors hover:bg-white/10 hover:text-vault-text data-[state=open]:bg-white/10 data-[state=open]:text-vault-text"
        >
          <PaintIcon size={14} className="h-3.5 w-3.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-3">
        <DropdownMenuLabel className="px-0 pt-0">Control Center</DropdownMenuLabel>
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">Theme</p>
        <div className="mt-2 grid grid-cols-3 gap-1 rounded-lg border border-line bg-paper-2 p-1">
          {options.map((option) => {
            const Icon = option.icon;
            const selected = mounted && theme === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTheme(option.value)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-md px-1 py-2 text-[10px] text-muted transition-colors",
                  selected ? "bg-gold text-gold-ink" : "hover:bg-paper hover:text-ink",
                )}
              >
                <Icon size={13} className="h-3.5 w-3.5" />
                {option.label}
                {selected ? <Check className="h-3 w-3" /> : null}
              </button>
            );
          })}
        </div>
        <div className="mt-3 space-y-2">
          <div className="rounded-lg border border-line bg-paper-2 p-2.5">
            <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">Reading</p>
            <p className="mt-1 text-xs font-medium">English, canonical</p>
          </div>
          <div className="rounded-lg border border-line bg-paper-2 p-2.5">
            <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">Live data</p>
            <p className="mt-1 text-xs font-medium">ZecHub network API</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onNavigate("/settings");
            }}
            className="block w-full rounded-lg border border-line bg-paper-2 p-2.5 text-left text-xs text-ink transition-colors hover:border-ink/30"
          >
            Open settings
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
