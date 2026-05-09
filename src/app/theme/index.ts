import { createTheme } from '@mui/material/styles'
import type { PaletteMode } from '@mui/material'
import { colorTokens } from '@/styles/tokens'

/**
 * Application theme: palette, typography, and component defaults.
 */
export function createAppTheme(mode: PaletteMode) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: colorTokens.primary,
      },
      secondary: {
        main: colorTokens.secondary,
      },
      background: {
        default: mode === 'light' ? colorTokens.background : '#0F172A',
        paper: mode === 'light' ? '#ffffff' : '#111827',
      },
    },
  typography: {
    fontFamily:
      '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 700, letterSpacing: -0.5 },
    h2: { fontWeight: 700, letterSpacing: -0.25 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
  })
}
