import React from "react";
import { BarChart, Bar, ResponsiveContainer } from "recharts";

type parameterType = {
   chartData: {
      fail: number[];
      exit: number[];
   };
};

export default function ChartPlay({ chartData }: parameterType) {
   const failData = chartData.fail;
   const exitData = chartData.exit;

   const data = failData.map((value, index) => ({
      x: index,
      fail: value,
      exit: exitData[index],
   }));

   return (
      <div className="w-full h-32 bg-gray-700">
         <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
               <Bar dataKey="fail" stackId="stack" fill="#ff4d4d" animationDuration={100} />
               <Bar dataKey="exit" stackId="stack" fill="#4d79ff" animationDuration={100} />
            </BarChart>
         </ResponsiveContainer>
      </div>
   );
}
