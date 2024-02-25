
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/db'
import currentUser from '@/libs/helpers/currentUser'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "POST") return handlePOST(req, res)

  else if (req.method === "DELETE") return handleDELETE(req, res)

  else return res.status(405).end()
  
}

export default  handler



const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {

  const {statusId}: {statusId: string} = req.body

  if (!statusId) return res.status(400).json({error: "missing required 'statusId' parameter."})


  try {

    const {id: currentUserId}: {id: string} = await currentUser(req, res)

    const status = await prisma.status.findUnique({
      where: {
        id: statusId
      },
      select: {
        likedIds: true
      }
    })

    if (!status) {
      return res.status(404).json({ error: "status not found." })
    }


    await prisma.status.update({
      where: {
        id: statusId
      },
      data: {
        likedIds: [...status.likedIds, currentUserId]
      }
    })

    return res.status(200).json({success: "liked the status."})
  }

  catch(err) {
    
    return res.status(500).json({error: "couldn't like the status."})
  }
}



const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {

  const statusId = req.query.statusId as string | undefined

  if (!statusId) return res.status(400).json({error: "missing required 'statusId' parameter."})


  try {

    const {id: currentUserId}: {id: string} = await currentUser(req, res)

    const status = await prisma.status.findUnique({
      where: {
        id: statusId
      },
      select: {
        likedIds: true
      }
    })

    if (!status) {
      return res.status(404).json({ error: "status not found." })
    }

    const updatedLikedIds = status.likedIds?.filter(likedId => likedId !== currentUserId)

    await prisma.status.update({
      where: {
        id: statusId
      },
      data: {
        likedIds: updatedLikedIds
      }
    })

    return res.status(200).json({success: "like removed."})
  }

  catch(err) {
    
    return res.status(500).json({error: "couldn't remove like."})
  }

}
