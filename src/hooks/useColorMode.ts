import type { PaletteMode } from '@mui/material'
import { createContext, useContext } from 'react'

type ColorModeContextValue = {
  mode: PaletteMode
  toggleMode: () => void
}

export const ColorModeContext = createContext<ColorModeContextValue>({
  mode: 'light',
  toggleMode: () => undefined,
})

export function useColorMode() {
  return useContext(ColorModeContext)
}
