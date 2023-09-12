
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../../../actions/login-user.action";
import { User } from "@prisma/client";
import prisma from "../../../app/db";


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

  session: {
    strategy: "jwt",
    
  },

  callbacks: {
    session: async ({session, token, user}) => {
      if(!user && session.user){
        (user as any) = await prisma.user.findUnique({ where: { email: session.user?.email! }});
        ((session.user as any).id as any)= (user as any).id;
      }

    
      // const dbUser: any = user;
      // (session.user as any).id = dbUser.id;
      return session;
    }
  },

  pages: {
    signIn: "/sign-in",
  },
});