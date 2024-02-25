
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/db'
import currentUser from '@/libs/helpers/currentUser'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "POST") return handlePOST(req, res)

  else if (req.method === "DELETE") return handleDELETE(req, res)

  else if (req.method === "GET") return handleGET(req, res)

  return res.status(405).end()
  
}

export default  handler



const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {

  const {userId}: {userId: string} = req.body

  if (!userId) return res.status(400).json({error: "missing required 'userId' parameter."})


  try {

    const {id: currentUserId}: {id: string} = await currentUser(req, res)

    const user = await prisma.user.findUnique({
      where: {
        id: currentUserId
      },
      select: {
        followingIds: true
      }
    })

    if (!user) {
      return res.status(404).json({ error: "current user not found." })
    }

    if (user.followingIds.includes(userId)) return res.status(202).json({message: "user's already being followed."})

    await prisma.user.update({
      where: {
        id: currentUserId
      },
      data: {
        followingIds: [...user.followingIds, userId]
      }
    })


    return res.status(200).json({success: "follow added."})
  }

  catch(err) {
    
    return res.status(500).json({error: "couldn't follow the user ."})
  }
}



const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {

  const userId = req.query.userId as string | undefined

  if (!userId) return res.status(400).json({error: "missing required 'userId' parameter."})


  try {

    const {id: currentUserId}: {id: string} = await currentUser(req, res)

    const user = await prisma.user.findUnique({
      where: {
        id: currentUserId
      },
      select: {
        followingIds: true
      }
    })

    if (!user) {
      return res.status(404).json({ error: "current user not found." })
    }

    if (!user.followingIds.includes(userId)) return res.status(202).json({message: "can't unfollow 'cause user's not being followed."})

    const updatedFollowingIds = user.followingIds.filter(followingId => followingId !== userId)

    await prisma.user.update({
      where: {
        id: currentUserId
      },
      data: {
        followingIds: updatedFollowingIds
      }
    })

    return res.status(200).json({success: "unfollowed the user."})
  }

  catch(err) {
    
    return res.status(500).json({error: "couldn't unfollow."})
  }

}


const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {

  try {

    const {id: currentUserId}: {id: string} = await currentUser(req, res)

    const user = await prisma.user.findUnique({
      where: {
        id: currentUserId
      },
      select: {
        followingIds: true
      }
    })

    if (!user) {
      return res.status(404).json({ error: "current user not found." })
    }


    return res.status(200).json(user.followingIds)
  }

  catch(err) {
    
    return res.status(500).json({error: "couldn't fetch following list ."})
  }
}