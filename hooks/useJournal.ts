
import useSWR from 'swr'

import type { Journal } from '@/libs/types'
import fetcher from '@/libs/fetcher'

const useJournal = (journalId: string) => {

   const { data, error, isLoading, mutate } = useSWR<Journal | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/journals/${journalId}`, fetcher)

   return {
    data,
    error,
    isLoading,
    mutate
  }
}


export default useJournal