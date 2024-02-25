
import useSWR from 'swr'

import type {UserBasic} from '@/libs/types'
import fetcher from '@/libs/fetcher'

const useCurrentUser = () => {

   const { data, error, isLoading, mutate } = useSWR<UserBasic | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/users/current`, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useCurrentUser