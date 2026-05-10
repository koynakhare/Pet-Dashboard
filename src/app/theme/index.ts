import { colorTokens } from '@/styles/tokens'
import type { PaletteMode } from '@mui/material'
import { createTheme } from '@mui/material/styles'

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
      fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
      h1: {
        fontWeight: 700,
        letterSpacing: -0.5,
        fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
        lineHeight: 1.12,
      },
      h2: {
        fontWeight: 700,
        letterSpacing: -0.25,
        fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
        lineHeight: 1.18,
      },
      h3: {
        fontWeight: 700,
        fontSize: 'clamp(1.3rem, 2.8vw, 1.85rem)',
        lineHeight: 1.22,
      },
      h4: {
        fontWeight: 700,
        fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)',
        lineHeight: 1.3,
      },
      h5: {
        fontWeight: 600,
        fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
        lineHeight: 1.35,
      },
      h6: {
        fontWeight: 600,
        fontSize: 'clamp(1rem, 1.5vw, 1.12rem)',
        lineHeight: 1.4,
      },
      body1: {
        fontSize: 'clamp(0.9375rem, 1.4vw, 1rem)',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: 'clamp(0.8125rem, 1.2vw, 0.875rem)',
        lineHeight: 1.5,
      },
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
