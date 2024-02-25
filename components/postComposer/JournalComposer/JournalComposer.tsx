
import {useState} from 'react'
import axios from 'axios'
import {X, MapPin, Image as ImageIcon} from 'lucide-react'
import toast from 'react-hot-toast'
import type { KeyedMutator } from 'swr'
import { useQueryClient } from '@tanstack/react-query'

import useJournalIds from '@/hooks/useJournalIds'
import Input from '../../ui/Input/Input'
import ClickableIcon from '../../ui/ClickableIcon/ClickableIcon'
import ImageUpload from '../../ui/ImageUpload/ImageUpload'
import ImageView from '../../ui/ImageView/ImageView'
import Button from '../../ui/Button/Button'
import Card from '../../ui/Card/Card'
import Tooltip from '../../ui/Tooltip/Tooltip'
import styles from './JournalComposer.module.scss'


interface JournalComposerProps {
  customStyles?: React.CSSProperties
}


const JournalComposer = ({customStyles}: JournalComposerProps) => {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
  const [location, setLocation] = useState("")
  const [showLocationInput, setShowLocationInput] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {mutate: mutateJournalIds}: {mutate: KeyedMutator<Record<"id", string>[] | undefined>} = useJournalIds()

  const queryClient = useQueryClient()

  const onJournalPost = async () => {

    if (!title.trim() || !content.trim()) {
      toast.error("Title or Content can't be empty.", {id: "emptyFields"})
    }

    if (title.length > 60) {
      toast.error("Title exceeds 60 character limit.", {id: "titleTooLong"})
      return
    }

    setIsSubmitting(true)

    try {
      
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/journals`, {
        title,
        content,
        image,
        location
      })

      toast.success("Journal created. ")

      mutateJournalIds()
      queryClient.invalidateQueries( {queryKey: ["journalIds"]})

      setTitle("")
      setContent("")
      setImage("")
      setLocation("")
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
        setImage(event.target.result)
      }
    }

    reader.readAsDataURL(image)
  }

  const onClearImagePreview = () => setImage("")

  const onToggleLocationInput = () => setShowLocationInput(prev => !prev)


  return (
   <Card
     customStyles={customStyles}
   >
    <div
      className={styles["journal-form"]}
    >
      <div
        className={styles["journal-form__header"]}
      >

      <Input
        placeholder="Title" 
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setTitle(e.target.value)}
        disabled={isSubmitting}
        customStyles={{width: "100%"}}
      />

      <Input
        key={isSubmitting ? 'submitting' : 'not-submitting'}
        type="textarea"
        placeholder="Share your experience." 
        value={content}
        onTextAreaChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => setContent(e.target.value)}
        disabled={isSubmitting}
        customStyles={{width: "100%"}}
      />
      </div>

      {image && (
        <div
          className={styles["journal-form__image-preview"]}
        >
          <ImageView
            imageSrc={image} 
            imageAlt="journal image preview"
          />

          
          <ClickableIcon
            icon={X}
            onClick={onClearImagePreview}
          />
         
        </div>
        )}

      <div
        className={styles["journal-form__footer"]}
      >
        <div
          className={styles["journal-form__additional-inputs"]}
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
            className={styles["journal-form__location"]}
          >
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
               className={`${styles['journal-form__location-input']} ${showLocationInput ? styles['slide'] : styles['hidden']}`}
              >
              <Input
                placeholder="Location" 
                value={location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setLocation(e.target.value)}
                disabled={isSubmitting}
                customStyles={{border: "1px solid hsl(var(--clr-border))"}}
                fullWidth
              />
             </div>
          </div>
         </div>

        <div>
          <Button
            label="Publish"
            onClick={onJournalPost}
            disabled={isSubmitting || !title.trim() || !content.trim()}
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </div>
   </Card>
   
  )
}

export default JournalComposer