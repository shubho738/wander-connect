
import useSWR from 'swr'

import fetcher from '@/libs/fetcher'

const useUserImage = (userId: string, type: string = "profileImage") => {

   const { data, error, isLoading, mutate } = useSWR<string | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/image?type=${type}`, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useUserImage