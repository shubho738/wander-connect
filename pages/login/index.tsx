
import LoginForm from '@/components/auth/LoginForm/LoginForm'

const LoginPage = () => {
  return (
    <main
      style={{minHeight: "80vh", display: "grid", placeItems: "center"}}
    >
     <div className="container">
       <div>
         <LoginForm />
       </div>
     </div>
    </main>
    )
}

export default LoginPage