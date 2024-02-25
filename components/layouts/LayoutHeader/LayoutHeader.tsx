
import Link from 'next/link'
import {Bell} from 'lucide-react'

import type {UserBasic} from '@/libs/types'
import useCurrentUser from '@/hooks/useCurrentUser'
import useNotificationStatus from '@/hooks/useNotificationStatus'
import TextLoader from '../../ui/loaders/TextLoader'
import IconContainer from '../../ui/IconContainer/IconContainer'
import PageBanner from '../../ui/PageBanner/PageBanner'
import UserThumbnail from '../../user/UserThumbnail/UserThumbnail'
import Button from '../../ui/Button/Button'
import styles from './LayoutHeader.module.scss'

interface LayoutHeaderProps {
  pageBanner: string;
  back?: boolean;
}

const LayoutHeader = ({pageBanner, back}: LayoutHeaderProps) => {

  const {data: currentUser}: {data: UserBasic | undefined} = useCurrentUser()

  const {data: hasNotifications}: {data: boolean | undefined} = useNotificationStatus()


  return (
    <header
      className={styles["header"]}
    >
      <PageBanner
        label={pageBanner}
        back={back}
      />

      <div
        className={styles["header__nav-wrapper"]}
      >
        <div
          className={styles["header__nav"]}
        >
          {currentUser ? (
            <>
              <Link
                href="/notifications"
                className={styles["header__notifications"]}
              >
                <IconContainer
                  icon={Bell}
                  color="hsl(var(--clr-background))"
                  size="18"
                />

                {hasNotifications && (
                  <div
                    className={styles["header__notifications-alert"]}
                  />
                  )}
              </Link>

              <div
                className={styles["header__user"]}
              >
                {currentUser?.username ? (
                  <span
                    className={styles["header__name"]}
                  >
                    {currentUser?.username}
                  </span>
                  ) : (
                  <TextLoader />
                  )}

                <UserThumbnail
                  userId={currentUser?.id}
                  goToProfile
                />
              </div>
            </>
            ) : (
              <Button
                label="Login"
                href="/login"
              />
            )}
        </div>
      </div>

      
    </header>
  )
}

export default LayoutHeader