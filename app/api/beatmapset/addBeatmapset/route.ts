import { NextResponse } from "next/server";
import { addBeatmapset } from "@/lib/supabase/services";

export async function POST(req: Request) {
  try {
    const { token, beatmapID, dataSubmitted } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Missing access token" }, { status: 401 });
    }

    const response = await fetch(`https://osu.ppy.sh/api/v2/beatmapsets/${beatmapID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!data || !data.title) {
      return NextResponse.json({ error: "Beatmap not found" }, { status: 404 });
    }

    await addBeatmapset(beatmapID, data, dataSubmitted);

    return NextResponse.json({ success: true, beatmap: data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "An unknown error occurred" }, { status: 500 });
  }
}
