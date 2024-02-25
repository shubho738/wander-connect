
import {useState} from 'react'
import axios from "axios"
import {useSelector, useDispatch} from 'react-redux'
import toast from 'react-hot-toast'

import type {RootState} from '@/redux/store'
import {addBookmark, removeBookmark} from '@/redux/slices/bookmarkSlice'


interface fnReturnType {
  toggleBookmark: () => Promise<void>;
  isBookmarked: boolean;
  isPending: boolean;
}

const useBookmark = (statusId: string): fnReturnType => {

  const [isPending, setIsPending] = useState(false)

  // is an array of status Ids
  const bookmarkedStatusList: string[] = useSelector((state: RootState) => state.bookmark.bookmarkedStatusList)  

  const dispatch = useDispatch()


  const isBookmarked: boolean = bookmarkedStatusList.includes(statusId)


  const toggleBookmark = async () => {
    
    setIsPending(true)

    try {

      if (!isBookmarked) {

        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/bookmark`, {statusId})
        dispatch(addBookmark(statusId))

        toast.success("Bookmark added.")
      }

      else {

        await  axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/bookmark?statusId=${statusId}`)
        dispatch(removeBookmark(statusId))

        toast.success("Bookmark removed.")
      }
    } 

    catch(err) {
      toast.error("Sorry, there was an error.")
    } 

    finally {
      setIsPending(false)
    }
  }

  return {
    toggleBookmark,
    isBookmarked,
    isPending
  }
}

export default useBookmark