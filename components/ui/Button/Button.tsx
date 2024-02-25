
import Link from 'next/link'
import {ClipLoader} from 'react-spinners'

import type {IconType} from '@/libs/types'
import useCheckAuth from '@/hooks/useCheckAuth'
import styles from './Button.module.scss'

interface ButtonProps {

  checkAuth?: boolean;
  label?: string;
  icon?: IconType;
  iconSize?: number;
  href?: string;
  onClick?(e?: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLButtonElement>): void;
  disabled?: boolean;
  isLoading?: boolean;
  loaderColor?: string;
  customStyles?: React.CSSProperties;
}

const Button = ({checkAuth = false, label, icon: Icon, iconSize = 20, href, onClick, disabled, isLoading, loaderColor, customStyles}: ButtonProps) => {

  const { onCheckAuth } = useCheckAuth(checkAuth, onClick as (e: React.MouseEvent) => void)


  if (href) {

    return (
      <Link
        href={href}
      >
        <button
          style={customStyles}
          className={styles["button"]} 
        >
          {label ? label : (Icon && <Icon size={iconSize} />)}
        </button>
      </Link>
      )
  }


  return (
   <button
      onClick={onCheckAuth}
      disabled={disabled}
      style={{...customStyles, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? ".8" : "1"}}
      className={styles["button"]}
    >
      {isLoading && (
       <ClipLoader
          size={16}
          color={loaderColor ?? "hsl(var(--clr-btn-primary-loader))"}
        />
      )}

      {label ? label : (Icon && <Icon size={iconSize} />)}
    </button>
  )
}

export default Button