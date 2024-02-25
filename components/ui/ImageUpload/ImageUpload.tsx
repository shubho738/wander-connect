
import React from 'react'

interface ImageUploadProps {
  onSelectFile: (file: File) => void;
  children: React.ReactNode;
}

const ImageUpload = ({ onSelectFile, children }: ImageUploadProps) => {

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0]

    if (selectedFile) {
      onSelectFile(selectedFile)
    }
  }


  const onClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
      fileInputRef.current.click()
    }
  }

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={onFileSelect}
      />
     
      <div
        onClick={onClick}
        style={{cursor: "pointer"}}
      >
       {children}
      </div>
    </>
  )
}

export default ImageUpload
