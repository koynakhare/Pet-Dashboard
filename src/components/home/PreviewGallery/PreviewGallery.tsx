import { Paper, Typography } from '@mui/material'
import chunk from 'lodash/chunk'
import map from 'lodash/map'
import './PreviewGallery.css'

export type GalleryPreviewItem = {
  id: string
  image: string
  title: string
}

type PreviewGalleryProps = {
  items: GalleryPreviewItem[]
}

export function PreviewGallery({ items }: PreviewGalleryProps) {
  const itemColumns = chunk(items, 2)

  return (
    <section className="home-gallery-section fade-in-up">
      <Typography component="h2" className="home-section-heading">
        Curated moments from the gallery
      </Typography>
      <div className="home-gallery-grid">
        {map(itemColumns, (column, columnIndex) => (
          <div key={`gallery-column-${columnIndex}`} className="home-gallery-column">
            {map(column, (item) => (
              <Paper key={item.id} elevation={0} className="home-gallery-card glass-surface">
                <img className="home-gallery-image" src={item.image} alt={item.title} />
                <Typography component="p" className="home-gallery-title">
                  {item.title}
                </Typography>
              </Paper>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
