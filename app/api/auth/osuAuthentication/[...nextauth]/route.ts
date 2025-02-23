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
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
