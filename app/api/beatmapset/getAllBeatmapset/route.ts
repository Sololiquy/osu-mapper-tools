import { NextRequest, NextResponse } from "next/server";
import { getAllBeatmapset } from "@/lib/supabase/services";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
   const token = await getToken({ req });
   const loginID = Number(token?.id);

   if (!token || !token.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   try {
      const data = await getAllBeatmapset(loginID);
      return NextResponse.json(data, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
   }
}
