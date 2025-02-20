import { NextResponse } from "next/server";
import { getAllBeatmapset } from "@/lib/supabase/services";

export async function GET() {
  try {
    const data = await getAllBeatmapset();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
