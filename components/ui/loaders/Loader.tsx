
import {ClipLoader} from 'react-spinners'

interface LoaderProps {
  color?: string;
  size?: number;
}

const Loader = ({color = "hsl(var(--clr-loader))", size = 20}: LoaderProps) => {

  return (

      <ClipLoader
        color={color}
        size ={size}
      />
  )
}

export default Loader