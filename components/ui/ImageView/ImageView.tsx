
import Image from 'next/image'
import {ClipLoader} from 'react-spinners'

interface ImageViewProps {
  imageSrc: string;
  imageAlt: string;
  isLoading?: boolean;
  customContainerStyles?: React.CSSProperties;
  customImageStyles?: React.CSSProperties;
}

const ImageView = ({imageSrc, imageAlt, isLoading, customContainerStyles, customImageStyles}: ImageViewProps) => {
  
  const isDataUrl: boolean = typeof imageSrc === "string" && imageSrc.startsWith("data:")

  return (
    <div
      style={{position: "relative", width: "100%", aspectRatio: "2/1", ...customContainerStyles}}
    >
      {isLoading ? (
        <div 
          style={{position:"absolute",inset: 0,display:'flex',justifyContent:'center',alignItems:'center'}}
        >
          <ClipLoader />
        </div>
      ) : isDataUrl ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          style={{position: "absolute", objectFit: "contain", ...customImageStyles}}
        />
      ) : (
        <div 
          style={{width: "100%", height: "100%", background: "hsl(var(--clr-neutral-md) / .5)", color: "hsl(var(--clr-neutral-light))", display: "grid", placeItems: "center"}}
        >
          No Image
        </div>
      )}
    </div>
  )
}

export default ImageView
