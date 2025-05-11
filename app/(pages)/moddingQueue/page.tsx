"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import GroupCard from "./components/groupCard";
import AddBeatmapWindow from "./components/addBeatmapWindow";

import "./moddingQueue.css";
import { contextModdingData } from "./context";

export default function ModdingQueue() {
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
            setBeatmapData(data);
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
         setBeatmapData((prev) => prev.filter((b) => b.beatmapid !== beatmapID));
      } catch (error) {
         alert(error);
      }
   };

   const groupedBeatmaps: Record<string, any[]> = beatmapData.reduce((acc, beatmap) => {
      const date = beatmap.dataSubmitted;
      if (!acc[date]) acc[date] = [];
      acc[date].push(beatmap);
      return acc;
   }, {} as Record<string, any[]>);

   const sortedDates = Object.keys(groupedBeatmaps).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

   return (
      <>
         <div className="backgroundContainer">
            <img className="w-full h-full object-cover blur-md scale-125" src="/osu background.jpg" alt="Background" />
         </div>
         <div className="w-screen h-screen">
            <div className="content flex-row gap-2 pl-3 pr-24 overflow-x-scroll overflow-y-hidden">
               <contextModdingData.Provider value={{ beatmapData, setBeatmapData, deleteBeatmapWindowVisiblity, deleteBeatmap }}>
                  {sortedDates.map((date) => (
                     <GroupCard key={date} date={date} beatmaps={groupedBeatmaps[date]} />
                  ))}

                  {addBeatmapWindowVisiblity && <AddBeatmapWindow setAddBeatmapWindowVisiblity={setAddBeatmapWindowVisiblity} />}

                  <div className="fixed gap-2 right-5 top-5 flex flex-col items-end">
                     <button
                        className={`buttonCircled ${deleteBeatmapWindowVisiblity === "flex" ? "bg-gray-400" : "bg-blue-600"}`}
                        onClick={deleteBeatmapWindowVisiblity !== "flex" ? () => setAddBeatmapWindowVisiblity(true) : undefined}
                     >
                        +
                     </button>
                     <button className="buttonModdingQueue bg-red-600" onClick={() => setDeleteBeatmapWindowVisiblity(deleteBeatmapWindowVisiblity === "flex" ? "hidden" : "flex")}>
                        <img src="/icon_delete.svg" alt="" />
                     </button>
                  </div>
               </contextModdingData.Provider>
            </div>
         </div>
      </>
   );
}
