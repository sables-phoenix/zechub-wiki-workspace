import {
  Activity,
  ArrowLeftRight,
  BookOpen,
  Flag,
  Globe2,
  Heart,
  Home,
  LayoutGrid,
  Library,
  PenLine,
  Settings,
  Terminal,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { AppId } from "@/lib/apps";
import { cn } from "@/lib/utils";

type IconKind = AppId | "launchpad";

type AppIconProps = {
  kind: IconKind;
  className?: string;
};

const icons: Record<IconKind, LucideIcon> = {
  home: Home,
  start: Flag,
  wallets: Wallet,
  use: ArrowLeftRight,
  learn: BookOpen,
  build: Terminal,
  ecosystem: Globe2,
  library: Library,
  network: Activity,
  donate: Heart,
  contribute: PenLine,
  settings: Settings,
  launchpad: LayoutGrid,
};

export function AppIcon({ kind, className }: AppIconProps) {
  const Icon = icons[kind];
  return <Icon strokeWidth={1.7} aria-hidden="true" className={cn("h-4 w-4", className)} />;
}
