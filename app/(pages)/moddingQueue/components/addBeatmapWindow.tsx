"use client";

import React, { Dispatch, FormEvent, SetStateAction, useContext } from "react";
import { tokenContext } from "@/app/tokenWrapper";
import { contextModdingData } from "../page";

import "../moddingQueue.css";

export default function AddBeatmapWindow({ addBeatmapWindowVisiblity, setAddBeatmapWindowVisiblity }: parameterType) {
   const token = useContext(tokenContext);
   const { moddingData, setModdingData } = useContext(contextModdingData);

   const addBeatmap = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const beatmapID = event.currentTarget.beatmapID.value;
      const dataSubmitted = event.currentTarget.dataSubmitted.value;

      if (!moddingData.some((data: { id: number }) => data.id === Number(beatmapID))) {
         let data: any;
         try {
            const res = await fetch("/api/beatmapset/addBeatmapset", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ token, beatmapID, dataSubmitted }),
            });

            data = await res.json();
         } catch (error) {
            console.error("Error fetching beatmap:", error);
         }

         if (data.error) {
            alert(data.error);
         } else {
            setModdingData([
               ...moddingData,
               {
                  id: Number(beatmapID),
                  title: data.beatmap.title,
                  artist: data.beatmap.artist,
                  dataSubmitted,
                  status: data.beatmap.status,
                  length: data.beatmap.beatmaps[0].total_length,
                  bpm: data.beatmap.bpm,
               },
            ]);
            alert(`Beatmap ${data.beatmap.artist} - ${data.beatmap.title} added`);
            setAddBeatmapWindowVisiblity("hidden");
         }
      } else {
         alert("Beatmap already in queue");
      }
   };

   return (
      <>
         <div className={`${addBeatmapWindowVisiblity}`}>
            <div className="!z-[1] backgroundContainer bg-black bg-opacity-[50%] backdrop-blur-md"></div>
            <div className={`addBeatmapWindow `}>
               <button className="buttonCloseBeatmapWindowVisiblity bg-red-600" onClick={() => setAddBeatmapWindowVisiblity("hidden")}>
                  x
               </button>
               <form className="flex flex-col" onSubmit={addBeatmap}>
                  <label htmlFor="beatmapID">BeatmapID</label>
                  <input className="text-black" type="number" name="beatmapID" required />
                  <label htmlFor="dataSubmitted">Date Submitted</label>
                  <input className="text-black" type="date" name="dataSubmitted" required />
                  <button type="submit" className="buttonAddBeatmap bg-blue-600">
                     Add Beatmap
                  </button>
               </form>
            </div>
         </div>
      </>
   );
}

interface parameterType {
   addBeatmapWindowVisiblity: string;
   setAddBeatmapWindowVisiblity: Dispatch<SetStateAction<string>>;
}
