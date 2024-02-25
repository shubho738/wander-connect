
import useSWR from 'swr'

import fetcher from '@/libs/fetcher'

const useUserImages = (userId: string) => {

   const { data, error, isLoading, mutate } = useSWR<{profileImage: string, coverImage: string} | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/image/all`, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useUserImages