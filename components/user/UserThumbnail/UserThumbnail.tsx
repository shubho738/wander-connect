
import Image from 'next/image'
import Link from 'next/link'

import useUserImage from '@/hooks/useUserImage'
import styles from './UserThumbnail.module.scss'


interface UserThumbnailProps {
  userId?: string;
  thumbnail?: string;
  size?: string;
  goToProfile?: boolean;
}


const UserThumbnail = ({userId, thumbnail, size, goToProfile}: UserThumbnailProps) => {

  const {data: profileImage}: {data: string | undefined} = useUserImage(userId ?? "", "profileImage")

  const thumbnailClassName = goToProfile ? `${styles.thumbnail} ${styles.hoverStyles}` : styles.thumbnail

  if (!goToProfile) {

    return (
      <div
        style={{"--thumbnail-size": size} as React.CSSProperties}
        className={thumbnailClassName}
      >
        <Image
          src={thumbnail || profileImage || '/user.png'}
          alt="user profile image"
          fill
          className={styles["thumbnail__image"]}
        />
      </div>
      )
  }

  return (
    <Link
      href={`/profile/${userId}`}
    >
      <div
        style={{"--thumbnail-size": size} as React.CSSProperties}
        className={thumbnailClassName}
      >
        <Image
          src={thumbnail || profileImage || '/user.png'}
          alt="user profile image"
          fill
          className={styles["thumbnail__image"]}
        />
      </div>
    </Link>
  )
}

export default UserThumbnail