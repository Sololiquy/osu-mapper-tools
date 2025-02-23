"use client";

import "../moddingQueue.css";
import React, { useContext } from "react";
import { contextModdingData } from "../page";

export default function BeatmapCard({ beatmap }: parameterType) {
  const id = beatmap.id;
  const { deleteBeatmapWindowVisiblity, deleteBeatmap } = useContext(contextModdingData);

  const minutes = Math.floor(beatmap.length / 60);
  const seconds = `0${beatmap.length % 60}`.slice(-2);
  const time = `${minutes}:${seconds}`;

  const headerBeatmapImg = `https://assets.ppy.sh/beatmaps/${beatmap.id}/covers/cover.jpg`;

  return (
    <div className="bg-[rgb(50,50,50)]">
      <div className="w-full h-[100px] relative">
        <button className={`buttonDeleteBeatmap ${deleteBeatmapWindowVisiblity} bg-red-600`} onClick={() => deleteBeatmap(id)}>
          DELETE
        </button>
        <div className="beatmapInfo py-0.5 bg-gradient-to-r from-gray-700 to-transparent">
          <div className="flex flex-row gap-1.5 items-center">
            <img className="size-4" src="/length_icon.svg" alt="" />
            <span className="text-sm">{time}</span>
          </div>
          <div className="flex flex-row gap-1.5 items-center">
            <img className="size-4" src="/bpm_icon.svg" alt="" />
            <span className="text-sm">{beatmap.bpm}</span>
          </div>
        </div>
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
  beatmap: {
    length: number;
    bpm: number;
    id: number;
    title: string;
    artist: string;
  };
}
