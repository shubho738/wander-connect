
import React from 'react'

import MainLayout from '@/components/layouts/MainLayout/MainLayout'
import StatusComposer from '@/components/postComposer/StatusComposer/StatusComposer'
import StatusFeed from '@/components/feeds/StatusFeed/StatusFeed'


export default function Home() {
  
  return (

    <MainLayout
      pageBanner="Home"
    >
      <main>
        <StatusComposer />
        <StatusFeed />
      </main>
    </MainLayout>
  )
}
