
import type { NextApiRequest, NextApiResponse } from 'next'

import currentUser from '@/libs/helpers/currentUser'

import prisma from '@/libs/db'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "POST") return handlePOST(req, res)

  else if (req.method === "PUT") return handleUpdate(req, res)

  else if (req.method === "DELETE") return handleDelete(req, res)

  else if (req.method === "GET") return handleGET(req, res)

  else return res.status(405).end()
  
}

export default  handler



const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {

  const {userId, title}: {userId: string, title: string} = req.body

  if (!userId || !title) return res.status(400).json({error: "missing required parameters."})


  try {


    await prisma.notification.create({
      data: {
        userId,
        title
      }
    })

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        notification: true
      }
    })


    return res.status(200).json({success: "notification created."})
  }

  catch(err) {
    
    return res.status(500).json({error: "couldn't create notification."})
  }
}



const handleUpdate = async (req: NextApiRequest, res: NextApiResponse) => {


  try {

    const {id: currentUserId}: {id: string} = await currentUser(req, res)

    await prisma.user.update({
      where: {
        id: currentUserId
      },
      data: {
        notification: false
      }
    })


    return res.status(200).json({success: "notifications alert removed."})
  }

  catch(err) {
    
    return res.status(500).json({error: "couldn't remove notifications alert."})
  }

}


const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {


  try {

    const {id: currentUserId}: {id: string} = await currentUser(req, res)

    await prisma.notification.deleteMany({
      where: {
        userId: currentUserId,
      },
    })

    await prisma.user.update({
      where: {
        id: currentUserId
      },
      data: {
        notifications: {
          deleteMany: {}
        }
      }
    })


    return res.status(200).json({success: "notifications deleted."})
  }

  catch(err) {
    
    return res.status(500).json({error: "couldn't delete notifications."})
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
        notifications: {
          orderBy: {
            createdAt: "desc"
          }
        }
      }
    })

    if (!user) {
      return res.status(404).json({ error: "current user not found." })
    }


    return res.status(200).json(user.notifications)
  }

  catch(err) {
    
    return res.status(500).json({error: "couldn't fetch notifications."})
  }

}