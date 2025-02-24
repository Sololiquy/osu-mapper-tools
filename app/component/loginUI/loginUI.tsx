"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import "./loginUI.css";

export default function LoginUI() {
  const { data: session } = useSession();
  const handleLogin = async () => {
    try {
      const response = await signIn("osu", { callbackUrl: "/" });
      if (response?.error) {
        console.error("Login error:", response.error);
      } else {
        alert("Login successful");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  console.log(session);
  return (
    <>
      <div className="loginUIContainer">
        {session ? (
          <div>
            <div className="circle">
              <div className="signOut" onClick={() => signOut()}>
                Sign out
              </div>
              <img src={session.user.image} alt="" />
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
