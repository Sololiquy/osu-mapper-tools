"use client";

import React, { useState, createContext } from "react";
import GroupCard from "./components/groupCard";
import AddBeatmapWindow from "./components/addBeatmapWindow";

import { moddingData as x } from "@/lib/db";
import "./moddingQueue.css";

export default function ModdingQueue() {
  const [addBeatmapWindowVisiblity, setAddBeatmapWindowVisiblity] = useState<string>("hidden");
  const [moddingData, setModdingData] = useState(x);

  const updateModdingData = (newData: typeof moddingData) => {
    const sortedData = [...newData].sort((a, b) => a.dataSubmitted.localeCompare(b.dataSubmitted));
    setModdingData(sortedData);
  };

  const groupedData = moddingData.reduce((acc, beatmap) => {
    if (!acc[beatmap.dataSubmitted]) {
      acc[beatmap.dataSubmitted] = [];
    }
    acc[beatmap.dataSubmitted].push(beatmap);
    return acc;
  }, {} as Record<string, typeof moddingData>);

  return (
    <>
      <div className="backgroundContainer">
        <img className="w-full h-full object-cover blur-md scale-125" src="/osu background.jpg" alt="" />
      </div>
      <div className="content flex-row gap-2 overflow-x-scroll overflow-y-hidden">
        <contextModdingData.Provider value={{ moddingData, setModdingData: updateModdingData }}>
          <AddBeatmapWindow addBeatmapWindowVisiblity={addBeatmapWindowVisiblity} setAddBeatmapWindowVisiblity={setAddBeatmapWindowVisiblity} />
          {Object.entries(groupedData).map(([date, beatmaps]) => (
            <GroupCard key={date} date={date} beatmaps={beatmaps} />
          ))}
          <button className="buttonAddBeatmapWindowVisiblity" onClick={() => setAddBeatmapWindowVisiblity("flex")}>
            +
          </button>
        </contextModdingData.Provider>
      </div>
    </>
  );
}

export const contextModdingData = createContext<any>({
  moddingData: [],
  setModdingData: () => {},
});
