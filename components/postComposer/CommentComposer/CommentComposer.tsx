
import {useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import type { KeyedMutator } from 'swr'

import type {UserBasic, Status, StatusMetrics, Notification} from '@/libs/types'
import useStatusMetrics from '@/hooks/useStatusMetrics'
import useCurrentUser from '@/hooks/useCurrentUser'
import useNotifications from "@/hooks/useNotifications"
import useNotificationStatus from '@/hooks/useNotificationStatus'
import UserThumbnail from '../../user/UserThumbnail/UserThumbnail'
import Input from '../../ui/Input/Input'
import Button from '../../ui/Button/Button'
import styles from './CommentComposer.module.scss'


interface CommentComposerProps {
  status: Status;
}

const CommentComposer = ({status}: CommentComposerProps) => {

  const [reply, setReply] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const {data: currentUser, mutate: mutateCurrentUser}: {data: UserBasic | undefined, mutate: KeyedMutator<UserBasic | undefined>} = useCurrentUser()
  const {mutate: mutateStatusMetrics}: {mutate: KeyedMutator<StatusMetrics | undefined>} = useStatusMetrics(status?.id)
  const {mutate: mutateNotifications}: {mutate: KeyedMutator<Notification[] | undefined>} = useNotifications() 
  const {mutate: mutateNotificationStatus}: {mutate: KeyedMutator<boolean | undefined>} = useNotificationStatus()

  const queryClient = useQueryClient()


  const onReply = async () => {

    if (!reply.trim()) {
      toast.error("Please add a comment.", {id: "emptyReplyField"})
    }

    setIsLoading(true)

    try {

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/comment`, {
        content: reply,
        statusId: status?.id
      })


      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, {
        userId: status?.userId,
        title: `${currentUser?.username} commented on your your status.`
      })

      toast.success("Comment added.")
      
      mutateNotifications()
      mutateNotificationStatus()
      
      mutateCurrentUser()

      queryClient.invalidateQueries( {queryKey: ["commentIds"]})
      mutateStatusMetrics()
      
      setReply("")
    }

    catch(err) {
      toast.error("Sorry, there was an error.")
    }

    finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={styles["comment-form"]}
    >
      <div
        className={styles["comment-form__user-thumbnail"]}
      >
        <UserThumbnail
          userId={currentUser?.id}
        />
      </div>

      <div
        className={styles["comment-form__input"]}
      >
        <Input
          key={isLoading ? 'submitting' : 'not-submitting'}
          type="textarea"
          placeholder="Say something"
          value={reply}
          onTextAreaChange={(e: React.ChangeEvent<HTMLTextAreaElement>) : void => setReply(e.target.value)}
          disabled={isLoading}
          fullWidth
        />

        <Button
          checkAuth
          label="Post"
          onClick={onReply}
          disabled={isLoading || !reply.trim()}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default CommentComposer