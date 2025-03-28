"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import "./loginUI.css";

export default function LoginUI() {
   const { data: session } = useSession();

   return (
      <>
         {session && (
            <div className="loginUIContainer">
               <div>
                  <div className="circle">
                     <div className="signOut" onClick={() => signOut()}>
                        Sign out
                     </div>
                     <img src={session.user.image} alt="" />
                  </div>
               </div>
            </div>
         )}
         {/* <button onClick={check}>Check</button> */}
      </>
   );
}
