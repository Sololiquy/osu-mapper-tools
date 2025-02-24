"use client";

import React, { useContext, useState } from "react";
import { tokenContext } from "@/app/tokenWrapper";

export default function BeatmapDetail() {
  const token = useContext(tokenContext);

  return (
    <>
      <div className="backgroundContainer">
        <img className="w-full h-full object-cover blur-md brightness-50 scale-125" src="/osu background.jpg" alt="" />
      </div>
      <div className="content flex flex-col justify-center items-center gap-4">
        <div className="text-2xl">Beatmap Detail Page is Under Development</div>
      </div>
    </>
  );
}
