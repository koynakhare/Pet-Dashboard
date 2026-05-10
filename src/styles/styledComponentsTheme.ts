import type { PaletteMode } from '@mui/material/styles'

export type StyledAppTheme = {
  mode: PaletteMode
  color: {
    primary: string
    muted: string
  }
  breakpoints: {
    gallerySm: string
    galleryMd: string
    galleryLg: string
  }
}

const light: Pick<StyledAppTheme, 'color'> = {
  color: {
    primary: '#6e5bff',
    muted: '#63708a',
  },
}

const dark: Pick<StyledAppTheme, 'color'> = {
  color: {
    primary: '#8298ff',
    muted: '#a4b2d3',
  },
}

export function createStyledComponentsTheme(mode: PaletteMode): StyledAppTheme {
  return {
    mode,
    ...(mode === 'dark' ? dark : light),
    breakpoints: {
      gallerySm: '700px',
      galleryMd: '900px',
      galleryLg: '1200px',
    },
  }
}
