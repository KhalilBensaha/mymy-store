import { NextRequest, NextResponse } from "next/server";
import { getEcoOrders } from "@/lib/ecotrack";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sp = req.nextUrl.searchParams;
  try {
    const data = await getEcoOrders({
      page: sp.get("page") || undefined,
      start_date: sp.get("start_date") || undefined,
      end_date: sp.get("end_date") || undefined,
      tracking: sp.get("tracking") || undefined,
    });
    return NextResponse.json(data);
  } catch (err) {
    console.error("EcoTrack orders error:", err);
    return NextResponse.json(
      { error: "Failed to fetch EcoTrack orders" },
      { status: 500 }
    );
  }
}
