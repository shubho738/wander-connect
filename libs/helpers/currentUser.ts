
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import type { UserBasic } from '../types'
import prisma from '@/libs/db'
import authOptions from '@/libs/authOptions'


const currentUser = async (req: NextApiRequest, res: NextApiResponse): Promise<UserBasic> => {

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
      email: true
    }
  })

  if (!user) throw new Error("error fetching current user.")

  return user
}

export default currentUser