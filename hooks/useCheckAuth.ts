
import {getSession} from 'next-auth/react'
import {useRouter} from 'next/router'


const useCheckAuth = (checkAuth: boolean, onClick: (e: React.MouseEvent) => void) => {

  const router = useRouter()

  const onCheckAuth = async (e: React.MouseEvent) => {

    e.stopPropagation()

    if (checkAuth) {

      const session = await getSession()

      if (!session) {

        router.push('/login')
        return
      }
    }

    if (onClick) onClick(e)
  
  }

  return {onCheckAuth}
}


export default useCheckAuth
