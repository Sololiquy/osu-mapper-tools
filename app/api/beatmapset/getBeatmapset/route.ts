import { NextResponse } from "next/server";
import { getBeatmapset } from "@/lib/supabase/services";

export async function POST(req: Request) {
   try {
      const { beatmapID } = await req.json();

      if (!beatmapID) {
         return NextResponse.json({ error: "Beatmap ID not found" }, { status: 400 });
      }

      const data = await getBeatmapset(beatmapID);
      return NextResponse.json(data, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
   }
}
