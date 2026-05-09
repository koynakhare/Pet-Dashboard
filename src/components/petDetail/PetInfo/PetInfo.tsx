import { Chip, Typography } from '@mui/material'
import map from 'lodash/map'
import { memo } from 'react'
import type { Pet } from '@/features/pets/petsTypes'
import './PetInfo.css'

type PetInfoProps = {
  pet: Pet
}

function PetInfoComponent({ pet }: PetInfoProps) {
  return (
    <header className="pet-detail-info fade-in-up">
      <Typography component="p" className="pet-detail-info-kicker">
        Gallery asset
      </Typography>
      <Typography component="h1" className="pet-detail-info-title">
        {pet.title}
      </Typography>
      <Typography component="p" className="pet-detail-info-description">
        {pet.description}
      </Typography>
      <div className="pet-detail-info-tags" role="list">
        {map(pet.tags, (tag) => (
          <Chip key={tag} label={tag} size="small" className="pet-detail-info-chip" role="listitem" />
        ))}
      </div>
    </header>
  )
}

export const PetInfo = memo(PetInfoComponent)
