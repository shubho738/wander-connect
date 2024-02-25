
import {RingLoader} from 'react-spinners'

interface FeedLoaderProps {
  color?: string;
  size?: number;
  msg?: string;
  customStyles?: React.CSSProperties;
}

const FeedLoader = ({color = "hsl(var(--clr-loader))", size, msg, customStyles}: FeedLoaderProps) => {

  return (
    <div
      style={{display: "grid", placeItems: "center", gap: ".5rem", ...customStyles}}
    >
      <RingLoader
        color={color}
        size ={size}
      />

      {msg && <span>{msg}</span>}
    </div>
  )
}

export default FeedLoader