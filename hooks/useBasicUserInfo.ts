
import useSWR from 'swr'

import type {UserBasic} from '@/libs/types'
import fetcher from '@/libs/fetcher'

const useBasicUserInfo = (userId: string) => {

const { data, error, isLoading, mutate } = useSWR<UserBasic | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/basicInfo`, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useBasicUserInfo