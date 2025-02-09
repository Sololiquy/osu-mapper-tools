"use client";

import "../moddingQueue.css";
import React from "react";

export default function BeatmapCard({ beatmap }: parameterType) {
  const headerBeatmapImg = `https://assets.ppy.sh/beatmaps/${beatmap.id}/covers/cover.jpg`;

  return (
    <div className="bg-[rgb(50,50,50)]">
      <div className="w-full h-[100px]">
        <img className="w-full h-full object-cover" src={headerBeatmapImg} alt="" />
      </div>
      <div>
        <div>{beatmap.title}</div>
        <div className="text-sm italic">{beatmap.artist}</div>
      </div>
    </div>
  );
}

interface parameterType {
  beatmap: { id: number; title: string; artist: string };
}
