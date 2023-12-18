import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = NextAuth({
  pages:{
    signIn: '/login'
  },
  session :{
    strategy: 'jwt'
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

            const user = await prisma.user.findUnique({
              where: {
                email: credentials.email
              }
            })

            if (!user){
              return null
            }

            const isPasswordValid = await compare (credentials.password,user.password)

            if (!isPasswordValid) {
              return null
            }

            return {
              id: `${user.id}`,
              email: user.email,
              contactNumber: user.contactNumber,
              randomKey: 'I can create more keys here if needed',
            }


          }
        })
      ],
      callbacks: {
         
        async jwt ({token, user}){
          console.log('JWT: ',{token, user})
          if (user) {
            return {
              ...token,
              id: user.id
            }
          }

          return token

        },
        async session ({session,token}) {
          console.log('Session: ',{session, token})
          return {
            ...session,
            user: {
              ...session.user,
              id: token.id
            }
          }

        }
      }
})

export { authOptions as GET, authOptions as POST }