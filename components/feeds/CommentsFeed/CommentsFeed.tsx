
import { useRef, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useIntersection } from '@mantine/hooks'

import getCommentIds from '@/dataAccess/getCommentIds'
import CommentItem from '../CommentItem/CommentItem'
import FeedLoader from '../../ui/loaders/FeedLoader'
import ErrorMsg from '../../ui/ErrorMsg/ErrorMsg'

interface CommentsFeedProps {
  statusId: string;
}

const CommentsFeed = ({ statusId }: CommentsFeedProps) => {

  const { data, fetchNextPage, isError: isErrorComments, isLoading: isLoadingComments, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["commentIds", statusId],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await getCommentIds(pageParam, 5, statusId)
      return res
    },
    getNextPageParam: (_, pages) => {
      return pages.length + 1
    },
    initialPageParam: 0
  })

  const lastCommentRef = useRef<HTMLElement>(null)

  const { ref, entry } = useIntersection({
    root: lastCommentRef.current,
    threshold: 1
  })

  const comments: Record<"id", string>[] | undefined = data?.pages?.flatMap(page => page)

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage()
  }, [entry])

  const customStyles = { '--space-y-gap': '2rem' } as React.CSSProperties

  return (
    <section
      style={customStyles}
      className="space-y"
    >
      {isLoadingComments && (
        <FeedLoader
          msg="Loading Comments..."
        />
      )}

      {!isLoadingComments && isErrorComments && (
        <ErrorMsg
          msg="Error fetching comments. Please try refreshing the page."
        />
      )}

      {!isLoadingComments && (comments && comments?.length > 0) && comments?.map((comment, i) => {
        if (i === comments.length - 1) return (
          <div
            key={comment.id}
            ref={ref}
          >
            <CommentItem
              commentId={comment.id}
            />
          </div>
        )

        return (
          <div
            key={comment.id}
          >
            <CommentItem
              commentId={comment.id}
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

export default CommentsFeed
