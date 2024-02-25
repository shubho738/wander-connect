
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

  return res.status(405).end()
}


export default handler



const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {

  const journalId = req.query.journalId as string | undefined

  if (!journalId) return res.status(400).json({error: "missing required 'journalId' parameter."})

  try {

    const journal = await prisma.journal.findUnique({
      where: {
        id: journalId
      },
      select: {
        image: true
      }
    })

    if (!journal) {
      return res.status(404).json({ error: "journal not found." })
    }

    return res.status(200).send(journal.image)
  }

    catch(err) {
      return res.status(500).json({error: "couldn't fetch journal image."})
    }
}
