
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../../../actions/login-user.action";
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const username = credentials?.username;
        const password = credentials?.username;

        if(!username || !password) return null;

        const user = await loginUser({ username, password });

        console.log(user)

        return user as any;
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },
});