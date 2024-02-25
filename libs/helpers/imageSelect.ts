
const onImageSelect = (image: File, setImageFunction: (value: string) => void) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        setImageFunction(event.target.result)
      }
    }

    reader.readAsDataURL(image)
  }

export default onImageSelect