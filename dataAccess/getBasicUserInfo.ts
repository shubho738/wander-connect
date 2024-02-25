
import axios from 'axios'

import type {UserBasic} from '@/libs/types'

const getBasicUserInfo = async (userId: string): Promise<UserBasic> => {

  try {

    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/basicInfo`)  

    return res.data
  }

  catch(err) {

    if (axios.isAxiosError(err)) {
      throw new Error("Failed to fetch basic user info: " + err.message)
    } 
    
    else {
      throw new Error("Unexpected error while fetching basic user info: " + (err as Error).message)
    }
  }
}

export default getBasicUserInfo