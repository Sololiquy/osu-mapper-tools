import type { Metadata } from "next";

import TokenWrapper from "./tokenWrapper";
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
        <TokenWrapper>{children}</TokenWrapper>
      </body>
    </html>
  );
}
