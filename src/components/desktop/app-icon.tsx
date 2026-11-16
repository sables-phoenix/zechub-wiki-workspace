import type { ComponentType } from "react";
import BookIcon from "@/components/animated-icons/book-icon";
import ChartLineIcon from "@/components/animated-icons/chart-line-icon";
import CodeIcon from "@/components/animated-icons/code-icon";
import GearIcon from "@/components/animated-icons/gear-icon";
import GlobeIcon from "@/components/animated-icons/globe-icon";
import HandHeartIcon from "@/components/animated-icons/hand-heart-icon";
import HomeIcon from "@/components/animated-icons/home-icon";
import LayoutDashboardIcon from "@/components/animated-icons/layout-dashboard-icon";
import Stack3Icon from "@/components/animated-icons/stack-3-icon";
import PenIcon from "@/components/animated-icons/pen-icon";
import RocketIcon from "@/components/animated-icons/rocket-icon";
import { SendIcon } from "@/components/animated-icons/send-icon";
import { WalletIcon } from "@/components/animated-icons/wallet-icon";
import type { AppId } from "@/lib/apps";
import { cn } from "@/lib/utils";

type IconKind = AppId | "launchpad";

type AppIconProps = {
  kind: IconKind;
  className?: string;
  size?: number;
};

type AnimatedIcon = ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
  "aria-hidden"?: boolean;
}>;


const icons: Record<IconKind, AnimatedIcon> = {
  home: HomeIcon,
  start: RocketIcon,
  wallets: WalletIcon,
  use: SendIcon,
  learn: BookIcon,
  build: CodeIcon,
  ecosystem: GlobeIcon,
  library: Stack3Icon,
  network: ChartLineIcon,
  donate: HandHeartIcon,
  contribute: PenIcon,
  settings: GearIcon,
  launchpad: LayoutDashboardIcon,
};

export function AppIcon({ kind, className, size = 18 }: AppIconProps) {
  const Icon = icons[kind];
  return (
    <Icon
      size={size}
      strokeWidth={1.7}
      className={cn("h-[18px] w-[18px] text-[#14130f]", className)}
      aria-hidden={true}
    />
  );
}
