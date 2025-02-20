"use client";

import "../moddingQueue.css";
import React, { useContext } from "react";
import { contextModdingData } from "../page";

export default function BeatmapCard({ beatmap }: parameterType) {
  const id = beatmap.id;
  const { deleteBeatmapWindowVisiblity, deleteBeatmap } = useContext(contextModdingData);

  const headerBeatmapImg = `https://assets.ppy.sh/beatmaps/${beatmap.id}/covers/cover.jpg`;

  return (
    <div className="bg-[rgb(50,50,50)]">
      <div className="w-full h-[100px] relative">
        <button className={`buttonDeleteBeatmap ${deleteBeatmapWindowVisiblity} bg-red-600`} onClick={() => deleteBeatmap(id)}>
          DELETE
        </button>
        <img className="w-full h-full object-cover" src={headerBeatmapImg} alt="" />
      </div>
      <div>
        <div className="overflow-hidden whitespace-nowrap">{beatmap.title}</div>
        <div className="text-sm italic">{beatmap.artist}</div>
      </div>
    </div>
  );
}

interface parameterType {
  beatmap: { id: number; title: string; artist: string };
}
