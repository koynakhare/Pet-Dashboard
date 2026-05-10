import Typography from '@mui/material/Typography'
import './FavoriteHero.css'

export function FavoriteHero() {
  return (
    <section className="favorite-hero glass-surface-strong" aria-labelledby="favorites-hero-title">
      <div className="favorite-hero-bg" aria-hidden="true">
        <span className="favorite-hero-blob favorite-hero-blob-a" />
        <span className="favorite-hero-blob favorite-hero-blob-b" />
        <span className="favorite-hero-blob favorite-hero-blob-c" />
        <span className="favorite-hero-noise" />
      </div>
      <div className="favorite-hero-inner fade-in-up">
        <Typography id="favorites-hero-title" component="h1" className="favorite-hero-title">
          Your curated favorites
        </Typography>
        <Typography component="p" className="favorite-hero-subtitle">
          Your living mood board of beloved pets, synced everywhere in Pet Gallery.
        </Typography>
      </div>
    </section>
  )
}
