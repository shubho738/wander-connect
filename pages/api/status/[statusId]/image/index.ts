
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/db'


export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb'
        }
    }
}


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
        image: true
      }
    })

    if (!status) {
      return res.status(404).json({ error: "status not found." })
    }

    return res.status(200).send(status.image)
  }

    catch(err) {
     
      return res.status(500).json({error: "couldn't fetch status image."})
    }
}
