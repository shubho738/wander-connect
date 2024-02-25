
import type { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth/next'
import {useSelector} from 'react-redux'

import type { RootState } from '@/redux/store'
import authOptions from '@/libs/authOptions'
import MainLayout from '@/components/layouts/MainLayout/MainLayout'
import StatusItem from '@/components/feeds/StatusItem/StatusItem'


export async function getServerSideProps(context: GetServerSidePropsContext) {

  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {}
  }
  
}


const BookmarksPage = () => {

  const bookmarkedStatusList: string[] = useSelector((state: RootState) => state.bookmark.bookmarkedStatusList)

  return (
    <MainLayout
      pageBanner="Bookmarks"
      back
    >
      <main
        className="space-y"
      >

        {!bookmarkedStatusList.length && (
           <span
             style={{fontSize: "var(--fs-500)"}}
            >
             You haven&apos;t bookmarked anything yet.
           </span>
          )}

        {bookmarkedStatusList.map(statusId => (
          <StatusItem
            key={statusId}
            statusId={statusId}
          />
          ))}
      </main>
    </MainLayout>
  )
}

export default BookmarksPage