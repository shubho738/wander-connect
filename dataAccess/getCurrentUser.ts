
import axios from 'axios'

import type {UserBasic} from '@/libs/types'

const getCurrentUser = async (): Promise<UserBasic> => {

  try {

    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/current`)  

    return res.data
  }

  catch(err) {

    if (axios.isAxiosError(err)) {
      throw new Error("Failed to fetch current user: " + err.message)
    } 
    
    else {
      throw new Error("Unexpected error while fetching current user: " + (err as Error).message)
    }
  }
}

export default getCurrentUser