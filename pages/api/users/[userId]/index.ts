
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/db'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "GET") return handleGET(req, res)

  return res.status(405).end()
}


export default handler



const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {

  const userId = req.query.userId as string | undefined

  if (!userId) return res.status(400).json({error: "missing required 'userId' parameter."})

  try {

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        about: true,
        createdAt: true,
        updatedAt: true,
        followingIds: true

      }
    })

    if (!user) {
      return res.status(404).json({ error: "user not found." })
    }

    const numberOfFollowers = await prisma.user.count({
      where: {
        followingIds: {
          has: userId
        }
      }
    })

    return res.status(200).json({...user, numberOfFollowers})
  }

  catch(err) {

    return res.status(500).json({error: "couldn't fetch user data."})
  }
}