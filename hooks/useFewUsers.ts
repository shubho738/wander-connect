
import useSWR from 'swr'

import type {UserBasic} from '@/libs/types'
import fetcher from '@/libs/fetcher'

const useFewUsers = (limit: number = 5) => {

   const { data, error, isLoading, mutate } = useSWR<Record<"id", string>[] | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/users/few?limit=${limit}`, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useFewUsers