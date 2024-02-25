
import useSWR from 'swr'

import fetcher from '@/libs/fetcher'

const useJournalIds = () => {

   const { data, error, isLoading, mutate } = useSWR<Record<"id", string>[] | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/journals`, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useJournalIds