
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/libs/db'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "GET") return handleGET(req, res)

  return res.status(405).end()
}


export default handler



const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {

  const statusId = req.query.statusId as string | undefined

  if (!statusId) return res.status(400).json({error: "missing required 'statusId' parameter."})

  try {

    const status = await prisma.status.findUnique({
      where: {
        id: statusId
      },
      select: {
        id: true,
        text: true,
        location: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
        
      }
    })

    if (!status) {
      return res.status(404).json({ error: `status with id ${statusId} not found.` })
    }

    return res.status(200).json(status)
  } 

  catch (err) {
    
    return res.status(500).json({ error: `Coudn't fetch status with id ${statusId}.` })
  }
}
