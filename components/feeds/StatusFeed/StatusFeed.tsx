
import {useRef, useEffect} from 'react'
import {useInfiniteQuery} from '@tanstack/react-query'
import {useIntersection} from '@mantine/hooks'

import getStatusIds from '@/dataAccess/getStatusIds'
import StatusItem from '../StatusItem/StatusItem'
import FeedLoader from '../../ui/loaders/FeedLoader'
import ErrorMsg from '../../ui/ErrorMsg/ErrorMsg'
import styles from './StatusFeed.module.scss'


interface StatusFeedProps {
  userId?: string;
}


const StatusFeed = ({userId}: StatusFeedProps) => {


  const {data, fetchNextPage, isError:isErrorStatusList, isLoading: isLoadingStatusList, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ["statusIds", userId],
    queryFn: async ({pageParam = 1}) => {
      const res = await getStatusIds(pageParam, 5, userId)
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


  const statusList: Record<"id", string>[] | undefined = data?.pages?.flatMap(page => page)


  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage()
  }, [entry])


  return (
    <section
      className={styles["status-feed"]}
    >

      {isLoadingStatusList && (
        <FeedLoader
          msg="Loading Statuses..."
        />
      )}

      {!isLoadingStatusList && isErrorStatusList && (
        <ErrorMsg
          msg="Error fetching statuses. Please try refreshing the page."
        />
      )}


      {userId && !isLoadingStatusList && statusList?.length === 0 && (
        <span
          className={styles["status-feed__empty"]}
        >
          User hasn&apos;t posted anything yet.
        </span>
      )}


      {!isLoadingStatusList && (statusList && statusList?.length > 0) && statusList?.map((status, i) => {
        if (i === statusList.length - 1) return (
          <div
            key={status.id}
            ref={ref}
          >
            <StatusItem
              statusId={status.id}
            />
          </div>
          )

        return (
            <div
              key={status.id}
            >
              <StatusItem
                statusId={status.id}
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

export default StatusFeed
