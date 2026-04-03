import { NextRequest, NextResponse } from "next/server";
import { getCommunes } from "@/lib/ecotrack";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  const rl = rateLimit(ip, 30, 60_000);
  if (!rl.success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  const wilayaId = req.nextUrl.searchParams.get("wilaya_id");
  if (!wilayaId) {
    return NextResponse.json([], { status: 400 });
  }
  try {
    const data = await getCommunes(wilayaId);
    return NextResponse.json(data);
  } catch (err) {
    console.error("EcoTrack communes error:", err);
    return NextResponse.json([], { status: 502 });
  }
}
