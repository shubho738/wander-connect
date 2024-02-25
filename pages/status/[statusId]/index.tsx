
import {useRouter} from 'next/router'

import type { Status } from '@/libs/types'
import useStatus from '@/hooks/useStatus'
import ErrorMsg from '@/components/ui/ErrorMsg/ErrorMsg'
import MainLayout from '@/components/layouts/MainLayout/MainLayout'
import StatusItem from '@/components/feeds/StatusItem/StatusItem'
import CommentComposer from '@/components/postComposer/CommentComposer/CommentComposer'
import CommentsFeed from '@/components/feeds/CommentsFeed/CommentsFeed'


const StatusPage = () => {

  const router = useRouter()
  const statusId: string = router.query.statusId as string

  const {data: status, isLoading: isLoadingStatus, error: errorStatus}: {data: Status | undefined, isLoading: boolean, error: any} = useStatus(statusId)


  return (
    <MainLayout
      pageBanner="Status"
      back
    >

      <main>

        <StatusItem
          statusId={statusId} 
        />

        {errorStatus && !isLoadingStatus && (
          <ErrorMsg
            msg="Error fetching status. Please try refreshing the page."
            customStyles={{marginBlockStart: "5rem"}}
          />
        )}

        {!isLoadingStatus && status && (
           <>
             <CommentComposer
               status={status}
             />

             <div
               style={{marginBlockStart: "3rem"}}
             >
              <CommentsFeed
                statusId={statusId}
              />
             </div>
           </>
          )}

      </main>

    </MainLayout>
  )
}

export default StatusPage