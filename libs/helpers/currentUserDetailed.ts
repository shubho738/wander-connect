
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import prisma from '@/libs/db'
import authOptions from '@/libs/authOptions'


const currentUserDetailed = async (req: NextApiRequest, res: NextApiResponse) => {

  const session = await getServerSession(req, res, authOptions)


  if (!session)  throw new Error('You must be logged in.')

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },

    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      hashedPassword: true,
      about: true,
      createdAt: true,
      updatedAt: true,
      followingIds: true,
      notification: true
    }
  })

  if (!user) throw new Error("error fetching user.")

  return user
}

export default currentUserDetailed