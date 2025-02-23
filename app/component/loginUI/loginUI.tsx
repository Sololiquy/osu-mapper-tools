"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import "./loginUI.css";

export default function LoginUI() {
  const { data: session } = useSession();
  const handleLogin = () => {
    signIn("osu", { callbackUrl: "/dashboard" }, { redirect: false })
      .then(() => {
        window.location.href = "/api/auth/osuAuthentication";
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <div className="loginUIContainer">
        {session ? (
          <div>
            <div className="circle bg-white text-black" onClick={() => signOut()}>
              Sign out
            </div>
          </div>
        ) : (
          <div className="circle bg-white text-black" onClick={handleLogin}>
            Sign in
          </div>
        )}
      </div>
    </>
  );
}
