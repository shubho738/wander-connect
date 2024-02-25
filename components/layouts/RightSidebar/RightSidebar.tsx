
import {useRouter} from 'next/router'

import type {UserBasic, Journal, JournalBasic} from '@/libs/types'
import useJournalIds from '@/hooks/useJournalIds'
import useJournalBasic from '@/hooks/useJournalBasic'
import useFewUsers from '@/hooks/useFewUsers'
import useBasicUserInfo from '@/hooks/useBasicUserInfo'
import useCurrentUser from '@/hooks/useCurrentUser'
import FeedLoader from '../../ui/loaders/FeedLoader'
import ErrorMsg from '../../ui/ErrorMsg/ErrorMsg'
import UserThumbnail from '../../user/UserThumbnail/UserThumbnail'
import UsernameLink from '../../user/UsernameLink/UsernameLink'
import Card from '../../ui/Card/Card'
import Button from '../../ui/Button/Button'
import FollowButton from '../../ui/FollowButton/FollowButton'
import styles from './RightSidebar.module.scss'


interface JournalProps {
  journalId: string;
}

const Journal = ({journalId}: JournalProps) => {

  const {data: journal}: {data: JournalBasic | undefined} = useJournalBasic(journalId)

  const router = useRouter()

  return (
     <Card
       onClick={() => router.push(`/journals/${journal?.id}`)}
       hover
       hoverColor="hsl(var(--clr-hover-light))"
       customStyles={{border: "none", background: "hsl(var(--clr-neutral-light))", color: "hsl(var(--clr-neutral-dark))"}}
     >
      <div
        className={styles["journal"]}
      >
        <span
          className={styles["journal__title"]}
        >
          {journal?.title}
        </span>
        
        <UsernameLink
          userId={journal?.userId ?? ""}
        />
      </div>
     </Card>
    )
}


const Journals = () => {

  const {data: journalIds, isLoading: isLoadingJournalIds, error: errorJournalIds}: {data: Record<"id", string>[] | undefined, isLoading: boolean, error: any} = useJournalIds()


  const journals: Record<"id", string>[] | undefined = (journalIds?.length ?? 0) > 4 ? journalIds?.slice(0, 4) : journalIds 

  return (
   <Card
      customStyles={{background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(16,16,236,1) 0%, rgba(0,212,255,1) 100%)", color: "hsl(var(--clr-neutral-light))", padding: "1rem 1.5rem"}}
    >
    <div
      className={styles["journals"]}
    >
      <h3
        className={styles["journals__heading"]}
      >
        Recent Travel Journals
      </h3>

      {isLoadingJournalIds && (
          <FeedLoader 
            msg="Loading Journals" 
            color="hsl(var(--clr-neutral-light))"
          />
        )}

      {!isLoadingJournalIds && errorJournalIds && (
          <ErrorMsg
            msg="Error fetching journals."
          />
        )}

      {!isLoadingJournalIds && journals?.length === 0 && (
            <span
              style={{fontSize: "var(--fs-500)"}}
            >
              No journals available.
            </span>
        )}


      {!isLoadingJournalIds && (journals?.length ?? 0) > 0 && (
        <div
          className={styles["journals__items"]}
         >

          {journals?.map(journal => (
            <Journal
              key={journal.id}
              journalId={journal.id}
            />
            ))}
        </div>
        )}

      <Button
        label="See More"
        href="/journals"
        customStyles={{backgroundColor: "hsl(var(--clr-neutral-dark))", color: "hsl(var(--clr-neutral-light))"}}
      />

      <Button
        checkAuth
        label="Write a Journal"
        href="/journals/create"
        customStyles={{backgroundColor: "hsl(var(--clr-neutral-dark))", color: "hsl(var(--clr-neutral-light))"}}
      />
    </div>
   </Card>
    )
}



interface FollowItemProps {
  userId: string;
}

const FollowItem = ({userId}: FollowItemProps) => {

  const {data: user}: {data: UserBasic | undefined} = useBasicUserInfo(userId)

  const router = useRouter()

  return (
     <Card
       onClick={() => router.push(`/profile/${user?.id}`)}
       hover
       hoverColor="hsl(var(--clr-hover-light))"
       customStyles={{border: "none", background: "hsl(var(--clr-neutral-light))", color: "hsl(var(--clr-neutral-dark))"}}
     >
       <div
         className={styles["follow-item"]}
       >
         <div>
           <UserThumbnail
             userId={user?.id}
             goToProfile
           />
         </div>

         <div
           className={styles["follow-item__info"]}
         >
           <span
             className={styles["follow-item__user-name"]}
            >
              {user?.name}
            </span>
           <UsernameLink
             userId={user?.id ?? ""}
           />
         </div>

         <div
           className={styles["follow-item__cta"]}
         >
           <FollowButton
             userId={user?.id ?? ""}
             customStyles={{backgroundColor: "hsl(var(--clr-neutral-dark))", color: "hsl(var(--clr-neutral-light))"}}
             loaderColor="hsl(var(--clr-neutral-light))"
           />
         </div>
       </div>
     </Card>
    )
}



const FollowSuggestions = () => {

  const {data: currentUser}: {data: UserBasic | undefined} = useCurrentUser()
  const {data: usersList, isLoading: isLoadingUsers, error: errorUsers}: {data: Record<"id", string>[] | undefined, isLoading: boolean, error: any} = useFewUsers(5)

  let users: Record<"id", string>[] | undefined = usersList?.filter(user => user.id !== currentUser?.id)?.slice(0, 4)



  return (
    <Card
      customStyles={{background: "var(--clr-gradient-secondary)", color: "hsl(var(--clr-gradient-secondary-text))", padding: "1rem 1.5rem"}}
    >
      <div
        className={styles["follow"]}
      >
        <h3
          className={styles["follow__heading"]}
        >
          Folks you can follow
        </h3>

        {isLoadingUsers && (
            <FeedLoader 
              msg="Loading Users" 
              color="hsl(var(--clr-neutral-light))"
            />
          )}

        {!isLoadingUsers && errorUsers && (
            <ErrorMsg
              msg="Error fetching users."
            />
          )}

        {!isLoadingUsers && users?.length === 0 && (
              <span
                style={{fontSize: "var(--fs-500)"}}
              >
                No users available.
              </span>
          )}


        {!isLoadingUsers && (users?.length ?? 0) > 0 && (
          <div
            className={styles["follow__items"]}
           >
             {users?.map(user => (
                <FollowItem
                  key={user?.id}
                  userId={user?.id}
                />
                ))
              }
             
          </div>
          )}
          
      </div>

     </Card>
    )

}


interface RightSidebarProps {
  showLatestJournals?: boolean;
}


const RightSidebar = ({showLatestJournals}: RightSidebarProps) => {

  return (
   <div
     className={styles["right-sidebar"]}
  >
    <div
      className={styles["right-sidebar__content"]}
    >
      {showLatestJournals && <Journals />}
      <FollowSuggestions />
    </div>
  </div>
  )
}

export default RightSidebar