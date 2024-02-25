
import Button from '../Button/Button'

interface FormProps {
  
  children: React.ReactNode;
  onCTA(e?: React.FormEvent<HTMLButtonElement>): void;
  ctaLabel?: string;
  disabled?: boolean;
  isSubmitting?: boolean;
  customStyles?: React.CSSProperties;
  buttonStyles?: React.CSSProperties;
  buttonLoaderColor?: string;
}

const Form = ({children, onCTA, ctaLabel = "Submit", disabled, isSubmitting, customStyles, buttonStyles, buttonLoaderColor}: FormProps) => {

  return (
    <form
      style={{display: "flex", flexDirection: "column", gap: "2rem", ...customStyles}}
    >
      {children}

      <div
        style={{alignSelf: "center"}}
      >
        <Button
          label={ctaLabel}
          onClick={onCTA}
          disabled={disabled}
          isLoading={isSubmitting}
          customStyles={buttonStyles}
          loaderColor={buttonLoaderColor}
        />
      </div>
    </form>
  )
}

export default Form