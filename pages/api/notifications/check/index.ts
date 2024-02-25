
import type { NextApiRequest, NextApiResponse } from 'next'

import currentUser from '@/libs/helpers/currentUser'
import prisma from '@/libs/db'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "GET") return handleGET(req, res)

  return res.status(405).end()
  
}

export default  handler


const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {


  try {

    const {id: currentUserId}: {id: string} = await currentUser(req, res)

    const user = await prisma.user.findUnique({
      where: {
        id: currentUserId
      },
      select: {
        notification: true
      }
    })

    if (!user) {
      return res.status(404).json({ error: "current user not found." })
    }


    return res.status(200).json(user.notification)
  }

  catch(err) {
    
    return res.status(500).json({error: "couldn't fetch notification status."})
  }

}