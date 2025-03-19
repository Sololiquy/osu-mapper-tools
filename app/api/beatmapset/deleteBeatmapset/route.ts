import { NextRequest, NextResponse } from "next/server";
import { deleteBeatmapset } from "@/lib/supabase/services";

export async function DELETE(req: NextRequest) {
   try {
      const { id } = await req.json();
      if (!id) {
         return NextResponse.json({ error: "Beatmap ID is required" }, { status: 400 });
      }
      await deleteBeatmapset(id);
      return NextResponse.json({ message: "Beatmap deleted successfully" }, { status: 200 });
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 403 });
   }
}
