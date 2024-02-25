
import type { IconType } from '@/libs/types';
import useCheckAuth from '@/hooks/useCheckAuth'
import styles from './ClickableIcon.module.scss'

interface ClickableIconProps {

  checkAuth?: boolean;
  icon: IconType;
  size?: number;
  color?: string;
  hoverStyle?: boolean;
  onClick(e?: React.MouseEvent<HTMLDivElement>): void;
}

const ClickableIcon = ({checkAuth = false, icon: Icon, size, color, hoverStyle, onClick}: ClickableIconProps) => {

  const {onCheckAuth} = useCheckAuth(checkAuth, onClick as (e: React.MouseEvent) => void)


  return (
    <div
      onClick={onCheckAuth}
      className={`${styles["icon"]} ${hoverStyle ? styles["hover-style"] : ""}`}
    >
      <Icon
        size={size} 
        color={color}
      />
    </div>
  )
}

export default ClickableIcon