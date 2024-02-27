
import {useState} from 'react'
import axios from "axios"
import {useSelector, useDispatch} from 'react-redux'
import toast from 'react-hot-toast'
import type {KeyedMutator} from 'swr'

import type { RootState } from '@/redux/store'
import type {User, UserBasic} from '@/libs/types'
import useUser from '@/hooks/useUser'
import useCurrentUser from '@/hooks/useCurrentUser'
import {addFollow, removeFollow} from '@/redux/slices/followSlice'

interface fnReturnType {
  toggleFollow: () => Promise<void>;
  isFollowed: boolean;
  isPending: boolean;
}

const useFollow = (userId: string): fnReturnType => {

  const [isPending, setIsPending] = useState(false)

  const {data: currentUser}: {data: UserBasic | undefined} = useCurrentUser()

  const {mutate: mutateFollowedUser}: {mutate: KeyedMutator<User | undefined>} = useUser(userId)
  const {mutate: mutateFollowingUser}: {mutate: KeyedMutator<User | undefined>} = useUser(currentUser?.id ?? "")

   const followedUsers: string[] = useSelector((state: RootState) => state.follow.followedUsers)


  const dispatch = useDispatch()


  const isFollowed: boolean = followedUsers?.includes(userId) ?? false


  const toggleFollow = async () => {

    setIsPending(true)

    try {

      if (!isFollowed) {

        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/follow`, {userId})
        dispatch(addFollow(userId))

        setIsPending(false)

        toast.success("You are now following the user.")

        mutateFollowedUser()
        mutateFollowingUser()

        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, {
          userId,
          title: `${currentUser?.username} followed you.`
        })
      }

      else {

        await  axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/follow?userId=${userId}`)
        dispatch(removeFollow(userId))

        setIsPending(false)

        toast.success("You unfollowed the user.")
        
        mutateFollowedUser()
        mutateFollowingUser()
      }

    } 

    catch(err) {
      setIsPending(false)
      toast.error("Sorry, there was an error.")
    } 
  }

  return {
    toggleFollow,
    isFollowed,
    isPending
  }
}

export default useFollow