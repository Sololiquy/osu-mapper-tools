import { NextRequest, NextResponse } from "next/server";
import { deleteBeatmapset } from "@/lib/supabase/services";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    console.log(id);
    if (!id) {
      return NextResponse.json({ error: "Beatmap ID is required" }, { status: 400 });
    }
    await deleteBeatmapset(id);

    return NextResponse.json({ message: "Beatmap deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
