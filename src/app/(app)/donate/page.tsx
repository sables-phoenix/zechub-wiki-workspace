import type { Metadata } from "next";
import { DonateView } from "@/components/donate-view";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support open Zcash education with a donation to ZecHub.",
};

export default function DonatePage() {
  return <DonateView />;
}
