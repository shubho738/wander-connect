
import {useSelector} from 'react-redux'

import type { RootState } from '@/redux/store'
import EditProfileModal from './EditProfileModal'

const ModalManager = () => {

  const {isEditProfileModalOpen}: {isEditProfileModalOpen: boolean} = useSelector((state: RootState) => state.modal)
  

 if (isEditProfileModalOpen) return <EditProfileModal />

}

export default ModalManager