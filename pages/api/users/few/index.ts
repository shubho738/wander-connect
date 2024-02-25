
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/db'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "GET") return handleGET(req, res)

  else return res.status(405).end()
  
}

export default  handler



const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {

  const limitQuery = req.query.limit as string | undefined

  if (!limitQuery) return res.status(400).json({error: "missing required 'limit' parameter."})

  const limit = Number(limitQuery) || 5

  try {

      const users = await prisma.user.findMany({
        take: limit,
        select: {
          id: true
        }
      })

      return res.status(200).json(users)
    }

    catch(err) {

      return res.status(500).json({error: "couldn't retrieve few users."})
    }
}
