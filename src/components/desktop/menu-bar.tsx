"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Check, Globe2, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useI18n } from "@/components/i18n-provider";
import { localeMeta, localePath, stripLocale } from "@/lib/i18n";
import { rememberLocale } from "@/lib/locale-cookie";
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
  const { t } = useI18n();
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

  const menus: readonly { label: string; items: readonly MenuItem[] }[] = [
    {
      label: t("shell.wiki", "Wiki"),
      items: [
        { label: t("common.home", "Home"), href: "/" },
        { label: t("shell.startHere", "Start Here"), href: "/start-here" },
        { label: t("shell.wallets", "Wallets"), href: "/wallets" },
        { label: t("shell.library", "Library"), href: "/library" },
      ],
    },
    {
      label: t("shell.sections", "Sections"),
      items: [
        { label: t("shell.usingZcash", "Using Zcash"), href: "/using-zcash" },
        { label: t("shell.learn", "Learn"), href: "/learn" },
        { label: t("shell.build", "Build"), href: "/build" },
        { label: t("shell.ecosystem", "Ecosystem"), href: "/ecosystem" },
      ],
    },
    {
      label: t("shell.go", "Go"),
      items: [
        { label: t("shell.search", "Spotlight"), action: onSpotlight },
        { label: t("shell.launchpad", "Launchpad"), action: onLaunchpad },
        { label: t("shell.network", "Network"), href: "/network" },
        { label: t("shell.donate", "Donate"), href: "/donate" },
        { label: t("shell.tutorials", "Tutorials"), href: "/zechub-tutorial" },
        { label: t("shell.visualizers", "Visualizers"), href: "/visualizer" },
        { label: t("shell.hackathon", "Hackathon"), href: "/hackathon" },
        { label: t("shell.ambassadors", "Ambassadors"), href: "/zcash-global-ambassadors" },
        { label: t("shell.developers", "Developers"), href: "/developers" },
        { label: t("shell.merchantMap", "Merchant map"), href: "/map" },
        { label: t("shell.brand", "Brand"), href: "/zcash-organizations/brand" },
        { label: t("shell.privacy", "Privacy"), href: "/privacy" },
      ],
    },
    {
      label: t("shell.help", "Help"),
      items: [
        { label: t("shell.openZechub", "Open zechub.wiki"), href: "https://zechub.wiki", external: true },
        { label: t("shell.bounties", "Bounties"), href: "https://bounties.zechub.wiki/", external: true },
        { label: t("shell.shop", "Shop"), href: "https://zechub.store", external: true },
        { label: t("shell.zkavClub", "ZKAV Club"), href: "https://zkav.club", external: true },
        { label: t("shell.free2z", "Free2Z"), href: "https://free2z.cash", external: true },
        { label: t("shell.payWithZcash", "Pay with Zcash"), href: "https://paywithz.cash", external: true },
        { label: t("shell.zecMap", "ZecMap"), href: "https://zecmap.com", external: true },
        { label: t("shell.youtube", "YouTube"), href: "https://www.youtube.com/channel/UC3-KM00kjCUheRzO5cq3PAA", external: true },
        { label: t("shell.x", "X"), href: "https://x.com/zechub", external: true },
        { label: t("shell.contribute", "Contribute"), href: "/contribute" },
        { label: t("shell.github", "GitHub"), href: "https://github.com/ZecHub/zechub", external: true },
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
          className="h-[18px] w-[18px] rounded-full invert dark:invert-0"
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
        {t(appKey[meta.app.id] ?? "common.home", meta.app.label)}
      </span>

      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          onClick={onSpotlight}
          className="flex h-6 items-center gap-1.5 rounded-md px-2 text-vault-muted transition-colors hover:bg-black/5 dark:hover:bg-white/10 hover:text-vault-text"
        >
          <MagnifierIcon size={12} />
          <span className="hidden sm:inline">{t("shell.search", "Search")}</span>
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
          {t("shell.donate", "Donate")}
        </button>
        <MenuBarClock />
      </div>
    </header>
  );
}

function MenuBarClock() {
  const now = useLocalNow();
  const { locale } = useI18n();

  const date = now
    ? new Intl.DateTimeFormat(locale, {
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(now)
    : "--";

  const time = now
    ? new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now)
    : "--:--";

  const zone = now
    ? new Intl.DateTimeFormat(locale, { timeZoneName: "short" })
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
          className="rounded px-1.5 py-1 capitalize text-vault-muted transition-colors hover:bg-black/5 dark:hover:bg-white/10 hover:text-vault-text data-[state=open]:bg-black/5 dark:data-[state=open]:bg-white/10 data-[state=open]:text-vault-text"
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
            className="text-xs capitalize"
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LanguageMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, t } = useI18n();
  const { path } = stripLocale(pathname);
  const current = locale.toUpperCase();

  const choose = (code: string) => {
    const next = (code || "en") as typeof locale;
    rememberLocale(next);
    router.push(localePath(next, path));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={t("common.language", "Language")}
          className="hidden h-6 items-center gap-1.5 rounded-md px-1.5 text-vault-muted transition-colors hover:bg-black/5 dark:hover:bg-white/10 hover:text-vault-text data-[state=open]:bg-black/5 dark:data-[state=open]:bg-white/10 data-[state=open]:text-vault-text sm:flex"
        >
          <Globe2 className="h-3.5 w-3.5" />
          <span className="font-mono text-[8px] uppercase tracking-[0.08em]">{current}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-[70vh] w-56 overflow-y-auto">
        <DropdownMenuLabel>{t("common.language", "Language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code || "en"}
            onSelect={() => choose(language.code)}
            className="text-xs capitalize"
          >
            <span className={language.code === locale || (!language.code && locale === "en") ? "font-medium text-ink" : ""}>
              {language.label}
            </span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <p className="px-2 py-1.5 text-[10px] leading-relaxed text-muted">
          {t("common.languageNote", "The language changes inside this workspace.")}
        </p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ControlCenter({ onNavigate }: { onNavigate: (href: string) => void }) {
  const { theme, setTheme } = useTheme();
  const { t, locale } = useI18n();
  const mounted = useMounted();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("zec:close-popovers", close);
    return () => window.removeEventListener("zec:close-popovers", close);
  }, []);

  const options = [
    { value: "light", label: t("shell.paper", "Paper"), icon: SunIcon },
    { value: "dark", label: t("shell.vault", "Vault"), icon: MoonIcon },
    { value: "system", label: t("shell.system", "System"), icon: Monitor },
  ] as const;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Control Center"
          className="flex h-6 w-6 items-center justify-center rounded-md text-vault-muted transition-colors hover:bg-black/5 dark:hover:bg-white/10 hover:text-vault-text data-[state=open]:bg-black/5 dark:data-[state=open]:bg-white/10 data-[state=open]:text-vault-text"
        >
          <PaintIcon size={14} className="h-3.5 w-3.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-3">
        <DropdownMenuLabel className="px-0 pt-0">
          {t("shell.controlCenter", "Control Center")}
        </DropdownMenuLabel>
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
          {t("shell.theme", "Theme")}
        </p>
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
            <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
              {t("shell.reading", "Reading")}
            </p>
            <p className="mt-1 text-xs font-medium">{localeMeta[locale].label}</p>
          </div>
          <div className="rounded-lg border border-line bg-paper-2 p-2.5">
            <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
              {t("shell.liveData", "Live data")}
            </p>
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
            {t("shell.openSettings", "Open settings")}
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
