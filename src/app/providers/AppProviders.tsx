import { createAppTheme } from '@/app/theme'
import { ColorModeContext } from '@/hooks/useColorMode'
import { store } from '@/redux/store'
import { createStyledComponentsTheme } from '@/styles/styledComponentsTheme'
import { CssBaseline, ThemeProvider as MuiThemeProvider, type PaletteMode } from '@mui/material'
import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  const [mode, setMode] = useState<PaletteMode>('light')
  const theme = useMemo(() => createAppTheme(mode), [mode])
  const styledTheme = useMemo(() => createStyledComponentsTheme(mode), [mode])
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
        <MuiThemeProvider theme={theme}>
          <StyledThemeProvider theme={styledTheme}>
            <CssBaseline />
            <BrowserRouter>
              {children}
              <Toaster position="top-center" />
            </BrowserRouter>
          </StyledThemeProvider>
        </MuiThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  )
}
