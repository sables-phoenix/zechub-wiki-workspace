import type { ReactNode } from "react";
import { DesktopShell } from "@/components/desktop/desktop-shell";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <DesktopShell>{children}</DesktopShell>;
}
