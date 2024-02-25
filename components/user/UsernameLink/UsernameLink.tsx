
import Link from 'next/link'

import type {UserBasic} from '@/libs/types'
import useBasicUserInfo from '@/hooks/useBasicUserInfo'
import styles from './UsernameLink.module.scss'

interface UsernameLinkProps {
  userId: string;
}

const UsernameLink = ({userId}: UsernameLinkProps) => {

  const {data: basicUserInfo}: {data: UserBasic | undefined} = useBasicUserInfo(userId)

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
  }

  return (
    <Link 
      onClick={onClick}
      href={`/profile/${userId}`}
      className={styles["username-link"]}
    >
      <span
        className={styles["username-link__username"]}
      >
        @{basicUserInfo?.username}
      </span>
    </Link>
  )
}

export default UsernameLink