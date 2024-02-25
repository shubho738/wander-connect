
import Link from 'next/link'
import {User2, LogIn} from 'lucide-react'

import type { IconType, UserBasic } from '@/libs/types'
import {leftSidebarItems} from '@/config/site'
import useCurrentUser from '@/hooks/useCurrentUser'
import Logo from '../../Logo/Logo'
import Tooltip from '../../ui/Tooltip/Tooltip'
import Logout from '../../ui/Logout/Logout'
import ModeToggle from '../../ui/ModeToggle/ModeToggle'
import styles from './LeftSidebar.module.scss'


interface LeftSidebarItemProps {

  icon: IconType;
  href: string;
  label: string;
}

const LeftSidebarItem = ({icon: Icon, href, label}: LeftSidebarItemProps) => {

  return (
    <Link
      href={href}
      className={styles["sidebar-item"]}
    >
      <Tooltip
        text={label}
        customContainerStyles={{fontSize: "var(--fs-400)"}}
        customContentStyles={{padding: ".2rem .7rem"}}
      >
        <Icon
          size={26} 
          color="hsl(var(--clr-neutral-light))"
        />
      </Tooltip>
    </Link>
    )

}


const LeftSidebar = () => {

  const {data: currentUser}: {data: UserBasic | undefined} = useCurrentUser()
  

  return (
    <div
      className={styles["left-sidebar"]}
    >
     <div
       className={styles["left-sidebar__logo"]}
      >
        <Logo />
     </div>

      <div
        className={styles["left-sidebar__items"]}
      >

        {leftSidebarItems?.map(item => (
          <LeftSidebarItem
            key={item.id} 
            {...item}
          />
          ))}

      <LeftSidebarItem
        icon={User2}
        href={`/profile/${currentUser?.id}`}
        label="Profile"
      />
      
      <Tooltip
        text={currentUser ? "Logout" : "Login"}
        customContainerStyles={{fontSize: "var(--fs-400)"}}
        customContentStyles={{padding: ".2rem .7rem"}}
      >
        {currentUser ? (
          <Logout
            color="hsl(var(--clr-neutral-light))"
            size={26}
          />
          ) : (
          <Link
            href="/login"
          >
            <LogIn
              size={26} 
              color="hsl(var(--clr-neutral-light))"
              style={{marginRight: ".5rem"}}
            />
          </Link>
          )}
      </Tooltip>

      <div
        style={{marginRight: ".5rem"}}
      >
        <ModeToggle />
      </div>
    </div>

    </div>
  )
}

export default LeftSidebar