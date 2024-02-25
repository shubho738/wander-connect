
import axios from 'axios'

import type {Journal} from '@/libs/types'

const getInitialJournals = async (): Promise<Journal[]> => {


  try {

    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/journals`)  

    return res.data
  }

  catch(err) {

    if (axios.isAxiosError(err)) {
      throw new Error("Failed to fetch imitial journals: " + err.message)
    } 
    
    else {
      throw new Error("Unexpected error while fetching initial journals: " + (err as Error).message)
    }
  }
}

export default getInitialJournals