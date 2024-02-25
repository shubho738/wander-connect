
import type { Comment } from '@/libs/types'
import useComment from '@/hooks/useComment'
import {getDateAbbreviated} from '@/hooks/useDate'
import Card from '../../ui/Card/Card'
import UserThumbnail from '../../user/UserThumbnail/UserThumbnail'
import UsernameLink from '@/components/user/UsernameLink/UsernameLink'
import styles from './CommentItem.module.scss'

interface CommentItemProps {
  commentId: string;
}

const CommentItem = ({commentId}: CommentItemProps) => {

  const {data: comment}: {data: Comment | undefined} = useComment(commentId)

  const commentUpdatedAt = getDateAbbreviated(comment?.updatedAt ?? "")

  return (
   <Card>
    <div
      className={styles["comment-card"]}
    >
      <div>
        <UserThumbnail
          userId={comment?.userId}
          goToProfile
        />
      </div>

      <div>
        <div
          className={styles["comment-card__header"]}
        >
          <span
            className={styles["comment-card__user-name"]}
          >
            {comment?.user?.name}
          </span>
          
          <div
            className={styles["comment-card__info"]}
          >
            
            <UsernameLink
              userId={comment?.userId ?? ""}
            />
            
            <span
              className={styles["comment-card__timestamp"]}
            >
              {commentUpdatedAt}
            </span>
          </div>
        </div>

        <div
          className={styles["comment-card__content"]}
        >
          <span>{comment?.content}</span>
        </div>
      </div>
    </div>
   </Card>
  )
}

export default CommentItem