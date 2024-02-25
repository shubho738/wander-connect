
import styles from './Tooltip.module.scss'

interface TooltipProps {

  text: string;
  children: React.ReactNode;
  fontSize?: string;
  padding?: string;
  customContainerStyles?: React.CSSProperties;
  customContentStyles?: React.CSSProperties;
}

const Tooltip = ({ text, children, fontSize, padding, customContainerStyles, customContentStyles }: TooltipProps) => {

  return (

    <div 
      style={{padding: padding, ...customContainerStyles}}
      className={styles['tooltip']}
    >
    
      {children}

      <div 
        style={{fontSize: fontSize, ...customContentStyles}}
        className={styles['tooltip__content']}
      >
        {text}
      </div>
    </div>
  )
}

export default Tooltip
