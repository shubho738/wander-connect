
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

  const {statusId}: {statusId: string} = req.body

  if (!statusId) return res.status(400).json({error: "missing required 'statusId' parameter."})


  try {

    const {id: currentUserId}: {id: string} = await currentUser(req, res)

    const user = await prisma.user.findUnique({
      where: {
        id: currentUserId
      },
      select: {
        bookmarks: true
      }
    })

    if (!user) {
      return res.status(404).json({ error: "current user not found." })
    }

    if (user.bookmarks.includes(statusId)) return res.status(202).json({message: "this status has already been bookmarked."})


    await prisma.user.update({
      where: {
        id: currentUserId
      },
      data: {
        bookmarks: [...user.bookmarks, statusId]
      }
    })


    return res.status(200).json({success: "bookmark added."})
  }

  catch(err) {
    
    return res.status(500).json({error: "couldn't bookmark the status ."})
  }
}



const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {

  const statusId = req.query.statusId as string | undefined

  if (!statusId) return res.status(400).json({error: "missing required 'statusId' parameter."})


  try {

    const {id: currentUserId}: {id: string} = await currentUser(req, res)

    const user = await prisma.user.findUnique({
      where: {
        id: currentUserId
      },
      select: {
        bookmarks: true
      }
    })

    if (!user) {
      return res.status(404).json({ error: "current user not found." })
    }

    if (!user.bookmarks.includes(statusId)) return res.status(202).json({message: "status hasn't been bookmarked."})

    const updatedBookmarks = user.bookmarks.filter(bookmark => bookmark !== statusId)

    await prisma.user.update({
      where: {
        id: currentUserId
      },
      data: {
        bookmarks: updatedBookmarks
      }
    })

    return res.status(200).json({success: "bookmark removed."})
  }

  catch(err) {
    
    return res.status(500).json({error: "couldn't remove bookmark."})
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
        bookmarks: true
      }
    })

    if (!user) {
      return res.status(404).json({ error: "current user not found." })
    }


    return res.status(200).json(user?.bookmarks)
  }

  catch(err) {
  
    return res.status(500).json({error: "couldn't retrieve bookmarks ."})
  }
}