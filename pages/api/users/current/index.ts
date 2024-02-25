
import type { NextApiRequest, NextApiResponse } from 'next'

import currentUser from '@/libs/helpers/currentUser'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "GET") return handleGET(req, res)

  return res.status(405).end()
}


export default handler



const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {

  try {

    const user = await currentUser(req, res)

    return res.status(200).json(user)
  }

  catch(err) {
    return res.status(500).json({error: "couldn't fetch current user data."})
  }
}