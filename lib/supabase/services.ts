import { supabase } from "./init";

// GET

export async function getAllBeatmapset() {
   const { data, error } = await supabase.from("moddingData").select("*");
   if (error) {
      throw new Error(error.message);
   }
   return data;
}

//----------------------------------------------------------------------------
// POST

export async function addBeatmapset(beatmapID: number, data: any, dataSubmitted: string) {
   const { error: errorA } = await supabase.from("dataBeatmap").insert({ id: beatmapID, beatmap: data });
   const { error: errorB } = await supabase.from("moddingData").insert({
      id: beatmapID,
      title: data.title,
      artist: data.artist,
      dataSubmitted: dataSubmitted,
      length: data.beatmaps[0].total_length,
      bpm: data.bpm,
      status: data.status,
   });

   if (errorA || errorB) {
      throw new Error(errorA?.message || errorB?.message);
   }
}

//----------------------------------------------------------------------------
// DELETE

export async function deleteBeatmapset(id: number) {
   const { data: dataA, error: errorA } = await supabase.from("moddingData").delete().eq("id", id).select();
   const { data: dataB, error: errorB } = await supabase.from("dataBeatmap").delete().eq("id", id).select();

   if ((!dataA || dataA.length === 0) && (!dataB || dataB.length === 0)) {
      throw new Error("Permission denied: RLS blocked delete");
   }

   if (errorA || errorB) {
      throw new Error(errorA?.message || errorB?.message || "Unknown delete error");
   }
}
