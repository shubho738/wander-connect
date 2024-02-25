
import {useState} from 'react'
import {useRouter} from 'next/router'
import { signIn } from 'next-auth/react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'

import validateEmail from '@/libs/helpers/validateEmail'
import validateNamesCharLimit from '@/libs/helpers/validateNamesCharLimit'
import validatePasswordCharLimit from '@/libs/helpers/validatePasswordCharLimit'
import Form from '../../ui/Form/Form'
import Input from '../../ui/Input/Input'
import styles from './RegisterForm.module.scss'

const RegisterForm = () => {

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()


  const onRegister = async (e: React.FormEvent<HTMLButtonElement>) => {

    e.preventDefault()

    if (!name.trim() || !username.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required.", {id: "emptyFields"})
      return
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.', { id: 'invalidEmail' })
      return
    }

    const [nameValid, usernameValid] = validateNamesCharLimit(name, username)
    const passwordValid = validatePasswordCharLimit(password)

    if (!nameValid) {
      toast.error("Name length exceeds the limit of 50 characters.", {id: "nameTooLong"})
      return
    }

    if (!usernameValid) {
      toast.error("Username length exceeds the limit of 15 characters.", {id: "usernameTooLong"})
      return
    }

    if (!passwordValid) {
      toast.error("Password length exceeds the limit of 64 characters.", {id: "passwordTooLong"})
      return
    }

    setIsLoading(true)

    try {

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        name,
        username,
        email,
        password
      })

      toast.success("Registration successful.")

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })


      if (result?.error) {
        toast.error("There was an error while loggin in.")
      } 
      
      else {
        router.push('/')
      }

    }

    catch(err) {
      toast.error('Registration failed.')
    }

    finally {
      setIsLoading(false)
    }

  }


  return (
   <div
     className={styles["register-form"]}
   >
    <h1
      className={styles["register-form__heading"]}
    >
      Welcome to WonderConnect
    </h1>

    <div
      className={styles["register-form__form"]}
    >
      <Form
        onCTA={onRegister}
        ctaLabel="Sign up"
        disabled={isLoading || !name.trim() || !username.trim() || !email.trim() || !password.trim()}
        isSubmitting={isLoading}
      >

        <Input
          placeholder="Name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
          applyBorder
          disabled={isLoading}
        />

        <Input
          placeholder="Username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} 
          applyBorder
          disabled={isLoading}
        />

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
          applyBorder
          disabled={isLoading}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          applyBorder
          disabled={isLoading}
        />
      </Form>
    </div>

    <span>
      Already have an account? {' '}
      <Link
        href="/login">
        <span
          className={styles["register-form__login"]}
        > 
          Sign in
        </span>
      </Link>
    </span>

   </div>
  )
}

export default RegisterForm