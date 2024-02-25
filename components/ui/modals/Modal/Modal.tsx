
import { useEffect } from 'react'
import {X} from 'lucide-react'

import ClickableIcon from '../../ClickableIcon/ClickableIcon'
import styles from './Modal.module.scss'

interface ModalProps {
  children: React.ReactNode;
  maxWidth?: string;
  padding?: string;
  onClose(): void;
}

const Modal = ({children, maxWidth, padding, onClose}: ModalProps) => {

  useEffect(() => {
    
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [])


  return (
    <div
      className={styles["modal"]}
    >
      <div
        className={`space-y | ${styles["modal__content"]}`}
        style={{width: maxWidth ? "98%" : "auto", maxWidth: maxWidth}}
      >
        <ClickableIcon
          icon={X}
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  )
}

export default Modal