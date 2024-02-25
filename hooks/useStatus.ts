
import useSWR from 'swr'

import type {Status} from '@/libs/types'
import fetcher from '@/libs/fetcher'

const useStatus = (statusId: string) => {

   const { data, error, isLoading, mutate } = useSWR<Status | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/status/${statusId}`, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useStatus