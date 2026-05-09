import type { ReactNode } from 'react'
import './GalleryGrid.css'

type GalleryGridProps = {
  children: ReactNode
  className?: string
}

export function GalleryGrid({ children, className }: GalleryGridProps) {
  const rootClass = className ? `gallery-grid ${className}` : 'gallery-grid'
  return <div className={rootClass}>{children}</div>
}
