import { NextRequest, NextResponse } from "next/server";
import { getWilayas } from "@/lib/ecotrack";
import { rateLimit } from "@/lib/rate-limit";

let cache: { data: Awaited<ReturnType<typeof getWilayas>>; ts: number } | null =
  null;
const TTL = 1000 * 60 * 60; // 1 hour

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  const rl = rateLimit(ip, 30, 60_000);
  if (!rl.success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  try {
    if (cache && Date.now() - cache.ts < TTL) {
      return NextResponse.json(cache.data);
    }
    const data = await getWilayas();
    cache = { data, ts: Date.now() };
    return NextResponse.json(data);
  } catch (err) {
    console.error("EcoTrack wilayas error:", err);
    return NextResponse.json([], { status: 502 });
  }
}
