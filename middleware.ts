import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
   const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
   const path = request.nextUrl.pathname;

   const hostID = String(process.env.NEXT_PUBLIC_HOST_OSU_ID);
   const logID = String(token?.id);

   const pathHost = ["/moddingQueue", "/beatmapDetail", "/home"];
   const pathNonHost = ["/beatmapRequest", "/beatmapDetail", "/home"];

   console.log("tokenId:", logID, typeof logID);
   console.log("hostId:", hostID, typeof hostID);

   if (!token) {
      if (path !== "/login") {
         return NextResponse.redirect(new URL("/login", request.url));
      }
      return NextResponse.next();
   } else {
      if (logID == hostID) {
         if (pathHost.some((x) => path.startsWith(x))) {
            return NextResponse.next();
         }
      }
      if (logID !== hostID) {
         if (pathNonHost.some((y) => path.startsWith(y))) {
            return NextResponse.next();
         }
      }
      return NextResponse.redirect(new URL("/home", request.url));
   }
}

export const config = {
   matcher: ["/login", "/home", "/moddingQueue", "/beatmapRequest", "/beatmapDetail/:path*"],
};
