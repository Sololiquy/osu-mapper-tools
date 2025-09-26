import { NextResponse } from "next/server";
import { getServerTime } from "@/lib/supabase/services";

export async function GET() {
   try {
      const data = await getServerTime();
      return NextResponse.json(data, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
   }
}
