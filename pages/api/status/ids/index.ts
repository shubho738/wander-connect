
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/db'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "GET") return handleGET(req, res)

  else return res.status(405).end()
}

export default handler


const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {

  try {

    const userId = req.query.userId as string | undefined
    const pageNumber = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 5

    const skip = (pageNumber - 1) * pageSize


    const statusIds = await prisma.status.findMany({
      where: {
        userId
      },
      select: {
        id: true,
      },
      orderBy: {
        createdAt: "desc"
      },
      take: pageSize,
      skip
    })

    return res.status(200).json(statusIds)
  } 

  catch (err) {

    return res.status(500).json({ error: "couldn't fetch status ids." })
  }
}
