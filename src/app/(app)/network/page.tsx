import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { NetworkTabs } from "@/components/network-tabs";
import { SectionHero } from "@/components/section-hero";
import { Button } from "@/components/ui/button";
import { getNetworkSnapshot } from "@/lib/network";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Live analytics, metrics, shielded pool statistics, DAO treasury status, YouTube stats, and ZCG grants tracking for the Zcash ecosystem.",
};

export const revalidate = 300;

export default async function NetworkPage() {
  const network = await getNetworkSnapshot();

  return (
    <>
      <SectionHero
        eyebrow="Dashboard"
        title="Dashboard"
        description="Analyze Zcash network metrics and trends. Price, supply, shielded value, and block activity from the ZecHub network API."
        actions={
          <Button asChild variant="secondary">
            <a href="https://zechub.wiki/dashboard" target="_blank" rel="noreferrer">
              Full dashboard
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        }
        meta={
          <>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-green" />
              {network.live ? "Live data" : "Cached snapshot"}
            </span>
            <span>Updated every 5 minutes</span>
            <span>Source: zechub.wiki/api</span>
          </>
        }
      />
      <NetworkTabs network={network} />
    </>
  );
}
