import { NextRequest, NextResponse } from "next/server";
import { getBeatmapset } from "@/lib/supabase/services";

export async function GET(req: NextRequest) {
   try {
      const id = Number(new URL(req.url).searchParams.get("id"));
      if (!id) {
         return NextResponse.json({ error: "Beatmap ID not found" }, { status: 400 });
      }
      const data = await getBeatmapset(id);
      return NextResponse.json(data, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
   }
}
