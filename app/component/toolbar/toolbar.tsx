"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import "./toolbar.css";

export default function Toolbar() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <div className="toolbarContainer">
      <Link className="h-10 px-2 bg-[rgb(99,99,99)] flex items-center" href="/">
        <div>Home</div>
      </Link>
      <div className="triangle"></div>
      {pathSegments.map((segment) => (
        <div className="h-10 px-2.5 -translate-x-2 relative flex items-center" key={segment}>
          <Link className="translate-x-3" href={decodeURIComponent(segment)}>
            {decodeURIComponent(segment)}
          </Link>
          <div className="w-full absolute flex flex-col">
            <div className="parallelogram z-[-1] skew-x-[27deg]"></div>
            <div className="parallelogram z-[-1] skew-x-[-27deg]"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
