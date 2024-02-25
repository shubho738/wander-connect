
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/db'
import currentUser from '@/libs/helpers/currentUser'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "POST") return handlePOST(req, res)

  return res.status(405).end()
}


export default  handler



const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {

  const {name, username, about, coverImage, profileImage}: {name: string, username: string, about: string, coverImage: string, profileImage: string} = req.body

  if (!name || !username) return res.status(400).json({error: "missing required parameters."})


  try {

    const {id: currentUserId}: {id: string} = await currentUser(req, res)

    await prisma.user.update({
      where: {
        id: currentUserId
      },
      data: {
        name,
        username,
        about,
        coverImage,
        profileImage
      }
    })

    return res.status(200).json({success: "user updated."})
  }

  catch(err) {
    
    return res.status(500).json({error: "couldn't update user."})
  }
  
}
