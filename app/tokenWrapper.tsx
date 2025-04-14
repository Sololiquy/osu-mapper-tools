"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import Toolbar from "./component/toolbar/toolbar";
import LoginUI from "./component/loginUI/loginUI";

export default function TokenWrapper({ children }: { children: ReactNode }) {
   const [token, setToken] = useState<string | null>(null);
   useEffect(() => {
      const fetchToken = async () => {
         try {
            const res = await fetch("/api/auth/getToken");
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
         <SessionProvider>
            <LoginUI />
            {children}
         </SessionProvider>
      </tokenContext.Provider>
   );
}

export const tokenContext = createContext<any>(null);
