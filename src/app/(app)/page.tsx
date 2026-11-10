import { HomeView } from "@/components/home-view";
import { getNetworkSnapshot } from "@/lib/network";

export const revalidate = 300;

export default async function HomePage() {
  const network = await getNetworkSnapshot();
  return <HomeView network={network} />;
}
