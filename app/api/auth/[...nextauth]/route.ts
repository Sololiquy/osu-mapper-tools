import NextAuth from "next-auth";
import OsuProvider from "next-auth/providers/osu";

export const authOptions = {
   providers: [
      OsuProvider({
         clientId: process.env.OSU_CLIENT_ID!,
         clientSecret: process.env.OSU_CLIENT_SECRET!,
      }),
   ],
   callbacks: {
      async jwt({ token, account, profile }: any) {
         if (account) {
            token.accessToken = account.access_token;
         }
         if (profile) {
            token.id = profile.id;
         }
         return token;
      },
      async session({ session, token }: any) {
         session.accessToken = token.accessToken;
         session.user.id = token.id;
         return session;
      },
   },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
