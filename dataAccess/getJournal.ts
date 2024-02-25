
import axios from 'axios'

import type {Journal} from '@/libs/types'

const getJournal = async (journalId: string): Promise<Journal> => {


  try {

    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/journals/${journalId}`)  

    return res.data
  }

  catch(err) {

    if (axios.isAxiosError(err)) {
      throw new Error("Failed to fetch journal: " + err.message)
    } 
    
    else {
      throw new Error("Unexpected error while fetching journal: " + (err as Error).message)
    }
  }
}

export default getJournal