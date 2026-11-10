import type { Metadata } from "next";
import { DonateView } from "@/components/donate-view";

export const metadata: Metadata = {
  title: "Donate to ZecHub",
  description: "Support ZecHub's open-source mission to provide unbiased, global educational materials and tutorials for the Zcash ecosystem.",
};

export default function DonatePage() {
  return <DonateView />;
}
