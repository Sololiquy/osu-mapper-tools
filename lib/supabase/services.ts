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
  const { error: errorA } = await supabase.from("moddingData").delete().eq("id", id);
  const { error: errorB } = await supabase.from("dataBeatmap").delete().eq("id", id);

  if (errorA || errorB) {
    throw new Error(errorA?.message || errorB?.message);
  }
}
