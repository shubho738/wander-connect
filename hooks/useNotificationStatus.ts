
import useSWR from 'swr'

import fetcher from '@/libs/fetcher'

const useNotificationStatus = () => {

   const { data, error, isLoading, mutate } = useSWR<boolean | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/notifications/check`, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useNotificationStatus