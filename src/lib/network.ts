export type NetworkSnapshot = {
  priceUsd: number;
  priceBtc: number;
  marketCapUsd: number;
  circulation: number;
  shieldedZec: number;
  blocks: number;
  transactions24h: number;
  shieldedShare: number;
  live: boolean;
};

const priceUrl =
  "https://zechub.wiki/api/prices/simple?ids=zcash&vs_currencies=usd%2Cbtc&include_market_cap=true";
const chainUrl = "https://zechub.wiki/api/blockchain-data";

const fallback: NetworkSnapshot = {
  priceUsd: 1025.63,
  priceBtc: 0.01396178,
  marketCapUsd: 17_502_157_763,
  circulation: 17_034_587,
  shieldedZec: 4_988_435,
  blocks: 3_559_513,
  transactions24h: 21_784,
  shieldedShare: 4_988_435 / 17_034_587,
  live: false,
};

export async function getNetworkSnapshot(): Promise<NetworkSnapshot> {
  const [priceResult, chainResult] = await Promise.allSettled([
    fetch(priceUrl, { next: { revalidate: 300 } }),
    fetch(chainUrl, { next: { revalidate: 300 } }),
  ]);

  try {
    const priceResponse = priceResult.status === "fulfilled" ? priceResult.value : null;
    const chainResponse = chainResult.status === "fulfilled" ? chainResult.value : null;
    if (!priceResponse?.ok || !chainResponse?.ok) return fallback;

    const priceJson = (await priceResponse.json()) as {
      zcash?: { usd?: number; btc?: number; usd_market_cap?: number };
    };
    const chainJson = (await chainResponse.json()) as {
      data?: {
        blocks?: number;
        circulation?: number;
        shielded_value_zec?: number;
        transactions_24h?: number;
      };
    };

    const price = priceJson.zcash;
    const chain = chainJson.data;
    if (!price?.usd || !chain?.circulation) return fallback;

    return {
      priceUsd: price.usd,
      priceBtc: price.btc ?? fallback.priceBtc,
      marketCapUsd: price.usd_market_cap ?? fallback.marketCapUsd,
      circulation: chain.circulation,
      shieldedZec: chain.shielded_value_zec ?? fallback.shieldedZec,
      blocks: chain.blocks ?? fallback.blocks,
      transactions24h: chain.transactions_24h ?? fallback.transactions24h,
      shieldedShare: (chain.shielded_value_zec ?? fallback.shieldedZec) / chain.circulation,
      live: true,
    };
  } catch {
    return fallback;
  }
}

export const networkFallback = fallback;
