"use client";

import React, { Dispatch, FormEvent, SetStateAction, useContext } from "react";
import { contextModdingData } from "../page";

import "../moddingQueue.css";

export default function AddBeatmapWindow({ addBeatmapWindowVisiblity, setAddBeatmapWindowVisiblity }: parameterType) {
  const { moddingData, setModdingData } = useContext(contextModdingData);
  const addBeatmap = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const beatmapID = event.currentTarget.beatmapID.value;
    const dateSubmitted = event.currentTarget.dateSubmitted.value;
    if (!moddingData.some((data) => data.id === Number(beatmapID))) {
      setModdingData([
        ...moddingData,
        {
          id: Number(beatmapID),
          title: `Title placeholder`,
          artist: `Artist placeholder`,
          dataSubmitted: dateSubmitted,
          status: "",
        },
      ]);
    } else {
      alert("Beatmap already in queue");
    }
  };
  return (
    <>
      <div className={`addBeatmapWindow ${addBeatmapWindowVisiblity}`}>
        <button className="buttonCloseBeatmapWindowVisiblity" onClick={() => setAddBeatmapWindowVisiblity("hidden")}>
          x
        </button>
        <form className="flex flex-col" onSubmit={addBeatmap}>
          <label htmlFor="beatmapID">BeatmapID</label>
          <input className="text-black" type="number" name="beatmapID" required />
          <label htmlFor="dateSubmitted">Date Submitted</label>
          <input className="text-black" type="date" name="dateSubmitted" required />
          <button type="submit" className="buttonAddBeatmap">
            Add Beatmap
          </button>
        </form>
      </div>
    </>
  );
}

interface parameterType {
  addBeatmapWindowVisiblity: string;
  setAddBeatmapWindowVisiblity: Dispatch<SetStateAction<string>>;
}
