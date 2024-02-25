
import {Home, BellRing, Bookmark} from 'lucide-react'

export const siteConfig = {
  title: "WanderConnect",

  description:
    "Discover the world together on wanderConnect.com - the ultimate social hub for travelers! Share your adventures, connect with like-minded explorers, and fuel your wanderlust. Join us now!",

}


export const leftSidebarItems = [

  {
    id: "home",
    icon: Home,
    href: "/",
    label: "Home"
  },

  {
    id: "bell",
    icon: BellRing,
    href: "/notifications",
    label: "Notifications"
  },

  {
    id: "bookmarks",
    icon: Bookmark,
    href: "/bookmarks",
    label: "Bookmarks"
  }

]

