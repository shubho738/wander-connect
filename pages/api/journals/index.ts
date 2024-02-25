
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/db'
import currentUser from '@/libs/helpers/currentUser'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "GET") return handleGET(req, res)

  else if (req.method === "POST") return handlePOST(req, res)

  return res.status(405).end()
  
}

export default  handler



const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {

  const {title, content, image, location}: {title: string, content: string, image: string, location: string} = req.body

  if (!title || !content) return res.status(400).json({error: "missing required parameters"})


  try {

    const {id: currentUserId}: {id: string} = await currentUser(req, res)

    await prisma.journal.create({
      data: {
        title,
        content,
        image,
        location,
        userId: currentUserId
      }
    })

    return res.status(200).json({success: "journal created."})
  }

  catch(err) {
    
    return res.status(500).json({error: "couldn't create journal."})
  }
}



const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {

  const pageNumber = Number(req.query.page) || 1
  const pageSize = Number(req.query.pageSize) || 6

  const skip = (pageNumber - 1) * pageSize

  try {

      const journals = await prisma.journal.findMany({
        select: {
          id: true,
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: pageSize,
        skip
      })
      return res.status(200).json(journals)
    }

    catch(err) {

      return res.status(500).json({error: "couldn't fetch journal ids."})
    }
}