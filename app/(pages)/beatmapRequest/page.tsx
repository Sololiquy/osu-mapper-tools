"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import BeatmapCard from "./components/beatmapCard";
import AddBeatmapWindow from "./components/addBeatmapWindow";

// import style from "./beatmapRequest.module.css";
import { contextModdingData } from "./context";

export default function BeatmapRequest() {
   const { data: session } = useSession();
   const [addBeatmapWindowVisiblity, setAddBeatmapWindowVisiblity] = useState(false);
   const [deleteBeatmapWindowVisiblity, setDeleteBeatmapWindowVisiblity] = useState("hidden");
   const [beatmapData, setBeatmapData] = useState<any[]>([]);

   useEffect(() => {
      const fetchModdingData = async () => {
         try {
            const res = await fetch("/api/beatmapset/getAllBeatmapset");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            const sortedData = data.sort((a: any, b: any) => new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime());

            setBeatmapData(sortedData);
         } catch (error) {
            console.error(error);
         }
      };
      fetchModdingData();
   }, []);

   const deleteBeatmap = async (beatmapID: number) => {
      const userID = session?.user?.id;
      try {
         const res = await fetch("/api/beatmapset/deleteBeatmapset", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ beatmapID, userID }),
         });

         const data = await res.json();

         if (!res.ok || data.error) {
            throw new Error(data.error || "Failed to delete beatmap");
         }

         alert(`Beatmap ${beatmapID} deleted`);
         setDeleteBeatmapWindowVisiblity("hidden");
         setBeatmapData((prev) => prev.filter((b) => b.id !== beatmapID));
      } catch (error) {
         alert(error);
      }
   };

   return (
      <>
         <div className="backgroundContainer">
            <img className="w-full h-full object-cover blur-md scale-125" src="/osu background.jpg" alt="Background" />
         </div>
         <div className="w-screen h-screen p-2 pr-20">
            <contextModdingData.Provider value={{ beatmapData, setBeatmapData, deleteBeatmapWindowVisiblity, deleteBeatmap }}>
               <div className="flex flex-row flex-wrap gap-2">
                  {beatmapData.map((beatmap) => (
                     <BeatmapCard key={beatmap.beatmapid} beatmap={beatmap} />
                  ))}
               </div>

               {addBeatmapWindowVisiblity && <AddBeatmapWindow setAddBeatmapWindowVisiblity={setAddBeatmapWindowVisiblity} />}

               <div className="fixed gap-2 right-5 top-5 flex flex-col items-end">
                  <button
                     className={`buttonCircled ${deleteBeatmapWindowVisiblity === "flex" ? "bg-gray-400" : "bg-blue-600"}`}
                     onClick={deleteBeatmapWindowVisiblity !== "flex" ? () => setAddBeatmapWindowVisiblity(true) : undefined}
                  >
                     +
                  </button>
                  <button className="buttonCircled bg-red-600" onClick={() => setDeleteBeatmapWindowVisiblity(deleteBeatmapWindowVisiblity === "flex" ? "hidden" : "flex")}>
                     <img src="/icon_delete.svg" alt="" />
                  </button>
               </div>
            </contextModdingData.Provider>
         </div>
      </>
   );
}
