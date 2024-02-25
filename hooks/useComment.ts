
import useSWR from 'swr'

import type {Comment} from '@/libs/types'
import fetcher from '@/libs/fetcher'

const useComment = (commentId: string) => {

   const { data, error, isLoading, mutate } = useSWR<Comment | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/comment/${commentId}`, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useComment