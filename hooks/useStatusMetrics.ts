
import useSWR from 'swr'

import type { StatusMetrics } from '@/libs/types'
import fetcher from '@/libs/fetcher'

const useStatusMetrics = (statusId: string) => {

   const { data, error, isLoading, mutate } = useSWR<StatusMetrics | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/status/${statusId}/metrics`, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useStatusMetrics