
import type { IconType } from '@/libs/types'
import styles from './IconContainer.module.scss'

interface IconContainerProps {
  icon: IconType;
  color?: string;
  size?: string;
}


const IconContainer = ({icon: Icon, color, size}: IconContainerProps) => {

  return (
    <div
      className={styles["container"]}
    >
      <Icon
        color={color}
        size={size}
      />
    </div>
  )
}

export default IconContainer