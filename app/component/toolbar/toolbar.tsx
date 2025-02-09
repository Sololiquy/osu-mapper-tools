"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import "./toolbar.css";

export default function Toolbar() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <div className="toolbarContainer">
      <nav className="breadcrumbContainer">
        <ul className="breadcrumbList">
          <li>
            <Link href="/">Home</Link>
          </li>
          {pathSegments.map((segment, index) => {
            const href = "/" + pathSegments.slice(0, index + 1).join("/");
            return (
              <li key={href}>
                <Link href={href}>{decodeURIComponent(segment)}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
