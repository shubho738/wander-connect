
import RegisterForm from '@/components/auth/RegisterForm/RegisterForm'

const RegisterPage = () => {

  return (
    <main
      style={{minHeight: "80vh", display: "grid", placeItems: "center"}}
    >
     <div className="container">
       <div>
         <RegisterForm />
       </div>
     </div>
    </main>
  )
}

export default RegisterPage