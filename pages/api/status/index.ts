
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/db'
import currentUser from '@/libs/helpers/currentUser'



const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "POST") return handlePOST(req, res)

  return res.status(405).end()
  
}

export default  handler



const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {

  const {text, image, location}: {text: string, image: string, location: string} = req.body

  if (!text) return res.status(400).json({error: "missing required 'text' parameter."})


  try {

    const {id: currentUserId}: {id: string} = await currentUser(req, res)

    await prisma.status.create({
      data: {
        text,
        image,
        location,
        userId: currentUserId
      }
    })

    return res.status(200).json({success: "status created."})
  }

  catch(err) {
    
    return res.status(500).json({error: "couldn't create status."})
  }
}