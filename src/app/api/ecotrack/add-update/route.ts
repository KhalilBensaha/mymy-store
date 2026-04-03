import { NextRequest, NextResponse } from "next/server";
import { addOrderUpdate } from "@/lib/ecotrack";

export async function POST(req: NextRequest) {
  const tracking = req.nextUrl.searchParams.get("tracking");
  const content = req.nextUrl.searchParams.get("content");

  if (!tracking || !content) {
    return NextResponse.json(
      { success: false, message: "tracking and content are required" },
      { status: 400 }
    );
  }

  if (content.length > 255) {
    return NextResponse.json(
      { success: false, message: "content max 255 characters" },
      { status: 400 }
    );
  }

  try {
    const ok = await addOrderUpdate(tracking, content);
    return NextResponse.json({ success: ok });
  } catch (err) {
    console.error("EcoTrack add update error:", err);
    return NextResponse.json({ success: false }, { status: 502 });
  }
}
