
import MainLayout from '@/components/layouts/MainLayout/MainLayout'
import JournalsFeed from '@/components/feeds/JournalsFeed/JournalsFeed'
import Button from '@/components/ui/Button/Button'



const JournalsPage = () => {


  return (
    <MainLayout
      pageBanner="Travel Journals"
      showLatestJournals={false}
      back
    >
      <main>

        <div
          style={{marginBlockEnd: "2rem"}}
        >
          <Button
            href="/journals/create"
            label="Write a Journal"
          />
        </div>

        <JournalsFeed />
      </main>
    </MainLayout>
  )
}

export default JournalsPage