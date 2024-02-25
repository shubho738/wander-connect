
import {BeatLoader} from 'react-spinners'

interface TextLoaderProps {
  color?: string;
  size?: number;
}

const TextLoader = ({color = "hsl(var(--clr-loader))", size = 10}: TextLoaderProps) => {

  return (

      <BeatLoader
        color={color}
        size ={size}
      />
  )
}

export default TextLoader