
import axios from 'axios'

const getStatusIds = async (page: number = 1, pageSize: number = 5, userId?: string): Promise<Record<"id", string>[]> => {

  const url = userId ? `${process.env.NEXT_PUBLIC_API_URL}/status/ids?userId=${userId}&page=${page}&pageSize=${pageSize}` : `${process.env.NEXT_PUBLIC_API_URL}/status/ids?page=${page}&pageSize=${pageSize}`

  try {

    const res = await axios.get(url)
    return res.data
  }

  catch(err) {

    if (axios.isAxiosError(err)) {
      throw new Error("Failed to fetch status ids: " + err.message)
    } 
    
    else {
      throw new Error("Unexpected error while fetching status ids: " + (err as Error).message)
    }
  }
}


export default getStatusIds