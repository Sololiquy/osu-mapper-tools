"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
   const { data: session } = useSession();
   const router = useRouter();

   useEffect(() => {
      if (session?.user?.id) {
         const userId = String(session.user.id);
         if (userId === process.env.NEXT_PUBLIC_HOST_OSU_ID) {
            router.push("/home");
         } else {
            router.push("/login");
         }
      }
   }, [session, router]);

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
      <>
         <div>Login</div>
         <button className="bg-blue-600" onClick={handleLogin}>
            Authenticate
         </button>
      </>
   );
}
