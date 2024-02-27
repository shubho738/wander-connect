
import useFollow from '@/hooks/useFollow'
import Button from '../Button/Button'

interface FollowButtonProps {
  userId: string;
  customStyles?: React.CSSProperties;
  loaderColor?: string;
}

const FollowButton = ({userId, customStyles, loaderColor}: FollowButtonProps) => {

  const {toggleFollow, isFollowed, isPending}: {toggleFollow: () => Promise<void>, isFollowed: boolean, isPending: boolean} = useFollow(userId)


  const onFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {

    e.stopPropagation()

    await toggleFollow()
  }

  return (
    <Button
      checkAuth
      label={isFollowed ? "Unfollow" : "Follow"}
      onClick={onFollow}
      disabled={isPending}
      isLoading={isPending}
      customStyles={{...customStyles, minWidth: "8.6rem"}}
      loaderColor={loaderColor}
    />

  )
}

export default FollowButton