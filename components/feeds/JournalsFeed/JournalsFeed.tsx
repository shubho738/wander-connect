
import {useRef, useEffect} from 'react'
import {useInfiniteQuery} from '@tanstack/react-query'
import {useIntersection} from '@mantine/hooks'

import getJournalIds from '@/dataAccess/getJournalIds'
import JournalCard from '../JournalCard/JournalCard'
import FeedLoader from '../../ui/loaders/FeedLoader'
import ErrorMsg from '../../ui/ErrorMsg/ErrorMsg'
import styles from './JournalsFeed.module.scss'


const JournalsFeed = () => {

  const {data, fetchNextPage, isError:isErrorJournals, isLoading: isLoadingJournals, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ["journalIds"],
    queryFn: async ({pageParam = 1}) => {
      const res = await getJournalIds(pageParam, 4)
      return res
    },
    getNextPageParam: (_, pages) => {
        return pages.length + 1
    },
    initialPageParam: 0
  })


  const lastStatusRef = useRef<HTMLElement>(null)

  const {ref, entry} = useIntersection({
    root: lastStatusRef.current,
    threshold: 1
  })


  const journals: Record<"id", string>[] | undefined = data?.pages?.flatMap(page => page)


  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage()
  }, [entry])


  return (
    <section
      className={styles["journals-feed"]}
    >

      {isLoadingJournals && (
        <FeedLoader
          msg="Loading Journals..."
        />
      )}

      {!isLoadingJournals && isErrorJournals && (
        <ErrorMsg
          msg="Error fetching journals. Please try refreshing the page."
        />
      )}


      {!isLoadingJournals && (journals && journals?.length > 0) && journals?.map((journal, i) => {
        if (i === journals.length - 1) return (
          <div
            key={journal.id}
            ref={ref}
          >
            <JournalCard
              journalId={journal.id}
            />
          </div>
          )

        return (
            <div
              key={journal.id}
            >
              <JournalCard
                journalId={journal.id}
              />
            </div>
          )
      })}

      {isFetchingNextPage && (
        <FeedLoader />
        )}

    </section>
  )
}


export default JournalsFeed