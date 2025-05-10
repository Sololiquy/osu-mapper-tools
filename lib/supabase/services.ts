import { supabase } from "./init";

//----------------------------------------------------------------------------
// GET

export async function getBeatmapset(id: number) {
   const { data, error } = await supabase.from("dataBeatmap").select("beatmap").eq("id", id).single();
   if (error) {
      throw new Error(error.message);
   }
   return data.beatmap;
}

export async function getAllBeatmapset(loginID: number) {
   const hostID = Number(process.env.NEXT_PUBLIC_HOST_OSU_ID);
   if (loginID === hostID) {
      const { data, error } = await supabase.from("moddingData").select("*");
      if (error) {
         throw new Error(error.message);
      }
      return data;
   } else if (loginID !== hostID) {
      const { data, error } = await supabase.rpc("getAllBeatmapset", {
         userid: loginID,
      });
      if (error) {
         throw new Error(error.message);
      }
      return data;
   }
}

//----------------------------------------------------------------------------
// POST

export async function addBeatmapset(beatmapID: number, data: any, dataSubmitted: string, username: string, userID: number) {
   const { error } = await supabase.rpc("addbeatmapset", {
      id: beatmapID,
      beatmapdata: JSON.stringify(data),
      title: data.title,
      artist: data.artist,
      datasubmitted: dataSubmitted,
      length: data.beatmaps[0].total_length,
      bpm: data.bpm,
      status: data.status,
      host: data.creator,
      username: username,
      userid: userID,
   });

   if (error) {
      throw new Error(error.message);
   }
}

//----------------------------------------------------------------------------
// DELETE

export async function deleteBeatmapset(id: number, userID: number) {
   console.log("deleteBeatmapset", id, userID);
   const { error } = await supabase.rpc("deleteBeatmapset", {
      o_beatmapid: id,
      o_userid: userID,
   });
   if (error) {
      throw new Error(error.message);
   }
}
