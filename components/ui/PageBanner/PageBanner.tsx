
import {useRouter} from 'next/router'
import {MoveLeft} from 'lucide-react'

interface PageBannerProps {
  label: string;
  back?: boolean;
}

const PageBanner = ({label, back}: PageBannerProps) => {

  const router = useRouter()

  return (
    <div
      style={{display: "flex", alignItems: "center", gap: ".3rem"}}
    >
      {back && (
        <div
          onClick={() => router.back()} 
        >
          <MoveLeft
            style={{cursor: "pointer"}}
          />
       </div>
        )}

      <span
        style={{fontSize: "var(--fs-500)"}}
      >
        {label}
      </span>
    </div>
  )
}

export default PageBanner