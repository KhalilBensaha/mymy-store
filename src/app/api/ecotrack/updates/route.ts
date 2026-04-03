import { NextRequest, NextResponse } from "next/server";
import { getOrderUpdates } from "@/lib/ecotrack";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
