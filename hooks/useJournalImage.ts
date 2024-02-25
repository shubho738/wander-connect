
import useSWR from 'swr'

import fetcher from '@/libs/fetcher'

const useJournalImage = (journalId: string) => {

   const { data, error, isLoading, mutate } = useSWR<string | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/journals/${journalId}/image`, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useJournalImage