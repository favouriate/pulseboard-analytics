"use client"

import * as React from "react"
import { Palette } from "lucide-react"

import { useThemeColor } from "@/hooks/use-theme-color"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const themes = [
  { name: "Default", value: "default", swatch: "oklch(0.216 0.006 56.043)" },
  { name: "Blue", value: "blue", swatch: "oklch(0.5 0.2 250)" },
  { name: "Green", value: "green", swatch: "oklch(0.5 0.2 150)" },
  { name: "Orange", value: "orange", swatch: "oklch(0.6 0.2 70)" },
  { name: "Red", value: "red", swatch: "oklch(0.55 0.22 25)" },
  { name: "Rose", value: "rose", swatch: "oklch(0.6 0.15 15)" },
  { name: "Violet", value: "violet", swatch: "oklch(0.5 0.2 280)" },
  { name: "Yellow", value: "yellow", swatch: "oklch(0.7 0.15 90)" },
] as const

export function ThemeColorSelector() {
  const { themeColor, setThemeColor, mounted } = useThemeColor()

  if (!mounted) {
    // Avoid flashing wrong selection before hydration
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Select color theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setThemeColor(theme.value)}
            className="flex items-center gap-2"
          >
            <span
              className="h-4 w-4 rounded-full border"
              style={{ backgroundColor: theme.swatch }}
            />
            <span>{theme.name}</span>
            {themeColor === theme.value && (
              <span className="ml-auto text-xs text-muted-foreground">
                Active
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


