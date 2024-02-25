
import Link from 'next/link'

import {Rocket} from 'lucide-react'

const Logo = () => {

  return (
    <div>
      <Link
        href="/"
      >
        <div>
          <Rocket
            size="35" 
            color="hsl(var(--clr-neutral-light))"
          />
        </div>
      </Link>
    </div>
  )
}

export default Logo