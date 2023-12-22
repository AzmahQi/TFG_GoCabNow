import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User {
        id?: string | null;
        name?: string | null;
        email?: string | null; 
    }
  interface Session extends DefaultSession {
    user: User & {
      id: string;
      email: string;
      name: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  } 
}