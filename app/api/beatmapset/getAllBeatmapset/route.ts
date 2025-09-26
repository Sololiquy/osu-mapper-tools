import { NextResponse } from "next/server";
import { getAllBeatmapset, updateBeatmapset } from "@/lib/supabase/services";

export async function POST(req: Request) {
   const { token, userID, username } = await req.json();

   if (!token || !userID) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   try {
      const data = await getAllBeatmapset(userID);

      for (const bm of data) {
         if (!bm.data_update) {
            console.log("updating beatmap ", bm.beatmapid, " by ", username, " (", userID, ")");
            const response = await fetch(`https://osu.ppy.sh/api/v2/beatmapsets/${bm.beatmapid}`, {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${token}`,
               },
            });

            if (response.ok) {
               const converteData = await response.json();
               ["converts", "pack_tags", "recent_favourites", "related_users", "related_tags", "user"].forEach((key) => delete converteData[key]);

               await updateBeatmapset(bm.beatmapid, converteData);
            }
         }
      }

      const updatedData = await getAllBeatmapset(userID);

      return NextResponse.json(updatedData, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
   }
}
