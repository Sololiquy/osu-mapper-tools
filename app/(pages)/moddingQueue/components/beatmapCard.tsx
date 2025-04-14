"use client";

import "../moddingQueue.css";
import React, { useContext } from "react";
import Link from "next/link";
import { contextModdingData } from "../context";

export default function BeatmapCard({ beatmap }: parameterType) {
   const id = beatmap.id;
   const { deleteBeatmapWindowVisiblity, deleteBeatmap } = useContext(contextModdingData);

   const time = `${Math.floor(beatmap.length / 60)}:${`0${beatmap.length % 60}`.slice(-2)}`;
   const bgStatusColor =
      {
         ranked: "bg-green-600",
         pending: "bg-yellow-600",
         wip: "bg-orange-600",
         loved: "bg-pink-600",
      }[beatmap.status] || "bg-gray-600";

   const headerBeatmapImg = `https://assets.ppy.sh/beatmaps/${beatmap.id}/covers/cover.jpg`;

   return (
      <div className="bg-[rgb(50,50,50)]">
         <div className="w-full h-[100px] relative">
            <button className={`buttonDeleteBeatmap ${deleteBeatmapWindowVisiblity} bg-red-600`} onClick={() => deleteBeatmap(id)}>
               DELETE
            </button>
            <div className="beatmapInfo py-0.5 bg-gradient-to-r from-gray-900 to-transparent">
               <div className="flex flex-row gap-1.5 items-center">
                  <img className="size-4" src="/length_icon.svg" alt="" />
                  <span className="text-sm">{time}</span>
               </div>
               <div className="flex flex-row gap-1.5 items-center">
                  <img className="size-4" src="/bpm_icon.svg" alt="" />
                  <span className="text-sm">{beatmap.bpm}</span>
               </div>
            </div>
            <div className={`beatmapStatus ${bgStatusColor}`}>{beatmap.status.toUpperCase()}</div>
            <Link href={`/beatmapDetail/${beatmap.id}`}>
               <img className="w-full h-full object-cover" src={headerBeatmapImg} alt="" />
            </Link>
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
      status: string;
   };
}
