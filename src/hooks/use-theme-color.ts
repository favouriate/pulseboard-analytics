"use client"

import * as React from "react"
import type { ThemeColor } from "@/types"

const STORAGE_KEY = "theme-color"

export function useThemeColor() {
  const [themeColor, setThemeColorState] = React.useState<ThemeColor>("default")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as
        | ThemeColor
        | null

      const initial = stored || "default"
      setThemeColorState(initial)
      document.documentElement.setAttribute("data-theme-color", initial)
    } catch {
      document.documentElement.setAttribute("data-theme-color", "default")
    }
  }, [])

  const setThemeColor = React.useCallback((color: ThemeColor) => {
    setThemeColorState(color)
    try {
      window.localStorage.setItem(STORAGE_KEY, color)
    } catch {
      // ignore storage errors
    }
    document.documentElement.setAttribute("data-theme-color", color)
  }, [])

  return {
    themeColor,
    setThemeColor,
    mounted,
  }
}


