import React from "react";

import "./component.css";

interface parameterType {
   beatmaps: any;
   difficultySelectedHandler: (difficulty: number) => void; // Add the missing prop type
}

export default function DifficultyTab({ beatmaps, difficultySelectedHandler }: parameterType) {
   return (
      <div className="absolute flex flex-row flex-wrap rounded-2xl top-1 left-1 p-2 gap-2 bg-[rgba(0,0,0,0.3)]">
         {beatmaps.map((beatmap: any, index: number) => (
            <div key={index} className="size-10 rounded-full bg-white justify-center items-center cursor-pointer" onClick={() => difficultySelectedHandler(index)}></div>
         ))}
      </div>
   );
}
