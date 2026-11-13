import type { Metadata } from "next";
import { WalletsView } from "@/components/wallets-view";

export const metadata: Metadata = {
  title: "Wallets",
  description: "Compare Zcash wallets by device, shielded pool, operating system, wallet support, features, and NU7 readiness.",
};

export default function WalletsPage() {
  return <WalletsView />;
}
