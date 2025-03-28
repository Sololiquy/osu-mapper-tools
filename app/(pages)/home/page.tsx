import Link from "next/link";

export default function Home() {
   return (
      <>
         <div className="w-screen h-screen">
            <div className="content fontGoodTimes justify-center items-center flex-col">
               <img className="size-[60%] mb-20" src="/osu_logo.svg" alt="osu! logo" />
               <div className="flex flex-col gap-2">
                  <Link href="/moddingQueue" className="hover:underline">
                     Modding Queue
                  </Link>
                  <Link href="/beatmapDetail" className="text-gray-600 hover:underline">
                     Beatmap Detail
                  </Link>
               </div>
            </div>
         </div>
      </>
   );
}
