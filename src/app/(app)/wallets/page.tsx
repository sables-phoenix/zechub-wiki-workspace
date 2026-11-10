import type { Metadata } from "next";
import { WalletsView } from "@/components/wallets-view";

export const metadata: Metadata = {
  title: "Wallets",
  description: "Compare 38 Zcash wallets by device, shielded pool, and NU7 readiness.",
};

export default function WalletsPage() {
  return <WalletsView />;
}
