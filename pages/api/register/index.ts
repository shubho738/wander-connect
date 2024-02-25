
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'

import prisma from '@/libs/db'



const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "POST") return handlePOST(req, res)

  return res.status(405).end()
}


export default handler


const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {

  const {name, username, email, password}: {name: string, username: string, email: string, password: string} = req.body

  if (!email || !username || !name || !password) {
     return res.status(400).json({ error: "missing required parameters" })
  }

  try {

    const hashedPassword = await bcrypt.hash(password, 13)

    await prisma.user.create({
      data: {
        name,
        username,
        email,
        hashedPassword
      }
    })

    return res.status(200).json({success: "registration successful!"})
  }

  catch(err) {
   
    return res.status(500).json({error: "couldn't register."})
  }
}