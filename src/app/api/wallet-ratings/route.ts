import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET() {
  try {
    const response = await fetch("https://zechub.wiki/api/wallet-likes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "", delta: 0 }),
      next: { revalidate: 60 },
    });
    if (!response.ok) throw new Error(`wallet likes returned ${response.status}`);
    const data = (await response.json()) as Record<string, number>;
    return NextResponse.json(data, {
      headers: { "cache-control": "public, s-maxage=60, stale-while-revalidate=120" },
    });
  } catch {
    return NextResponse.json({}, { status: 200 });
  }
}
