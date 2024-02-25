
import {LogOut} from 'lucide-react'
import {signOut} from 'next-auth/react'
import toast from 'react-hot-toast'

interface LogOutProps {
  color?: string;
  size?: number;
}

const Logout = ({color, size}: LogOutProps) => {

  const onLogout = async () => {
    
    try {
      await signOut({ callbackUrl: "/login" })
    }

    catch(err) {
      toast.error("Sorry, there was an error.")
    }
  }

  return (
    <div
      onClick={onLogout}
      style={{cursor: "pointer"}}
    >
      <LogOut
        color={color}
        size={size} 
      />
    </div>
  )
}

export default Logout