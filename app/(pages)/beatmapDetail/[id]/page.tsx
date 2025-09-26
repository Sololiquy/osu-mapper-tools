"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ChartPlay from "./components/chartPlay";
import DifficultyTab from "./components/difficultyTab";

import styles from "./beatmapDetail.module.css";

export default function BeatmapDetail() {
   const id = Number(useParams().id);
   const [beatmapData, setBeatmapData] = useState<any>(null);
   const [difficultySelected, setDifficultySelected] = useState<number>(0);

   useEffect(() => {
      const getBeatmapset = async () => {
         try {
            const beatmapID = id;
            const res = await fetch("/api/beatmapset/getBeatmapset", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ beatmapID }),
            });
            const data = await res.json();

            if (!res.ok || data.error) {
               throw new Error(data.error || "Failed to fetch beatmap");
            }
            data.beatmaps.sort((a: any, b: any) => a.difficulty_rating - b.difficulty_rating);
            setBeatmapData(data);
         } catch (error) {
            console.error(error);
         }
      };
      getBeatmapset();
   }, [id]);

   const difficultySelectedHandler = (difficulty: number) => {
      setDifficultySelected(difficulty);
   };

   if (!beatmapData) return null;
   const coverImgURL = `https://assets.ppy.sh/beatmaps/${id}/covers/cover@2x.jpg?1741480999`;

   return (
      <>
         <div className={`backgroundContainer`}>
            <img className={`w-full h-full object-cover blur-md scale-125`} src="/osu background.jpg" alt="" />
         </div>
         <div className={`content justify-center items-center`}>
            <div className={`max-w-[1000px] flex flex-col gap-1 p-1 bg-[rgba(0,0,0,0.3)]`}>
               <div className={`w-full relative`}>
                  <DifficultyTab
                     beatmaps={beatmapData.beatmaps}
                     difficultySelected={difficultySelected}
                     difficultySelectedHandler={difficultySelectedHandler}
                  />
                  <div className={`${styles.beatmapDetailStatus} bg-[rgba(0,0,0,0.4)]`}>{beatmapData.status.toUpperCase()}</div>
                  <img className={`w-full object-cover`} src={coverImgURL} alt="" />
               </div>
               <div className={`w-full flex flex-row`}>
                  <div className={`flex flex-col flex-grow`}>
                     <span className={`text-xl`}>{beatmapData.title_unicode}</span>
                     <span className={`italic `}>{beatmapData.artist_unicode}</span>
                     <span className={`text-sm italic`}>created by {beatmapData.creator}</span>
                  </div>
                  <div className={`right-0 p-1 gap-1 flex flex-row`}>
                     <div className={`w-14 h-15 p-1 gap-0.5 flex flex-col items-center `}>
                        <div className={`flex flex-grow`}>{beatmapData.beatmaps[difficultySelected].cs}</div>
                        <hr className={`w-full`} />
                        <div className={`font-bold`}>CS</div>
                     </div>
                     <div className={`w-14 h-15 p-1 gap-0.5 flex flex-col items-center `}>
                        <div className={`flex flex-grow`}>{beatmapData.beatmaps[difficultySelected].drain}</div>
                        <hr className={`w-full`} />
                        <div className={`font-bold`}>HP</div>
                     </div>
                     <div className={`w-14 h-15 p-1 gap-0.5 flex flex-col items-center `}>
                        <div className={`flex flex-grow`}>{beatmapData.beatmaps[difficultySelected].accuracy}</div>
                        <hr className={`w-full`} />
                        <div className={`font-bold`}>ACC</div>
                     </div>
                     <div className={`w-14 h-15 p-1 gap-0.5 flex flex-col items-center `}>
                        <div className={`flex flex-grow`}>{beatmapData.beatmaps[difficultySelected].ar}</div>
                        <hr className={`w-full`} />
                        <div className={`font-bold`}>AR</div>
                     </div>
                     <div className={`w-14 h-15 p-1 gap-0.5 flex flex-col items-center `}>
                        <div className={`flex flex-grow`}>{beatmapData.beatmaps[difficultySelected].difficulty_rating}</div>
                        <hr className={`w-full`} />
                        <div className={`font-bold`}>SR</div>
                     </div>
                  </div>
               </div>
               <ChartPlay chartData={beatmapData.beatmaps[difficultySelected].failtimes} />
               <div className={`flex flex-row gap-10`}>
                  <div className={`w-1/3 flex flex-col gap-3`}>
                     <div className={`flex flex-row gap-3`}>
                        <div className={`w-1/2 flex flex-col`}>
                           <div className={`font-bold text-xl`}>Genre</div>
                           <div className={`text-sm`}>{beatmapData.genre.name}</div>
                        </div>
                        <div className={`w-1/2 flex flex-col`}>
                           <div className={`font-bold text-xl`}>Nominator</div>
                           <div className={`text-sm`}> </div>
                        </div>
                     </div>
                     <div className={`flex flex-row gap-3`}>
                        <div className={`w-1/2 flex flex-col`}>
                           <div className={`font-bold text-xl`}>Source</div>
                           <div className={`text-sm`}>{beatmapData.source}</div>
                        </div>
                        <div className={`w-1/2 flex flex-col`}>
                           <div className={`font-bold text-xl`}>Language</div>
                           <div className={`text-sm`}>{beatmapData.language.name}</div>
                        </div>
                     </div>
                  </div>

                  <div className={`w-2/3 flex flex-col`}>
                     <div className={`font-bold text-xl`}>Tag</div>
                     <div className={`italic text-sm`}>{beatmapData.tags}</div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
