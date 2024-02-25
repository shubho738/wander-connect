
import { configureStore } from '@reduxjs/toolkit'
import modalReducer, {type ModalState} from './slices/modalSlice'
import bookmarkReducer, {type BookmarkState, fetchBookmarks} from './slices/bookmarkSlice'
import followReducer, {type FollowState, fetchFollowedUsers} from './slices/followSlice'

const store = configureStore({
  reducer: {
    modal: modalReducer,
    bookmark: bookmarkReducer,
    follow: followReducer
  },
})

store.dispatch(fetchBookmarks())
store.dispatch(fetchFollowedUsers())

export type RootState = {
  modal: ModalState,
  bookmark: BookmarkState,
  follow: FollowState
}

export default store
