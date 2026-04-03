import { NextRequest, NextResponse } from "next/server";
import { getMultiTrackingInfo } from "@/lib/ecotrack";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const trackingsParam = req.nextUrl.searchParams.get("trackings");
  if (!trackingsParam) {
    return NextResponse.json([], { status: 400 });
  }

  const trackings = trackingsParam.split(",").filter(Boolean);
  if (trackings.length === 0 || trackings.length > 100) {
    return NextResponse.json([], { status: 400 });
  }

  try {
    const data = await getMultiTrackingInfo(trackings);
    return NextResponse.json(data);
  } catch (err) {
    console.error("EcoTrack bulk tracking error:", err);
    return NextResponse.json([], { status: 502 });
  }
}
