import type { Metadata } from "next";

import Toolbar from "./component/toolbar/toolbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "osu!",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toolbar />
        {children}
      </body>
    </html>
  );
}
