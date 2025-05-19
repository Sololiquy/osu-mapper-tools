import { supabase } from "./init";

//----------------------------------------------------------------------------
// GET

export async function getBeatmapset(beatmapID: number) {
   const { data, error } = await supabase.from("fullbeatmapdata").select("*").eq("beatmapid", beatmapID);
   if (error) {
      throw new Error(error.message);
   }
   return data[0].beatmapjson;
}

export async function getAllBeatmapset(loginID: number) {
   const hostID = Number(process.env.NEXT_PUBLIC_HOST_OSU_ID);
   const { data, error } = await supabase.rpc("getall_beatmapset", {
      o_userid: loginID,
      o_hostid: hostID,
   });
   if (error) {
      throw new Error(error.message);
   }
   return data;
}

//----------------------------------------------------------------------------
// POST

export async function addBeatmapset(beatmapID: number, data: any, dataSubmitted: string, username: string, userID: number) {
   const { error } = await supabase.rpc("add_beatmapset", {
      o_beatmapid: beatmapID,
      o_beatmapjson: data,
      o_title: data.title,
      o_artist: data.artist,
      o_submitdate: dataSubmitted,
      o_length: data.beatmaps[0].total_length,
      o_bpm: data.bpm,
      o_status: data.status,
      o_host: data.creator,
      o_username: username,
      o_userid: userID,
   });

   if (error) {
      throw new Error(error.message);
   }
}

//----------------------------------------------------------------------------
// DELETE

export async function deleteBeatmapset(beatmapID: number, userID: number) {
   console.log("deleteBeatmapset", beatmapID, userID);
   const { error } = await supabase.rpc("delete_beatmapset", {
      o_beatmapid: beatmapID,
      o_userid: userID,
   });
   if (error) {
      throw new Error(error.message);
   }
}
