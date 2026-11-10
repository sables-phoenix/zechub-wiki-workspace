import { NextResponse } from "next/server";

export const revalidate = 300;

const priceUrl =
  "https://zechub.wiki/api/prices/simple?ids=zcash&vs_currencies=usd%2Cbtc&include_market_cap=true";

const fallback = {
  usd: 1025.63,
  btc: 0.01396178,
  marketCap: 17_502_157_763,
};

export async function GET() {
  try {
    const response = await fetch(priceUrl, { next: { revalidate: 300 } });
    if (!response.ok) return NextResponse.json(fallback);
    const json = (await response.json()) as {
      zcash?: { usd?: number; btc?: number; usd_market_cap?: number };
    };
    const price = json.zcash;
    if (!price?.usd) return NextResponse.json(fallback);
    return NextResponse.json({
      usd: price.usd,
      btc: price.btc ?? fallback.btc,
      marketCap: price.usd_market_cap ?? fallback.marketCap,
    });
  } catch {
    return NextResponse.json(fallback);
  }
}
