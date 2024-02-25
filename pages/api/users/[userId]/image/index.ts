
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/db'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "GET") return handleGET(req, res)

  return res.status(405).end()
}


export default handler



const getUserImage = async (userId: string, imageType: "profileImage" | "coverImage") => {

  const selectField = imageType === "profileImage" ? "profileImage" : "coverImage"

  return prisma.user.findUnique({
    where: { id: userId },
    select: { [selectField]: true }
  })
  
}



const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  
  
  const { userId, type } = req.query as {userId: string | undefined, type: string | undefined}

  if (!userId || !type) {

    return res.status(400).json({ error: "missing required parameters." })
  }

  try {

    let userImage

    if (type === "profileImage" || type === "coverImage") {

      userImage = await getUserImage(userId, type)

      if (!userImage) {
        return res.status(404).json({ error: "User not found." })
      }

    } 

    else {

      return res.status(400).json({ error: "Invalid 'type' parameter." })
    }

    return res.status(200).send(userImage[type])

  } 

  catch (err) {
   
    return res.status(500).json({ error: "Couldn't fetch user image." })
  }
}
