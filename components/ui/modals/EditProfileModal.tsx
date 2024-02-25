
import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import type {KeyedMutator} from 'swr'

import type {User, UserBasic} from '@/libs/types'
import {closeEditProfileModal} from '@/redux/slices/modalSlice'
import useCurrentUserDetailed from '@/hooks/useCurrentUserDetailed'
import useCurrentUser from '@/hooks/useCurrentUser'
import useBasicUserInfo from '@/hooks/useBasicUserInfo'
import useUser from '@/hooks/useUser'
import useUserImage from '@/hooks/useUserImage'
import useUserImages from '@/hooks/useUserImages'
import onImageSelect from '@/libs/helpers/imageSelect'
import Modal from './Modal/Modal'
import Form from '../Form/Form'
import {UserProfileHeader} from '../../user/UserProfile/UserProfile'
import Input from '../Input/Input'

const EditProfileModal = () => {

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [about, setAbout] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)


  const {data: currentUserDetailed}: {data: User | undefined} = useCurrentUserDetailed()

  const {mutate: mutateCurrentUser}: {mutate: KeyedMutator<UserBasic | undefined>} = useCurrentUser()

  const {mutate: mutateUser}: {mutate: KeyedMutator<User | undefined>} = useUser(currentUserDetailed?.id ?? "")

  const {mutate: mutateUserBasic}: {mutate: KeyedMutator<UserBasic | undefined>} = useBasicUserInfo(currentUserDetailed?.id ?? "")

  const {mutate: mutateCurrentUserProfileImage}: {mutate: KeyedMutator<string | undefined>} = useUserImage(currentUserDetailed?.id ?? "", "profileImage")

  const {data: currentUserImages, mutate: mutateCurrentUserImages}: {data: {
    profileImage: string;
    coverImage: string;
} | undefined, mutate: KeyedMutator<{
  profileImage: string;
  coverImage: string;
} | undefined>} = useUserImages(currentUserDetailed?.id ?? "")

  const dispatch = useDispatch()


  useEffect(() => {

    setName(currentUserDetailed?.name || "")
    setUsername(currentUserDetailed?.username || "")
    setAbout(currentUserDetailed?.about || "")
    setCoverImage(currentUserImages?.coverImage || "")
    setProfileImage(currentUserImages?.profileImage || "")
  }, [currentUserDetailed?.name, currentUserDetailed?.username, currentUserDetailed?.about, currentUserImages?.coverImage, currentUserImages?.profileImage])


  const onModalClose = () => dispatch(closeEditProfileModal())


  const onUpdate = async () => {

    if (!name.trim() || !username.trim()) {
      toast.error("Name or Username can't be empty.", {id: "emptyFields"})
      return
    }

    setIsSubmitting(true)

    try {

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/editProfile`, {
        name,
        username,
        about,
        coverImage,
        profileImage
      })

      toast.success("Profile updated.")

      onModalClose()

      mutateCurrentUser()
      mutateUser()
      mutateUserBasic()
      mutateCurrentUserProfileImage()
      mutateCurrentUserImages()
    }

    catch(err) {
      toast.error("Sorry, there was an error.")
    }

    finally {
      setIsSubmitting(false)
    }
  }

    return (

      <Modal
        maxWidth="35rem"
        onClose={onModalClose}
      >
        <Form
          onCTA={onUpdate}
          disabled={isSubmitting || !name.trim() || !username.trim()}
          isSubmitting={isSubmitting}
          buttonStyles={{"backgroundColor": "hsl(var(--clr-neutral-dark))", color: "hsl(var(--clr-neutral-light))"}}
          buttonLoaderColor="hsl(var(--clr-neutral-light))"
        >
          <div
            className="mb-4"
          >
            <UserProfileHeader
              coverImage={coverImage} 
              profileImage={profileImage}
              selectable
              onCoverImageSelect={(image) => onImageSelect(image, setCoverImage)}
              onProfileImageSelect={(image) => onImageSelect(image, setProfileImage)}
            />
          </div>

          <Input
            placeholder="Name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            disabled={isSubmitting}
            applyBorder
            customStyles={{backgroundColor: "transparent", color: "hsl(var(--clr-neutral-dark))"}}
          />

          <Input
            placeholder="Username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            disabled={isSubmitting}
            applyBorder
            customStyles={{backgroundColor: "transparent", color: "hsl(var(--clr-neutral-dark))"}}
          />

          <Input
            type="textarea"
            placeholder="about"
            value={about}
            onTextAreaChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAbout(e.target.value)}
            disabled={isSubmitting}
            applyBorder
            customStyles={{backgroundColor: "transparent", color: "hsl(var(--clr-neutral-dark))", overflowY: "auto"}}
          />
        </Form>
      </Modal>
    )
}

export default EditProfileModal