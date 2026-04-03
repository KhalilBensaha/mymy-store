import { NextResponse } from "next/server";
import { getFees } from "@/lib/ecotrack";

let cache: { data: Awaited<ReturnType<typeof getFees>>; ts: number } | null =
  null;
const TTL = 1000 * 60 * 60; // 1 hour

export async function GET() {
  try {
    if (cache && Date.now() - cache.ts < TTL) {
      return NextResponse.json(cache.data);
    }
    const data = await getFees();
    cache = { data, ts: Date.now() };
    return NextResponse.json(data);
  } catch (err) {
    console.error("EcoTrack fees error:", err);
    return NextResponse.json([], { status: 502 });
  }
}
