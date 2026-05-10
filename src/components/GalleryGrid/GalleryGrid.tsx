import type { ReactNode } from 'react'
import styled from 'styled-components'

const GridRoot = styled.div`
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media ${(p) => `(min-width: ${p.theme.breakpoints.gallerySm})`} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media ${(p) => `(min-width: ${p.theme.breakpoints.galleryMd})`} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media ${(p) => `(min-width: ${p.theme.breakpoints.galleryLg})`} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`

type GalleryGridProps = {
  children: ReactNode
  className?: string
}

export function GalleryGrid({ children, className }: GalleryGridProps) {
  return <GridRoot className={className}>{children}</GridRoot>
}
