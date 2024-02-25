
import {useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import {X, MapPin, Image as ImageIcon} from 'lucide-react'

import type { UserBasic } from '@/libs/types'
import useCurrentUser from '@/hooks/useCurrentUser'
import UserThumbnail from '../../user/UserThumbnail/UserThumbnail'
import Input from '../../ui/Input/Input'
import ClickableIcon from '../../ui/ClickableIcon/ClickableIcon'
import ImageUpload from '../../ui/ImageUpload/ImageUpload'
import ImageView from '../../ui/ImageView/ImageView'
import Button from '../../ui/Button/Button'
import Card from '../../ui/Card/Card'
import Tooltip from '../../ui/Tooltip/Tooltip'
import styles from './StatusComposer.module.scss'


interface StatusComposerProps {
  customStyles?: React.CSSProperties;
}


const StatusComposer = ({customStyles}: StatusComposerProps) => {

  const [statusText, setStatusText] = useState("")
  const [statusImage, setStatusImage] = useState("")
  const [statusLocation, setStatusLocation] = useState("")
  const [showLocationInput, setShowLocationInput] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)


  const {data: currentUser}: {data: UserBasic | undefined} = useCurrentUser()

  const queryClient = useQueryClient()


  const onStatusPost = async () => {

    if (!statusText.trim()) {
      toast.error("Status text can't be empty.", {id: "emptyStatusText"})
      return
    }

    setIsSubmitting(true)

    try {

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/status`, {
        text: statusText,
        image: statusImage,
        location: statusLocation
      })

      toast.success("Status posted.")

      queryClient.invalidateQueries( {queryKey: ["statusIds"]})

      setStatusImage("")
      setStatusText("")
      setStatusLocation("")
      setShowLocationInput(false)
    }

    catch(err) {
      toast.error("Sorry, there was an error.")
    }

    finally {
      setIsSubmitting(false)
    }
  }

  const onImageSelect = (image: File) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        setStatusImage(event.target.result)
      }
    }

    reader.readAsDataURL(image)
  }

  const onClearImagePreview = () => setStatusImage("")

  const onToggleLocationInput = () => setShowLocationInput(prev => !prev)


  return (
   <Card
     customStyles={customStyles}
   >
    <div
      className={styles["status-form"]}
    >
      <div
        className={styles["status-form__header"]}
      >
        <div>
          <UserThumbnail
            userId={currentUser?.id}
          />
        </div>
        <Input
          key={isSubmitting ? 'submitting' : 'not-submitting'}
          type="textarea"
          placeholder="What's on your mind?" 
          value={statusText}
          onTextAreaChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => setStatusText(e.target.value)}
          disabled={isSubmitting}
          customStyles={{width: "100%"}}
        />
      </div>

      {statusImage && (
        <div
          className={styles["status-form__image-preview"]}
        >
          <ImageView
            imageSrc={statusImage} 
            imageAlt="status image preview"
          />

          <ClickableIcon
            icon={X}
            onClick={onClearImagePreview}
          />
         
        </div>
        )}

      <div
        className={styles["status-form__footer"]}
      >
        <div
          className={styles["status-form__additional-inputs"]}
        >
          <Tooltip
            text="image"
          >
            <ImageUpload
              onSelectFile={onImageSelect}
            >
              <ImageIcon
                size={20}
              />
            </ImageUpload>
          </Tooltip>
          <div
            className={styles["status-form__location"]}>
            <Tooltip
              text="location"
            >
              <ClickableIcon
                icon={MapPin}
                size={20}
                onClick={onToggleLocationInput}
              />
            </Tooltip>
             <div
               className={`${styles['status-form__location-input']} ${showLocationInput ? styles['slide'] : styles['hidden']}`}
              >
              <Input
                placeholder="Location" 
                value={statusLocation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setStatusLocation(e.target.value)}
                disabled={isSubmitting}
                customStyles={{border: "1px solid hsl(var(--clr-border))"}}
                fullWidth
              />
             </div>
          </div>
         </div>

        <div>
          <Button
            checkAuth
            label="Connect"
            onClick={onStatusPost}
            disabled={isSubmitting || !statusText.trim()}
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </div>
   </Card>
   
  )
}

export default StatusComposer