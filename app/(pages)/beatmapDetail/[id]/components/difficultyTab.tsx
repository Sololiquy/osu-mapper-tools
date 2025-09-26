import React from "react";

interface parameterType {
   beatmaps: any;
   difficultySelected: number;
   difficultySelectedHandler: (difficulty: number) => void;
}

export default function DifficultyTab({ beatmaps, difficultySelected, difficultySelectedHandler }: parameterType) {
   const modeImage = (mode: string) => {
      switch (mode) {
         case "osu":
            return "/game_mode/osu.png";
         case "taiko":
            return "/game_mode/taiko.png";
         case "fruits":
            return "/game_mode/fruit.png";
         case "mania":
            return "/game_mode/mania.png";
         default:
            return "";
      }
   };

   return (
      <div className="absolute flex flex-row flex-wrap rounded-2xl top-1 left-1 p-1 gap-0.5 bg-[rgba(0,0,0,0.3)]">
         {beatmaps.map((beatmap: any, index: number) => (
            <div className={`p-1 rounded-xl transition-all ${difficultySelected === index ? "bg-[rgba(0,0,0,0.5)]" : ""}`} key={index}>
               <div className="difficultyTab cursor-pointer" onClick={() => difficultySelectedHandler(index)}>
                  <img src={modeImage(beatmap.mode)} alt={beatmap.mode} className="size-12 object-contain" />
               </div>
            </div>
         ))}
      </div>
   );
}
