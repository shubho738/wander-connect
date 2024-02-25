
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

const ModeToggle = () => {

  const [mode, setMode] = useState("light")

  const { setTheme, theme } = useTheme()

  useEffect(() => {
    setMode(theme === "dark" ? "dark" : "light")
  }, [theme])


  const onModeToggle = (selectedMode: "light" | "dark") => {

    if (selectedMode === "light") {
      setTheme("light")
      setMode("light")
    } 

    else if (selectedMode === "dark") {
      setTheme("dark")
      setMode("dark")
    }
  }

  return (
    <div>
      {mode === "light" && (
        <Moon
          onClick={() => onModeToggle("dark")}
          style={{ cursor: "pointer" }}
        />
      )}
      {mode === "dark" && (
        <Sun
          onClick={() => onModeToggle("light")}
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  )
}

export default ModeToggle
