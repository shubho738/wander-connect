
import type {GetServerSidePropsContext} from 'next'
import {getServerSession} from 'next-auth/next'
import {useEffect, useState} from 'react'
import toast from 'react-hot-toast'
import {KeyedMutator} from 'swr'

import type {Notification, UserBasic} from '@/libs/types'
import authOptions from '@/libs/authOptions'
import useNotifications from '@/hooks/useNotifications'
import useNotificationStatus from '@/hooks/useNotificationStatus'
import useCurrentUser from '@/hooks/useCurrentUser'
import {updateNotificationAlert, deleteNotifications} from '@/libs/helpers/notifications'
import MainLayout from '@/components/layouts/MainLayout/MainLayout'
import FeedLoader from '@/components/ui/loaders/FeedLoader'
import Card from '@/components/ui/Card/Card'
import Button from '@/components/ui/Button/Button'
import ErrorMsg from '@/components/ui/ErrorMsg/ErrorMsg'



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




const NotificationsPage = () => {

  const [isLoading, setIsLoading] = useState(false)

  const {data: notifications, isLoading: isLoadingNotifications, error: errorNotifications, mutate: mutateNotifications}: {data: Notification[] | undefined, isLoading: boolean, mutate: KeyedMutator<Notification[] | undefined>, error: any} = useNotifications()

  const {mutate: mutateNotificationStatus}: {mutate: KeyedMutator<boolean | undefined>} = useNotificationStatus()

  const {mutate: mutateCurrentUser}: {mutate: KeyedMutator<UserBasic | undefined>} = useCurrentUser()

  const onDelete = async () => {

    setIsLoading(true)

    try {
      await deleteNotifications()
      toast.success("Notifications were deleted.")
      mutateNotifications()
    }

    catch(err) {
      toast.error("Sorry, there was an error.")
    }

    finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {

    const updateNotification = async () => {
      
      try {
        await updateNotificationAlert()
        mutateNotificationStatus()
        mutateCurrentUser()
      }

      catch(err) {
        console.error("error updating the notifications alert.")
      }
    }

    updateNotification()

  }, [])



  return (
    <MainLayout
      pageBanner="Notifications"
      back
    >
      <main
        style={{paddingBlock: "1.8rem", display: "flex", flexDirection: "column", gap: "1rem"}}
      >

        {isLoadingNotifications && (
          <FeedLoader 
            msg="Loading notifications" 
          />
        )}

        {!isLoadingNotifications && errorNotifications && (
          <ErrorMsg
            msg="Error fetching notifications. Please try refreshing the page."
          />
        )}

        {!isLoadingNotifications && notifications?.length === 0 && (
            <span
              style={{fontSize: "var(--fs-500)"}}
            >
              No notifications available.
            </span>
        )}

        {(notifications?.length ?? 0) > 0 && (
            <div
              style={{alignSelf: "flex-end"}}
            >
              <Button
                label="Delete Notifications"
                onClick={onDelete}
                disabled={isLoading}
                isLoading={isLoading}
              />
            </div>
          )}

        {!isLoadingNotifications && (notifications?.length ?? 0) > 0 && notifications?.map(notification => (
          <Card
            key={notification?.id}
          >
            <span>@{notification?.title}</span>
          </Card>
          ))}
      </main>
    </MainLayout>
  )
}

export default NotificationsPage