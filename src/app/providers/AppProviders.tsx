import { CssBaseline, ThemeProvider, type PaletteMode } from '@mui/material'
import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { createAppTheme } from '@/app/theme'
import { ColorModeContext } from '@/hooks/useColorMode'
import { store } from '@/redux/store'

type AppProvidersProps = {
  children: ReactNode
}

/**
 * Top-level providers: Redux, MUI theme, routing, and global toasts.
 */
export function AppProviders({ children }: AppProvidersProps) {
  const [mode, setMode] = useState<PaletteMode>('light')
  const theme = useMemo(() => createAppTheme(mode), [mode])
  const contextValue = useMemo(
    () => ({
      mode,
      toggleMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    [mode],
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode)
  }, [mode])

  return (
    <Provider store={store}>
      <ColorModeContext.Provider value={contextValue}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            {children}
            <Toaster position="top-center" />
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  )
}
