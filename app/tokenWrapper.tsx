"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import Toolbar from "./component/toolbar/toolbar";

export default function TokenWrapper({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch("/api/getToken");
        const data = await res.json();
        setToken(data.accessToken);
      } catch (error) {
        console.error("Failed to fetch access token:", error);
      }
    };
    fetchToken();
  }, []);

  return (
    <tokenContext.Provider value={token}>
      <Toolbar />
      {children}
    </tokenContext.Provider>
  );
}

export const tokenContext = createContext<any>(null);
