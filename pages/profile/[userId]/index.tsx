
import type { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth/next'

import authOptions from '@/libs/authOptions'
import MainLayout from '@/components/layouts/MainLayout/MainLayout'
import UserProfile from '@/components/user/UserProfile/UserProfile'
import StatusFeed from '@/components/feeds/StatusFeed/StatusFeed'


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

  const {userId} = context.query

  return {
    props: {
      userId
    },
  }
  
}


interface ProfilePageProps {
  userId: string;
}


const ProfilePage = ({userId}: ProfilePageProps) => {

  
  return (
    <MainLayout
      pageBanner="Profile"
      back
    >
      <main
        className="space-y"
      >
        <UserProfile
          userId={userId}
        />
        <StatusFeed
          userId={userId} 
        />
      </main>
    </MainLayout>
  )
}

export default ProfilePage