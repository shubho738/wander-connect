
import useSWR from 'swr'

import type { JournalBasic } from '@/libs/types'
import fetcher from '@/libs/fetcher'

const useJournalBasic = (journalId: string) => {

   const { data, error, isLoading, mutate } = useSWR<JournalBasic | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/journals/${journalId}/basic`, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useJournalBasic