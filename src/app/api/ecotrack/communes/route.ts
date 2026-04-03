import { NextRequest, NextResponse } from "next/server";
import { getCommunes } from "@/lib/ecotrack";

export async function GET(req: NextRequest) {
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
