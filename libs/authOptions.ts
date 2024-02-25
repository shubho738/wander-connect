
import bcrypt from "bcrypt"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/libs/db"


const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {

        const {email: userEmail, password: userPassword} = credentials as {
          email: string,
          password: string
        }

        if (!userEmail || !userPassword) {
          throw new Error('Credentials missing!')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: userEmail
          }
        })

        if (!user) {
          throw new Error('Invalid credentials!')
        }

        const isValidPassword = await bcrypt.compare(
          userPassword,
          user.hashedPassword
        )

        if (!isValidPassword) {
          throw new Error('Invalid credentials')
        }

        return user
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions