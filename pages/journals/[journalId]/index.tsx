
import { useRouter } from 'next/router'

import type { Journal, UserBasic } from '@/libs/types'
import getJournal from '@/dataAccess/getJournal'
import getBasicUserInfo from '@/dataAccess/getBasicUserInfo'
import useJournalImage from '@/hooks/useJournalImage'
import {getLongDate} from '@/hooks/useDate'
import MainLayout from '@/components/layouts/MainLayout/MainLayout'
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer'
import UserThumbnail from '@/components/user/UserThumbnail/UserThumbnail'
import ImageView from '@/components/ui/ImageView/ImageView'
import UsernameLink from '@/components/user/UsernameLink/UsernameLink'
import ErrorMsg from '@/components/ui/ErrorMsg/ErrorMsg'
import styles from  './JournalPage.module.scss'



export const getServerSideProps = async ({params}: {params: {journalId: string}}) => {

  try {
    const journal: Journal | undefined = await getJournal(params.journalId)
    const basicUserInfo: UserBasic | undefined = await getBasicUserInfo(journal?.userId)

    const createdAt: string = getLongDate(journal?.createdAt)

    return {
      props: {
        journal: journal,
        createdAt,
        journalAuthor: basicUserInfo
      }
    }
  }

  catch(err) {
    return {
      props: {
        error: true
      }
    }
  }
}



interface JournalPageProps {
  journal: Journal;
  createdAt: string;
  journalAuthor: UserBasic;
  error: any;
}


const JournalPage = ({journal, createdAt, journalAuthor, error}: JournalPageProps) => {


  const {data: journalImage, isLoading: isLoadingJournalImage}: {data: string | undefined, isLoading: boolean} = useJournalImage(journal?.id ?? "")


  return (
    <MainLayout
      pageBanner="Journal"
      back
      customContentContainerStyles={{
        maxWidth: "100%",
      }}
    >
      {error && (
        <ErrorMsg
          msg="There was an error. Please try refreshing the page."
        />
      )}

      {!error && (
        <main 
          className={styles["journal"]}
        >
          <article>
            <h2
              className={styles["journal__title"]}
            >
              {journal?.title}
            </h2>

            <div
              className={styles["journal__info"]}
            >
              <span>Published on {createdAt}</span>
              <span>{journal?.location}</span>
            </div>

            <div
              className={styles["journal__author"]}
            >
              <UserThumbnail
                userId={journal?.userId}
              />

              <div
                className={styles["journal__author-names"]}
              >
                <span
                  className={styles["journal__author-name"]}
                >
                  {journalAuthor?.name}
                </span>
                <UsernameLink
                  userId={journal?.userId ?? ""}
                />
              </div>
            </div>

            <div
              className={styles["journal__image"]}
            >
              <ImageView
                imageSrc={journalImage ?? ""}
                imageAlt="journal image"
                isLoading={isLoadingJournalImage}
                customImageStyles={{objectFit: "cover"}}
              />
            </div>

            <div
              className={styles["journal__content"]}
            >
              <MarkdownRenderer>
                {journal?.content ?? ""}
              </MarkdownRenderer>
            </div>
          </article>
        </main>
      )}
    </MainLayout>
  )
}

export default JournalPage