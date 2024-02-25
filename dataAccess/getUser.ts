
import axios from 'axios'

import type {User} from '@/libs/types'

const getUser = async (userId: string): Promise<User> => {


  try {

    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)  

    return res.data
  }

  catch(err) {

    if (axios.isAxiosError(err)) {
      throw new Error("Failed to fetch user: " + err.message)
    } 
    
    else {
      throw new Error("Unexpected error while fetching user: " + (err as Error).message)
    }
  }
}

export default getUser