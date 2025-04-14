"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
   const { data: session, status } = useSession();
   const router = useRouter();

   useEffect(() => {
      if (status === "authenticated" && session?.user?.id) {
         const userId = String(session.user.id);
         if (userId === process.env.NEXT_PUBLIC_HOST_OSU_ID) {
            router.push("/home");
         } else {
            router.push("/login");
         }
      }
   }, [session, status, router]);

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

   return (
      <div className="h-screen w-screen flex items-center justify-center">
         <div className="flex flex-col items-center gap-4">
            <div>Login with osu account to continue</div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleLogin}>
               Authenticate
            </button>
         </div>
      </div>
   );
}
