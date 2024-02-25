
import useSWR from 'swr'

import fetcher from '@/libs/fetcher'

// this hook returns an array of status ids

const useStatusIds = (userId?: string) => {

  const key = userId ? `${process.env.NEXT_PUBLIC_API_URL}/status/ids?userId=${userId}` : `${process.env.NEXT_PUBLIC_API_URL}/status/ids`

   const { data, error, isLoading, mutate } = useSWR<Record<'id', string>[] | undefined>(key, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useStatusIds