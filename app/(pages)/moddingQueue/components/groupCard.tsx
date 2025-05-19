"use client";

import React from "react";
import BeatmapCard from "./beatmapCard";

import style from "../moddingQueue.module.css";

interface parameterType {
   date: string;
   beatmaps: any[];
}

export default function GroupCard({ date, beatmaps }: parameterType) {
   return (
      <div className={`${style.modContainer}`}>
         <div className={`text-lg font-bold`}>{date}</div>
         {beatmaps.map((beatmap) => (
            <BeatmapCard key={beatmap.beatmapid} beatmap={beatmap} />
         ))}
      </div>
   );
}
