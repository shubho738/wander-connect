
import useSWR from 'swr'

import fetcher from '@/libs/fetcher'

const useStatusImage = (statusId: string) => {

   const { data, error, isLoading, mutate } = useSWR<string | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/status/${statusId}/image`, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useStatusImage