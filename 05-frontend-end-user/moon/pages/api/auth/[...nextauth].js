import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { axiosClient } from "../../../libraries/axiosClient";
import { getUser } from "../../../libraries/auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await axiosClient.post("/auth/login-jwt", credentials);
        // If no error and we have user data, return it
        if (res.status) {
          return res;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.accessToken) {
        session.user = await getUser(token.accessToken);
      }
      return session;
    },
  },
};

export default nextAuth(authOptions);
