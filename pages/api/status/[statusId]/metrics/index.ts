
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/db'



const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "GET") return handleGET(req, res)

  else return res.status(405).end()
  
}

export default  handler



const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {

  const statusId = req.query.statusId as string | undefined

  if (!statusId) return res.status(400).json({error: "missing required 'statusId' parameter."})

  try {

    const status = await prisma.status.findUnique({
      where: {
        id: statusId
      },
      select: {
        likedIds: true,
        comments: true
      }
    })

    if (!status) {
      return res.status(404).json({ error: "status not found." })
    }

    const statusMetrics = {
      starCount: status.likedIds.length,
      commentCount: status.comments.length
    }


    return res.status(200).json(statusMetrics)
  }

    catch(err) {
      return res.status(500).json({error: "couldn't fetch status metrics."})
    }
}
