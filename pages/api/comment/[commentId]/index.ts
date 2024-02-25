
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/db'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "GET") return handleGET(req, res)

  return res.status(405).end()
}


export default handler



const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {

  const commentId = req.query.commentId as string | undefined

  if (!commentId) return res.status(400).json({error: "missing required 'commentId' parameter."})

  try {

    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        statusId: true,
        user: {
            select: {
                id: true,
                name: true,
                username: true
            }
        }
      }
    })

    if (!comment) {
      return res.status(404).json({ error: `comment with id ${commentId} not found.` })
    }

    return res.status(200).json(comment)
  } 

  catch (err) {
    
    return res.status(500).json({ error: `Couldn't fetch comment with id ${commentId}.` })
  }
}
