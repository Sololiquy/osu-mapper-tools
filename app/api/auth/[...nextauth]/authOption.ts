import { SessionStrategy } from "next-auth";
import OsuProvider from "next-auth/providers/osu";

export const authOptions = {
   session: {
      strategy: "jwt" as SessionStrategy,
   },
   secret: process.env.NEXTAUTH_SECRET,
   providers: [
      OsuProvider({
         clientId: process.env.OSU_CLIENT_ID!,
         clientSecret: process.env.OSU_CLIENT_SECRET!,
      }),
   ],
   callbacks: {
      async jwt({ token, account, profile }: any) {
         if (account) token.accessToken = account.access_token;
         if (profile) {
            token.id = profile.id;
            token.name = profile.username; // store username too
         }
         return token;
      },
      async session({ session, token }: any) {
         session.accessToken = token.accessToken;
         session.user.id = token.id;
         session.user.name = token.name; // keep username in session
         return session;
      },
   },
   events: {
      async signIn({ user }: any) {
         console.log(`[LOGIN] User signed in → username = ${user?.name}, id = ${user?.id}`);
      },
   },
};
