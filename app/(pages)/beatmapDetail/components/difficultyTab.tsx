import React from "react";

import "./component.css";

interface parameterType {
   beatmaps: any;
   difficultySelected: number;
   difficultySelectedHandler: (difficulty: number) => void;
}

export default function DifficultyTab({ beatmaps, difficultySelected, difficultySelectedHandler }: parameterType) {
   return (
      <div className="absolute flex flex-row flex-wrap rounded-2xl top-1 left-1 p-1 gap-0.5 bg-[rgba(0,0,0,0.3)]">
         {beatmaps.map((beatmap: any, index: number) => (
            <div className={`p-1 rounded-xl transition-all ${difficultySelected === index ? "bg-[rgba(0,0,0,0.5)]" : ""}`} key={index}>
               <div className="difficultyTab" onClick={() => difficultySelectedHandler(index)}>
                  {beatmaps[index].mode === "osu" ? "1" : beatmaps[index].mode === "taiko" ? "2" : beatmaps[index].mode === "fruits" ? "3" : beatmaps[index].mode === "mania" ? "4" : ""}
               </div>
            </div>
         ))}
      </div>
   );
}
