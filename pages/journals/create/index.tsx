
import type { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth/next'

import authOptions from '@/libs/authOptions'
import MainLayout from '@/components/layouts/MainLayout/MainLayout'
import JournalComposer from '@/components/postComposer/JournalComposer/JournalComposer'


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



const JournalCreationPage = () => {

  return (
    <MainLayout>
      <main>
        <JournalComposer />
      </main>
    </MainLayout>
  )
}

export default JournalCreationPage