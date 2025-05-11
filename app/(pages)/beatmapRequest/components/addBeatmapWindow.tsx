"use client";

import React, { Dispatch, FormEvent, SetStateAction, useContext } from "react";

import { tokenContext } from "@/app/tokenWrapper";
import { useSession } from "next-auth/react";
import { contextModdingData } from "../context";

import style from "../beatmapRequest.module.css";

interface parameterType {
   setAddBeatmapWindowVisiblity: Dispatch<SetStateAction<boolean>>;
}

export default function AddBeatmapWindow({ setAddBeatmapWindowVisiblity }: parameterType) {
   const { data: session } = useSession();
   const token = useContext(tokenContext);
   const { beatmapData, setBeatmapData } = useContext(contextModdingData);

   const addBeatmap = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const beatmapID = event.currentTarget.beatmapID.value;
      const dataSubmitted = event.currentTarget.dataSubmitted.value;

      if (!beatmapData.some((data: { id: number }) => data.id === Number(beatmapID))) {
         const user = session?.user as { id: string; image: string; name?: string }; //temporary fix for typescript error
         const username = user?.name;
         const userID = user?.id;
         let data: any;
         try {
            const res = await fetch("/api/beatmapset/addBeatmapset", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ token, beatmapID, dataSubmitted, username, userID }),
            });

            data = await res.json();
         } catch (error) {
            console.error("Error fetching beatmap:", error);
         }

         if (data.error) {
            alert(data.error);
         } else {
            setBeatmapData([
               ...beatmapData,
               {
                  id: data.beatmap.id,
                  title: data.beatmap.title,
                  artist: data.beatmap.artist,
                  dataSubmitted,
                  status: data.beatmap.status,
                  length: data.beatmap.beatmaps[0].total_length,
                  bpm: data.beatmap.bpm,
               },
            ]);
            alert(`Beatmap ${data.beatmap.artist} - ${data.beatmap.title} added`);
            setAddBeatmapWindowVisiblity(false);
         }
      } else {
         alert("Beatmap already in queue");
      }
   };

   return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center">
         <div className={`${style.addBeatmapWindow}`}>
            <button className={`${style.buttonCloseBeatmapWindowVisiblity} bg-red-600`} onClick={() => setAddBeatmapWindowVisiblity(false)}>
               x
            </button>
            <form className="flex flex-col" onSubmit={addBeatmap}>
               <label htmlFor="beatmapID">BeatmapID</label>
               <input className="text-black" type="number" name="beatmapID" required />
               <label htmlFor="dataSubmitted">Date Submitted</label>
               <input className="text-black" type="date" name="dataSubmitted" required />
               <button type="submit" className={`${style.buttonAddBeatmap} bg-blue-600`}>
                  Add Beatmap
               </button>
            </form>
         </div>
      </div>
   );
}
