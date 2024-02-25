
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/db'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "GET") return handleGET(req, res)

  else return res.status(405).end()
  
}

export default  handler



const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {

  try {

      const users = await prisma.user.findMany({
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
          bookmarks: true,
          notification: true
        },
      })

      return res.status(200).json(users)
    }

    catch(err) {

      return res.status(500).json({error: "couldn't retrieve users."})
    }
}
