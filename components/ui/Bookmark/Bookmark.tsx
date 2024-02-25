
import {Bookmark as BookmarkIcon} from 'lucide-react'

import useBookmark from '@/hooks/useBookmark'
import ClickableIcon from '../ClickableIcon/ClickableIcon'
import Loader from '../loaders/Loader'

interface BookmarkProps {
  statusId: string;
}


const Bookmark = ({statusId}: BookmarkProps) => {

  const {toggleBookmark, isBookmarked, isPending}: {toggleBookmark: () => Promise<void>, isBookmarked: boolean, isPending: boolean} = useBookmark(statusId)


  const onBookmark = async (e: React.MouseEvent<HTMLDivElement>) => {

    e.stopPropagation()

    await toggleBookmark()
  }

  if (isPending) return <Loader />

  return (
    <ClickableIcon
      checkAuth
      onClick={onBookmark}
      icon={BookmarkIcon}
      size={22}
      color={isBookmarked ?  "hsl(var(--clr-accent-secondary))" : "hsl(var(--clr-foreground))"}
    />
    )
}

export default Bookmark