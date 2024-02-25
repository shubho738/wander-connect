
import { useDispatch } from 'react-redux'
import {useRouter} from 'next/router'

import type {User, UserBasic} from '@/libs/types'
import { openEditProfileModal } from '@/redux/slices/modalSlice'
import useUser from '@/hooks/useUser'
import useUserImages from '@/hooks/useUserImages'
import useCurrentUser from '@/hooks/useCurrentUser'
import {getFormattedMonthYear} from '@/hooks/useDate'
import FeedLoader from '../../ui/loaders/FeedLoader'
import ErrorMsg from '@/components/ui/ErrorMsg/ErrorMsg'
import ImageUpload from '../../ui/ImageUpload/ImageUpload'
import FollowButton from '../../ui/FollowButton/FollowButton'
import Button from '../../ui/Button/Button'
import ImageView from '../../ui/ImageView/ImageView'
import UserThumbnail from '../UserThumbnail/UserThumbnail'
import styles from './UserProfile.module.scss'


interface UserProfileHeaderProps {
  coverImage: string;
  profileImage: string;
  isLoadingImages?: boolean;
  selectable?: boolean;
  onCoverImageSelect?(image: File): void;
  onProfileImageSelect?(image: File): void;
}

export const UserProfileHeader = ({coverImage, profileImage, isLoadingImages, selectable, onCoverImageSelect = () => {}, onProfileImageSelect = () => {}}: UserProfileHeaderProps) => {

  if (selectable) {

    return (
        <header
         className={styles["profile-header"]}
        >
          <ImageUpload
            onSelectFile={onCoverImageSelect}
          >
            <ImageView
              imageSrc={coverImage}
              imageAlt="cover image"
              isLoading={isLoadingImages}
              customContainerStyles={{height: "12.5rem"}}
              customImageStyles={{objectFit: "cover"}}
            />
          </ImageUpload>
          
          <ImageUpload
            onSelectFile={onProfileImageSelect}
          >
            <div
              className={styles["profile-header__profile-img"]}
            >
              <UserThumbnail
                thumbnail={profileImage}
                size="10rem"
              />
            </div>
          </ImageUpload>
        </header>
      )
  }

  return (
    <header
     className={styles["profile-header"]}
    >
      <ImageView
        imageSrc={coverImage}
        imageAlt="cover image"
        isLoading={isLoadingImages}
        customImageStyles={{objectFit: "cover"}}
      />
      <div
        className={styles["profile-header__profile-img"]}
      >
        <UserThumbnail
          thumbnail={profileImage}
          size="9rem"
        />
      </div>
    </header>
    )
}


interface UserProfileInfoProps {
  userId: string;
  user?: User;
  isError?: boolean;
  isLoading?: boolean;
}

const UserProfileInfo = ({userId, user, isError, isLoading}: UserProfileInfoProps) => {

  const {data: currentUser}: {data: UserBasic | undefined} = useCurrentUser()

  const joined = getFormattedMonthYear(user?.createdAt ?? "")

  const dispatch = useDispatch()

  const router = useRouter()


  const onCTA = () => {

    if (currentUser?.id === userId) {
      dispatch(openEditProfileModal())
      return
    }
    router.push("/login")
  }


  return (
    <div
      className={styles["profile-info"]}
    >
      <div
        className={styles["profile-info__cta"]}
      >
        {userId === currentUser?.id ? (
          <Button
            label="Edit Profile"
            onClick={onCTA}
          />
          ) : (
          <FollowButton 
            userId={userId}
          />
          )}
      </div>

      <div
        style={{"--space-y-gap": ".5rem"} as React.CSSProperties}
        className={`space-y |  ${styles["profile-info__content"]}`}
      >

        {isLoading && !isError && (
          <FeedLoader
            msg="Loading user info" 
          />
        )}

        {isError && (
          <ErrorMsg 
            msg="Couldn't fetch user info. Try refreshing the page."
          />
        )}

        {user && !isError && (
          <>
            <div
              style={{"--gap-y": "0"} as React.CSSProperties}
              className="flex-col"
            >
              <span>{user?.name}</span>
              <span
                className="text-neutral-md"
              >
                @{user?.username}
              </span>
            </div>

              <span>{user?.about}</span>

              <span
                className="text-neutral-md"
              >
                Joined {joined}
              </span>

            <div
              className="flex-row"
            >
              <span>{user?.followingIds?.length} Following</span>
              <span>{user?.numberOfFollowers} Followers</span>
            </div>
          </>
        )}

      </div>

    </div>
    )
}



interface UserProfileProps {
  userId: string;
}


const UserProfile = ({userId}: UserProfileProps) => {

  const {data: user, isLoading: isLoadingUserInfo, error: errorUserInfo}: {data: User | undefined, isLoading: boolean, error: any} = useUser(userId)

  const {data: userImages, isLoading: isLoadingUserImages}: {data: {profileImage: string, coverImage: string} | undefined, isLoading: boolean} = useUserImages(userId)

  return (
    <section
      className={styles["profile"]}
    >
      <UserProfileHeader
        coverImage={userImages?.coverImage ?? ""}
        profileImage={userImages?.profileImage ?? ""}
        isLoadingImages={isLoadingUserImages}
      />

      <UserProfileInfo
        userId={userId}
        user={user}
        isError={errorUserInfo ? true : false}
        isLoading={isLoadingUserInfo}
      />

    </section>
  )
}

export default UserProfile