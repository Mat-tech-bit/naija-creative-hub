"use client"

import React, { useState, createContext, useContext } from "react"
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
} from "@mui/material"
import { DarkMode, LightMode } from "@mui/icons-material"

// 1️⃣ Create Context for theme mode
const ThemeModeContext = createContext({
  darkMode: false,
  toggleTheme: () => {},
})

// 2️⃣ Provider that wraps your app
export function ThemeToggleProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(true)

  const toggleTheme = () => setDarkMode((prev) => !prev)

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  })

  return (
    <ThemeModeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

// 3️⃣ Hook to use theme mode anywhere
export const useThemeMode = () => useContext(ThemeModeContext)

// 4️⃣ Toggle button itself
export function ThemeToggleButton() {
  const { darkMode, toggleTheme } = useThemeMode()
  return (
    <IconButton color="inherit" onClick={toggleTheme}>
      {darkMode ? <LightMode /> : <DarkMode />}
    </IconButton>
  )
}
