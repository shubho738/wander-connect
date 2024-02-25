
import useSWR from 'swr'

import type {User} from '@/libs/types'
import fetcher from '@/libs/fetcher'

const useUser = (userId: string) => {

   const { data, error, isLoading, mutate } = useSWR<User | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useUser