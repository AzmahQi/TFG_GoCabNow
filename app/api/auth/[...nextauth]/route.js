import {getUserByEmail, getProfileByUserId, getRoleByUserId} from "@/lib/db";
import { compare } from "bcrypt";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions ={
  pages:{
    signIn: '/login'
  },
  session :{
    strategy: 'jwt',
    maxAge: 3 * 60 * 60,
  },
    providers: [
        CredentialsProvider({

          name: "Sign in",

          credentials: {
            email: { label: "Email", type: "email", placeholder: "hello@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if (!credentials?.email || !credentials?.password){
              return null
            }

            const user = await getUserByEmail (credentials.email)

            if (!user){
              return null
            }

            const isPasswordValid = await compare (credentials.password,user.password)

            if (!isPasswordValid) {
              return null
            }

            // retrieve the name from the profile
            const userProfile = await getProfileByUserId(user.id)
            const userRole = await getRoleByUserId(user.id);

            return {
              id: `${user.id}`,
              name: userProfile.name,
              email: user.email,
              contactNumber: user.contactNumber,
              profile: userProfile,
              role: userRole.permissionName
            }
          }
        })
      ],
      callbacks: {
        async jwt ({token, user}){

          if (user) {
            return {
              ...token,
              user
            }
          }

          return token

        },
        async session ({session,token}) {

          return {
            ...session,
            user: {
              ...session,
              contactNumber: token.user.contactNumber,
              profile: token.user.profile,
              role: token.user.role
            }
          }

        }
      }
};

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }