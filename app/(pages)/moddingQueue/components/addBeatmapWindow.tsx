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
    const dateSubmitted = event.currentTarget.dateSubmitted.value;
    if (!moddingData.some((data) => data.id === Number(beatmapID))) {
      let title = "";
      let artist = "";
      try {
        const res = await fetch("/api/getBeatmap", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, beatmapID }),
        });
        const data = await res.json();
        title = data.title;
        artist = data.artist;
      } catch (error) {
        console.error("Error fetching beatmap:", error);
      }
      setModdingData([
        ...moddingData,
        {
          id: Number(beatmapID),
          title: title,
          artist: artist,
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
