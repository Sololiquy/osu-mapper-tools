import { supabase } from "./init";

export async function getAllBeatmapset() {
  const { data, error } = await supabase.from("moddingData").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function addBeatmapset(beatmapID: number, data: any, dataSubmitted: string) {
  const { error } = await supabase.from("moddingData").insert([
    {
      id: beatmapID,
      title: data.title,
      artist: data.artist,
      dataSubmitted: dataSubmitted,
      status: data.status,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
}
export async function deleteBeatmapset(id: number) {
  const { error } = await supabase.from("moddingData").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
