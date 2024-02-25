
import React from 'react'

interface InputProps {
  placeholder?: string;
  type?: string;
  value: string | number;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
  onTextAreaChange?(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  rows?: number;
  disabled?: boolean;
  applyBorder?: boolean;
  fullWidth?: boolean;
  customStyles?: React.CSSProperties;
}

const Input = ({type = "text", placeholder, value, onChange, onTextAreaChange, rows, disabled, applyBorder, fullWidth, customStyles}: InputProps) => {

  const inputStyles = {
    padding: ".3rem .7rem",
    border: applyBorder ? "1px solid hsl(var(--clr-border))" : "none",
    outline: "none",
    fontSize: "var(--fs-400)",
    ...customStyles
  }

  const handleAutoExpand = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
   
    const textarea = e.target
    textarea.style.height = "auto"
    textarea.style.height = textarea.scrollHeight + "px"

  }


   if (type === "textarea") {

    return (
      <textarea 
        placeholder={placeholder}
        value={value}
        onChange={onTextAreaChange}
        onInput={handleAutoExpand}
        disabled={disabled}
        rows={rows}
        style={{width: fullWidth ? "100%" : "", cursor: disabled ? "not-allowed" : "auto", overflow : "hidden", resize: "none", backgroundColor: "hsl(var(--clr-input-bg))", color: "hsl(var(--clr-input-text))", ...inputStyles}}
      />
      )
  }

  return (

    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={{width: fullWidth ? "100%" : "auto", cursor: disabled ? "not-allowed" : "auto", backgroundColor: "hsl(var(--clr-input-bg))", color: "hsl(var(--clr-input-text))", ...inputStyles}}
    />
  
   )
}
 
export default Input