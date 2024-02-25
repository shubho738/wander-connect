
import axios from 'axios'

const getCommentIds = async (page: number = 1, pageSize: number = 5, statusId: string): Promise<Record<"id", string>[]> => {

  const url = `${process.env.NEXT_PUBLIC_API_URL}/comment?statusId=${statusId}&page=${page}&pageSize=${pageSize}`

  try {

    const res = await axios.get(url)
    return res.data
  }

  catch(err) {

    if (axios.isAxiosError(err)) {
      throw new Error("Failed to fetch comment ids: " + err.message)
    } 
    
    else {
      throw new Error("Unexpected error while fetching comment ids: " + (err as Error).message)
    }
  }
}


export default getCommentIds