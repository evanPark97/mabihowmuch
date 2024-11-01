"use client"

import { IconButton } from "@chakra-ui/react"
import { useTheme } from "next-themes"
import { HiMoon, HiSun } from "react-icons/hi"

export function ColorModeToggle() {
  const { theme, setTheme } = useTheme()
  const toggleColorMode = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }
  return (
    <IconButton aria-label="toggle color mode" onClick={toggleColorMode} size={{ smDown: 'xs', sm: 'md' }}>
      {theme === "light" ? <HiMoon /> : <HiSun />}
    </IconButton>
  )
}