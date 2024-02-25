
import Link from 'next/link'

import type {JournalBasic} from '@/libs/types'
import useJournalBasic from '@/hooks/useJournal'
import useJournalImage from '@/hooks/useJournalImage'
import {getDateAbbreviated} from '@/hooks/useDate'
import ImageView from '../../ui/ImageView/ImageView'
import UsernameLink from '../../user/UsernameLink/UsernameLink'
import styles from './JournalCard.module.scss'

interface JournalCardProps {
  journalId: string;
}

const JournalCard = ({journalId}: JournalCardProps) => {

  const {data: journal}: {data: JournalBasic | undefined} = useJournalBasic(journalId)
  const {data: journalImage, isLoading: isLoadingJournalImage}: {data: string | undefined, isLoading: boolean} = useJournalImage(journalId)

  const createdAt = journal?.createdAt ? getDateAbbreviated(journal.createdAt) : ""

  return (
    <Link
      href={`/journals/${journal?.id}`}
      passHref
      legacyBehavior
    >
      <div
        className={styles["journal-card"]}
      >
        <ImageView
          imageSrc={journalImage ?? ""}
          imageAlt={`thumbnail for journal item ${journal?.title}`}
          isLoading={isLoadingJournalImage}
          customContainerStyles={{aspectRatio: "2 / 1.3"}}
        />

        <h2
          className={styles["journal-card__title"]}
        >
          {journal?.title}
        </h2>

        <div
          className={styles["journal-card__info"]}
        >
          <span>{createdAt}</span>
          <UsernameLink
            userId={journal?.userId ?? ""}
          />
        </div>
      </div>
    </Link>
  )
}

export default JournalCard