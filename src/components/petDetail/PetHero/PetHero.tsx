import { Typography } from '@mui/material'
import { memo } from 'react'
import type { Pet } from '@/features/pets/petsTypes'
import './PetHero.css'

type PetHeroProps = {
  pet: Pet
}

function PetHeroComponent({ pet }: PetHeroProps) {
  return (
    <div className="pet-detail-hero-root">
      <div className="pet-detail-hero-bg" aria-hidden="true">
        <span className="pet-detail-hero-blob pet-detail-hero-blob-a" />
        <span className="pet-detail-hero-blob pet-detail-hero-blob-b" />
        <span className="pet-detail-hero-blob pet-detail-hero-blob-c" />
      </div>
      <div className="pet-detail-hero-frame glass-surface-strong surface-ring-hover anim-image-zoom">
        <img src={pet.url} alt={pet.title} className="pet-detail-hero-image" loading="eager" />
        <div className="pet-detail-hero-scrim" aria-hidden="true" />
        <div className="pet-detail-hero-badge">
          <Typography component="span" className="pet-detail-hero-badge-text">
            Featured capture
          </Typography>
        </div>
      </div>
    </div>
  )
}

export const PetHero = memo(PetHeroComponent)
