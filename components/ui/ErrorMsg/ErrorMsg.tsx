
interface ErrorMsgProps {
  msg?: string;
  customStyles?: React.CSSProperties;
}

const ErrorMsg = ({msg = "Sorry, Something went wrong.", customStyles}: ErrorMsgProps) => {

  return (
    <div
      style={{fontSize: "var(--fs-500)", ...customStyles}}
    >
      <span>
        {msg}
      </span>
    </div>
  )
}

export default ErrorMsg