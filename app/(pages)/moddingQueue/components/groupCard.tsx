"use client";

import React from "react";
import BeatmapCard from "./beatmapCard";

import "../moddingQueue.css";

export default function GroupCard({ date, beatmaps }: parameterType) {
   return (
      <div className="modContainer">
         <div className="text-lg font-bold">{date}</div>
         {beatmaps.map((beatmap) => (
            <BeatmapCard key={beatmap.id} beatmap={beatmap} />
         ))}
      </div>
   );
}

interface parameterType {
   date: string;
   beatmaps: any[];
}
