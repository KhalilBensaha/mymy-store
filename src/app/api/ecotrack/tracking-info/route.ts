import { NextRequest, NextResponse } from "next/server";
import { getTrackingInfo } from "@/lib/ecotrack";

export async function GET(req: NextRequest) {
  const tracking = req.nextUrl.searchParams.get("tracking");
  if (!tracking) {
    return NextResponse.json([], { status: 400 });
  }
  try {
    const data = await getTrackingInfo(tracking);
    return NextResponse.json(data);
  } catch (err) {
    console.error("EcoTrack tracking info error:", err);
    return NextResponse.json([], { status: 502 });
  }
}
