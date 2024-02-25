
import { createSlice } from '@reduxjs/toolkit'

export interface  ModalState{
  isEditProfileModalOpen: boolean;
}

const initialState: ModalState = {
  isEditProfileModalOpen: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openEditProfileModal: (state) => {
      state.isEditProfileModalOpen = true
    },
    closeEditProfileModal: (state) => {
      state.isEditProfileModalOpen = false
    }
  }
})

export const { openEditProfileModal, closeEditProfileModal } = modalSlice.actions
export default modalSlice.reducer
