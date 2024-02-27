
import {useRouter} from 'next/router'
import {Star, MessageCircle} from 'lucide-react'

import type {Status, StatusMetrics, UserBasic} from '@/libs/types'
import useStar from '@/hooks/useStar'
import useStatus from '@/hooks/useStatus'
import useStatusImage from '@/hooks/useStatusImage'
import useStatusMetrics from '@/hooks/useStatusMetrics'
import useBasicUserInfo from '@/hooks/useBasicUserInfo'
import {getTimeDistance} from '@/hooks/useDate'
import UserThumbnail from '../../user/UserThumbnail/UserThumbnail'
import UsernameLink from '../../user/UsernameLink/UsernameLink'
import TextLoader from '../../ui/loaders/TextLoader'
import Loader from '../../ui/loaders/Loader'
import Card from '../../ui/Card/Card'
import ImageView from '../../ui/ImageView/ImageView'
import Tooltip from '../../ui/Tooltip/Tooltip'
import Bookmark from '../../ui/Bookmark/Bookmark'
import Button from '../../ui/Button/Button'
import ErrorMsg from '../../ui/ErrorMsg/ErrorMsg'
import styles from './StatusItem.module.scss'


interface StatusItemProps {
  statusId: string;
}


const StatusItem = ({statusId}: StatusItemProps) => {

  const router = useRouter()

  const {data: status, isLoading: isLoadingStatus, error: errorStatus}: {data: Status | undefined, isLoading: boolean, error: any} = useStatus(statusId)
  const {data: statusImage}: {data: string | undefined} = useStatusImage(statusId)
  const {data: statusMetrics}: {data: StatusMetrics | undefined} = useStatusMetrics(statusId)

  const {data: statusAuthor}: {data: UserBasic | undefined} = useBasicUserInfo(status?.userId ?? "")

  const {toggleStar, isPending: isStarPending}: {toggleStar: () => Promise<void>, isPending: boolean} = useStar(statusId, status?.userId ?? "")


  const statusDate = getTimeDistance(status?.createdAt ?? "")


  const onStar = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.stopPropagation()

    await toggleStar()
  }


  return (
   <Card
     onClick={() => router.push(`/status/${statusId}`)}
   >
    <div
      className={styles["status-item"]}
    >
      <div
        className={styles["status-item__header"]}
      >
       <div
         className={styles["status-item__info"]}
       >
        <UserThumbnail
          userId={status?.userId}
        />

        <div>
          
          <div
            className="space-x"
          >

            <span
              className={styles["status-item__user-name"]}
            >
              {statusAuthor?.name}
            </span>
          
          </div>  

          <div
            className={styles["status-item__additional-info"]}
          >
            <UsernameLink
              userId={status?.userId ?? ""}
            />
            <div
              className={styles["status-item__additional-info-details"]}
            >
              <span
                className={styles["status-item__date"]}
              >
                {statusDate}
              </span>
              <span>{status?.location}</span>
            </div>
          </div>
        </div>
       </div>

       <Tooltip
         text="bookmark"
         fontSize="var(--fs-300)"
        >
         <Bookmark
           statusId={statusId}
         />
       </Tooltip>
      </div>

      <div
        className={styles["status-item__content"]}
      >

        {isLoadingStatus && (
          <TextLoader />
          )}

        {!isLoadingStatus && errorStatus && (
          <ErrorMsg
            msg="Couldn't fetch status" 
          />
          )}

        {!isLoadingStatus && status?.text && (
          <p
            className={styles["status-item__content-text"]}
          >
            {status?.text}
          </p>
          )}

        {statusImage && (
          <ImageView
            imageSrc={statusImage} 
            imageAlt="status image"
            customImageStyles={{objectFit: "cover"}}
          />
            )}
      </div>

      <div
        className={styles["status-item__cta"]}
      >
        <div 
          className={styles["status-item__cta-item"]}
        >

        {isStarPending ? (
          <Loader />
          ) : (
          <Button
            checkAuth
            onClick={onStar}
            icon={Star}
            customStyles={{padding: "0", background: "transparent", color: "hsl(var(--clr-foreground))"}}
          />
          )}

          <span>{statusMetrics?.starCount}</span>
        </div>
        
        <div
          className={styles["status-item__cta-item"]}
        >
          <MessageCircle
            size="22" 
          />
          <span>{statusMetrics?.commentCount}</span>
        </div>
      </div>
    </div>
   </Card>
    )

}

export default StatusItem