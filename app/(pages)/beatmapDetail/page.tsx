"use client";

import React, { useContext, useState } from "react";
import { tokenContext } from "@/app/tokenWrapper";

export default function BeatmapDetail() {
  const token = useContext(tokenContext);
  const [beatmapData, setBeatmapData] = useState(null);

  const handleFetchBeatmap = async () => {
    if (!token) {
      alert("Token is not available yet.");
    } else {
      try {
        const res = await fetch("/api/getBeatmap", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();
        setBeatmapData(data);
      } catch (error) {
        console.error("Error fetching beatmap:", error);
      }
    }
  };
  console.log(beatmapData);

  return (
    <>
      <div className="backgroundContainer">
        <img className="w-full h-full object-cover blur-md brightness-50 scale-125" src="/osu background.jpg" alt="" />
      </div>
      <div className="content flex flex-col justify-center items-center gap-4">
        <div className="text-2xl">Beatmap Detail Page is Under Development</div>
        <button onClick={handleFetchBeatmap} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Fetch Beatmap
        </button>
      </div>
    </>
  );
}
