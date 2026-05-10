import type { Pet } from '@/features/pets/petsTypes'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import { Button } from '@mui/material'
import { memo, useCallback } from 'react'
import './PetHero.css'

type PetHeroProps = {
  pet: Pet
}

function PetHeroComponent({ pet }: PetHeroProps) {
  const openOriginal = useCallback(() => {
    window.open(pet.url, '_blank', 'noopener,noreferrer')
  }, [pet.url])

  return (
    <div className="pet-detail-hero-root">
      <div className="pet-detail-hero-bg" aria-hidden="true">
        <span className="pet-detail-hero-blob pet-detail-hero-blob-a" />
        <span className="pet-detail-hero-blob pet-detail-hero-blob-b" />
        <span className="pet-detail-hero-blob pet-detail-hero-blob-c" />
      </div>
      <div className="pet-detail-hero-frame glass-surface-strong anim-image-zoom">
        <img src={pet.url} alt="" className="pet-detail-hero-image" loading="eager" />
        <div className="pet-detail-hero-scrim" aria-hidden="true" />
        <div className="pet-detail-hero-actions">
          <Button
            type="button"
            variant="contained"
            size="small"
            startIcon={<OpenInNewRoundedIcon />}
            onClick={openOriginal}
            className="pet-detail-hero-open-btn"
            aria-label={`Open original image for ${pet.title} in a new tab`}
          >
            Open original
          </Button>
        </div>
      </div>
    </div>
  )
}

export const PetHero = memo(PetHeroComponent)
