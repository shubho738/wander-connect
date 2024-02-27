
import {useState} from 'react'
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import toast from 'react-hot-toast'

import store from '@/redux/store'
import {fetchFollowedUsers} from '@/redux/slices/followSlice'
import validateEmail from '@/libs/helpers/validateEmail'
import validatePasswordCharLimit from '@/libs/helpers/validatePasswordCharLimit'
import Form from '../../ui/Form/Form'
import Input from '../../ui/Input/Input'
import styles from './LoginForm.module.scss'

const LoginForm = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const onLogin = async (e: React.FormEvent<HTMLButtonElement>) => {

    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      toast.error("All fields are required.", {id: "emptyFields"})
      return
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.', { id: 'invalidEmail' })
      return
    }

    const passwordValid = validatePasswordCharLimit(password)

    if (!passwordValid) {
      toast.error("Password length exceeds the limit of 64 characters.", {id: "passwordTooLong"})
      return
    }

    setIsLoading(true)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setIsLoading(false)

    if (result?.error) {
      toast.error("There was an error.", {id: "loginError"})
    } 

    else {
      store.dispatch(fetchFollowedUsers())
      router.push('/')
      toast.success('Logged in.')
    }
  }

  return (
   <div
     className={styles["login-form"]}
   >
    <h1
      className={styles["login-form__heading"]}
    >
      Welcome to WonderConnect
    </h1>

    <div
      className={styles["login-form__form"]}
    >
      <Form
        onCTA={onLogin}
        ctaLabel="Login"
        disabled={isLoading || !email.trim() || !password.trim()}
        isSubmitting={isLoading}
      >
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
      Don&apos;t have an account? {' '}
      <Link
        href="/register"
      >
        <span
          className={styles["login-form__register"]}
        > 
          Sign up
        </span>
      </Link>
    </span>

   </div>
  )
}

export default LoginForm