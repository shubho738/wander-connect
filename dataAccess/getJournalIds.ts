
import axios from 'axios'

const getJournalIds = async (page: number = 1, pageSize: number = 6): Promise<Record<"id", string>[]> => {

  const url = `${process.env.NEXT_PUBLIC_API_URL}/journals?page=${page}&pageSize=${pageSize}`

  try {

    const res = await axios.get(url)
    return res.data
  }

  catch(err) {

    if (axios.isAxiosError(err)) {
      throw new Error("Failed to fetch journal ids: " + err.message)
    } 
    
    else {
      throw new Error("Unexpected error while fetching journal ids: " + (err as Error).message)
    }
  }
}


export default getJournalIds