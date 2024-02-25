
import {useState, useRef, useEffect} from 'react'
import axios from "axios"
import toast from 'react-hot-toast'
import type { KeyedMutator } from 'swr'

import type { UserBasic, Status, StatusMetrics, Notification } from '@/libs/types'
import useCurrentUser from "./useCurrentUser"
import useStatus from "./useStatus"
import useStatusMetrics from './useStatusMetrics'
import useNotifications from './useNotifications'
import useNotificationStatus from './useNotificationStatus'


const useStar = (statusId: string, statusAuthorId: string) => {


  const { data: currentUser, mutate: mutateCurrentUser }: {data: UserBasic | undefined, mutate: KeyedMutator<UserBasic | undefined>} = useCurrentUser()
  const { data: status }: {data: Status | undefined} = useStatus(statusId)
  const {mutate: mutateStatusMetrics}: {mutate: KeyedMutator<StatusMetrics | undefined>} = useStatusMetrics(statusId)
  const { mutate: mutateNotifications }: { mutate: KeyedMutator<Notification[] | undefined>} = useNotifications()
  const {mutate: mutateNotificationStatus}: {mutate: KeyedMutator<boolean | undefined>} = useNotificationStatus()

  const isStarred = useRef<boolean>()

  const [isPending, setIsPending] = useState(false)


  useEffect(() => {
    if (status) {
      isStarred.current = status?.likedIds?.includes(currentUser?.id ?? "")
    }
  }, [status?.likedIds, currentUser?.id])


  const toggleStar = async () => {

    setIsPending(true)

    try {

      if (!isStarred.current) {

        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/like`, {statusId})

        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, {
          userId: statusAuthorId,
          title: `${currentUser?.username} liked your status.`
        })
        toast.success("Star added.")
      }

      else {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/like?statusId=${statusId}`)
        toast.success("Star removed.")
      }

      isStarred.current = !isStarred.current

      mutateNotifications()
      mutateNotificationStatus()
      mutateCurrentUser()
      mutateStatusMetrics()
      
      setIsPending(false)

    } catch (err) {

      setIsPending(false)
      toast.error("Sorry, there was an error.")
    }
  }

  return {
    toggleStar,
    isPending
  }
}

export default useStar