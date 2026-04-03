import { NextRequest, NextResponse } from "next/server";
import { getOrderUpdates } from "@/lib/ecotrack";

export async function GET(req: NextRequest) {
  const tracking = req.nextUrl.searchParams.get("tracking");
  if (!tracking) {
    return NextResponse.json([], { status: 400 });
  }
  try {
    const data = await getOrderUpdates(tracking);
    return NextResponse.json(data);
  } catch (err) {
    console.error("EcoTrack updates error:", err);
    return NextResponse.json([], { status: 502 });
  }
}
