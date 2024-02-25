
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/db'
import currentUser from '@/libs/helpers/currentUser'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "POST") return handlePOST(req, res)
  if (req.method === "GET") return handleGET(req, res)

  return res.status(405).end()
}


export default  handler



const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {

  const {content, statusId}: {content: string, statusId: string} = req.body

  if (!content || !statusId) return res.status(400).json({error: "missing required parameters."})

  try {

    const {id: currentUserId}: {id: string} = await currentUser(req, res)

    await prisma.comment.create({
      data: {
        content,
        statusId,
        userId: currentUserId
      }
    })

    return res.status(200).json({success: "comment added."})
  }

  catch(err) {
    
    return res.status(500).json({error: "couldn't add comment."})
  }
}




const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {

  const statusId = req.query.statusId as string | undefined

  const pageNumber = Number(req.query.page) || 1
  const pageSize = Number(req.query.pageSize) || 5

  const skip = (pageNumber - 1) * pageSize

  try {

    const comments = await prisma.comment.findMany({
      where: {
        statusId
      },
      select: {
        id: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: pageSize,
      skip
    })

    return res.status(200).json(comments)
  }

    catch(err) {

      return res.status(500).json({error: `couldn't fetch comments for status with id -> ${statusId}.`})
    }
}



