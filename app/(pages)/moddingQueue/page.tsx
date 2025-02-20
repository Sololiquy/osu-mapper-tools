"use client";

import React, { useState, useEffect, createContext } from "react";
import GroupCard from "./components/groupCard";
import AddBeatmapWindow from "./components/addBeatmapWindow";
import "./moddingQueue.css";

export default function ModdingQueue() {
  const [addBeatmapWindowVisiblity, setAddBeatmapWindowVisiblity] = useState("hidden");
  const [deleteBeatmapWindowVisiblity, setDeleteBeatmapWindowVisiblity] = useState("hidden");
  const [moddingData, setModdingData] = useState<any[]>([]);

  const deleteBeatmap = async (id: number) => {
    try {
      const res = await fetch("/api/beatmapset/deleteBeatmapset", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete beatmap");

      alert(`Beatmap ${id} deleted`);
      setModdingData((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchModdingData = async () => {
      try {
        const res = await fetch("/api/beatmapset/getAllBeatmapset");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setModdingData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchModdingData();
  }, []);

  const groupedBeatmaps: Record<string, any[]> = moddingData.reduce((acc, beatmap) => {
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
          <contextModdingData.Provider value={{ moddingData, setModdingData, deleteBeatmapWindowVisiblity, deleteBeatmap }}>
            <AddBeatmapWindow addBeatmapWindowVisiblity={addBeatmapWindowVisiblity} setAddBeatmapWindowVisiblity={setAddBeatmapWindowVisiblity} />

            {sortedDates.map((date) => (
              <GroupCard key={date} date={date} beatmaps={groupedBeatmaps[date]} />
            ))}

            <div className="fixed gap-2 right-5 top-5 flex flex-col items-end">
              <button className="buttonModdingQueue bg-blue-600" onClick={() => setAddBeatmapWindowVisiblity("flex")}>
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

export const contextModdingData = createContext<any>({});
