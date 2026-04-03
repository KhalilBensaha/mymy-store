import { NextRequest, NextResponse } from "next/server";
import { requestReturn } from "@/lib/ecotrack";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const tracking = req.nextUrl.searchParams.get("tracking");
  if (!tracking) {
    return NextResponse.json(
      { success: false, message: "tracking is required" },
      { status: 400 }
    );
  }

  try {
    const result = await requestReturn(tracking);
    return NextResponse.json(result);
  } catch (err) {
    console.error("EcoTrack request return error:", err);
    return NextResponse.json(
      { success: false, message: "Erreur de connexion à EcoTrack" },
      { status: 502 }
    );
  }
}
