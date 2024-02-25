
import styles from './Card.module.scss'

interface CardProps {
  children: React.ReactNode;
  onClick?(e?: React.MouseEvent<HTMLDivElement>): void;
  hover?: boolean;
  hoverColor?: string;
  customStyles?: React.CSSProperties;
}

const Card = ({children, onClick, hover, hoverColor = "hsl(var(--clr-foreground))", customStyles}: CardProps) => {

  const cardStyles = {...customStyles, "--hover-color": hoverColor, cursor: onClick ? "pointer" : "normal"} as React.CSSProperties

  return (
    <div
      onClick={onClick}
      style={cardStyles}
      className={`${styles["card"]} ${hover ? styles.hovered : ""}`}
    >
      {children}
    </div>
  )
}

export default Card