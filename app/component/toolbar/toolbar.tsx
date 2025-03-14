"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import "./toolbar.css";

export default function Toolbar() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const getSegmentTitle = (segment: string): string => {
    const segmentMap: Record<string, string> = {
      moddingQueue: "Modding Queue",
      beatmapDetail: "Beatmap Detail",
    };
    return segmentMap[segment] || decodeURIComponent(segment);
  };

  return (
    <div className="toolbarContainer flex items-center">
      <Link className="h-10 px-2 bg-[rgb(99,99,99)] flex items-center" href="/">
        <div>Home</div>
      </Link>

      {pathSegments.length >= 0 && <div className="triangle"></div>}
      {pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

        return (
          <div className="h-10 px-2.5 -translate-x-2 relative flex items-center" key={segment}>
            <Link className="translate-x-3" href={href}>
              {getSegmentTitle(segment)}
            </Link>
            <div className="w-full absolute flex flex-col">
              <div className="parallelogram z-[-1] skew-x-[27deg]"></div>
              <div className="parallelogram z-[-1] skew-x-[-27deg]"></div>
            </div>
            {index < pathSegments.length - 1 && <div className="triangle"></div>}
          </div>
        );
      })}
    </div>
  );
}
