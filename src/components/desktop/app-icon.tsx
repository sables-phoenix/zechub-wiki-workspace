import { HugeiconsIcon } from "@hugeicons/react";
import {
  BookOpen01Icon,
  ChartLineData01Icon,
  DashboardSquare01Icon,
  Globe02Icon,
  HandHeartIcon,
  Home01Icon,
  LibraryBigIcon,
  PencilEdit02Icon,
  Rocket01Icon,
  SentIcon,
  Settings01Icon,
  SourceCodeIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import type { AppId } from "@/lib/apps";
import { cn } from "@/lib/utils";

type IconKind = AppId | "launchpad";

type AppIconProps = {
  kind: IconKind;
  className?: string;
  size?: number;
};

const tones: Record<IconKind, string> = {
  home: "text-[#8a5c00]",
  start: "text-[#b6402e]",
  wallets: "text-[#8a5c00]",
  use: "text-[#2e6b4f]",
  learn: "text-[#b6402e]",
  build: "text-[#4a463e]",
  ecosystem: "text-[#2e6b4f]",
  library: "text-[#8a5c00]",
  network: "text-[#2e6b4f]",
  donate: "text-[#b6402e]",
  contribute: "text-[#8a5c00]",
  settings: "text-[#4a463e]",
  launchpad: "text-[#14130f]",
};

const icons: Record<IconKind, IconSvgElement> = {
  home: Home01Icon,
  start: Rocket01Icon,
  wallets: Wallet01Icon,
  use: SentIcon,
  learn: BookOpen01Icon,
  build: SourceCodeIcon,
  ecosystem: Globe02Icon,
  library: LibraryBigIcon,
  network: ChartLineData01Icon,
  donate: HandHeartIcon,
  contribute: PencilEdit02Icon,
  settings: Settings01Icon,
  launchpad: DashboardSquare01Icon,
};

export function AppIcon({ kind, className, size = 18 }: AppIconProps) {
  return (
    <HugeiconsIcon
      icon={icons[kind]}
      size={size}
      strokeWidth={1.6}
      color="currentColor"
      aria-hidden={true}
      className={cn("h-[18px] w-[18px]", tones[kind], className)}
    />
  );
}
