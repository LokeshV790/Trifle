import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {
  createUser,
  getUserDetails,
} from "@/app/mongodb/controllers/user.controller";

export const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile }) {
      await createUser(profile);
      return true;
    },
    async session({ session }) {
      const { id, username, savedPosts } = await getUserDetails(
        session.user.email
      );
      if (id && username) {
        session.user._id = id;
        session.user.username = username;
        session.user.savedPosts = savedPosts;
        return session;
      } else {
        return session;
      }
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };
