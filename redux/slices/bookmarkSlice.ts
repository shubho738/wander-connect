
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchBookmarks = createAsyncThunk(
  'bookmark/fetchBookmarks',
  async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bookmark`)
      return response.data
    } 

    catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error("Failed to fetch bookmarks: " + err.message)
      } 
      
      else {
        throw new Error("Unexpected error while fetching bookmarks.")
      }
    }
  }
)

export interface BookmarkState {
  bookmarkedStatusList: string[];
  bookmarksLoading: boolean;
}

const initialState: BookmarkState = {
  bookmarkedStatusList: [],
  bookmarksLoading: false,
}

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.bookmarkedStatusList.push(action.payload)
    },
    removeBookmark: (state, action) => {
      state.bookmarkedStatusList = state.bookmarkedStatusList.filter(id => id !== action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBookmarks.pending, state => {
        state.bookmarksLoading = true
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.bookmarkedStatusList = action.payload
        state.bookmarksLoading = false
      })
      .addCase(fetchBookmarks.rejected, state => {
        state.bookmarksLoading = false
        
      })
  },
})

export const { addBookmark, removeBookmark } = bookmarkSlice.actions
export default bookmarkSlice.reducer
