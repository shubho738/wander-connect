
import useSWR from 'swr'

import type { Notification } from '@/libs/types'
import fetcher from '@/libs/fetcher'

const useNotifications = () => {

   const { data, error, isLoading, mutate } = useSWR<Notification[] | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useNotifications