import type { Pet } from '@/features/pets/petsTypes'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import { IconButton, Typography } from '@mui/material'
import { type SyntheticEvent, memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './FavoriteCard.css'

export type FavoriteCardProps = {
  pet: Pet
  index: number
  onToggleFavorite: (id: number) => void
}

export const FavoriteCard = memo(function FavoriteCard({
  pet,
  index,
  onToggleFavorite,
}: FavoriteCardProps) {
  const navigate = useNavigate()
  const openDetail = useCallback(() => {
    navigate(`/pets/${pet.id}`)
  }, [navigate, pet.id])

  const stop = useCallback((e: SyntheticEvent) => {
    e.stopPropagation()
  }, [])

  const staggerClass = `anim-stagger-${(index % 8) + 1}`

  return (
    <article
      className={`favorite-card glass-surface surface-ring-hover fade-in-up ${staggerClass}`}
      data-favorite-id={pet.id}
    >
      <button type="button" className="favorite-card-media anim-image-zoom" onClick={openDetail}>
        <img src={pet.url} alt="" className="favorite-card-image" loading="lazy" />
        <span className="favorite-card-media-scrim" aria-hidden="true" />
        <span className="favorite-card-open-badge">
          <OpenInNewRoundedIcon fontSize="small" />
          Open
        </span>
      </button>

      <div className="favorite-card-body">
        <div className="favorite-card-title-row">
          <Typography component="h3" className="favorite-card-title">
            {pet.title}
          </Typography>
          <IconButton
            aria-label="Remove from favorites"
            className="favorite-card-heart anim-icon-spin-hover"
            onClick={(e) => {
              stop(e)
              onToggleFavorite(pet.id)
            }}
            size="small"
          >
            <FavoriteRoundedIcon className="favorite-card-heart-icon" />
          </IconButton>
        </div>
        <Typography component="p" className="favorite-card-description">
          {pet.description}
        </Typography>
      </div>
    </article>
  )
})
