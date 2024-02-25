
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchFollowedUsers = createAsyncThunk(
  'follow/fetchFollowedUsers',
  async () => {

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/follow`)
      return response.data
    } 

    catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error("Failed to fetch followed users: " + err.message)
      } 
      
      else {
        throw new Error("Unexpected error while fetching followed users.")
      }
    }
  }
)


export interface FollowState {
  followedUsers: string[];
  followedUsersLoading: boolean;
}

const initialState: FollowState = {
  followedUsers: [],
  followedUsersLoading: false,
}

const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {
    addFollow: (state, action) => {
      state.followedUsers.push(action.payload)
    },
    removeFollow: (state, action) => {
      state.followedUsers = state.followedUsers.filter(id => id !== action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFollowedUsers.pending, state => {
        state.followedUsersLoading = true
      })
      .addCase(fetchFollowedUsers.fulfilled, (state, action) => {
        state.followedUsers = action.payload
        state.followedUsersLoading = false
      })
      .addCase(fetchFollowedUsers.rejected, state => {
        state.followedUsersLoading = false
        
      })
  },
})

export const { addFollow, removeFollow } = followSlice.actions
export default followSlice.reducer
